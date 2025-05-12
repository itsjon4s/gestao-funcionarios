//@ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const users = await prisma!.mentores.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const { id, name, email, alunosMentorados } = await req.json();
  const mentor = await prisma!.mentores.create({
    data: {
      name,
      email,
      alunosMentorados,
    },
  });
  return NextResponse.json(mentor);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  console.log(id);
  await prisma!.alunos.delete({
    where: { id: id },
  });
  return NextResponse.json();
}

export async function PUT(req: Request) {
  const { id, name, email, alunosMentorados } = await req.json();
  const mentor = await prisma!.mentores.update({
    where: { id: id },
    data: {
      id,
      name,
      email,
      alunosMentorados,
    },
  });
  return new NextResponse(JSON.stringify(mentor), {
    status: 200,
  });
}
