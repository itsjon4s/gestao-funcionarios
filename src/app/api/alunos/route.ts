//@ts-nocheck
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  const users = await prisma!.alunos.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const {
    name,
    email,
    avaliacoes,
    mentor,
    instituicao,
    nivelDeEducacao,
    registrosSobreOAluno,
  } = await req.json();
  const aluno = await prisma!.alunos.create({
    data: {
      name,
      email,
      avaliacoes,
      mentor,
      instituicao,
      nivelDeEducacao,
      registrosSobreOAluno,
    },
  });
  return NextResponse.json(aluno);
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
  const {
    id,
    name,
    email,
    avaliacoes,
    mentor,
    instituicao,
    nivelDeEducacao,
    registrosSobreOAluno,
  } = req.json();
  const aluno = await prisma!.alunos.update({
    where: { id: id },
    data: {
      name,
      email,
      avaliacoes,
      mentor,
      instituicao,
      nivelDeEducacao,
      registrosSobreOAluno,
    },
  });
  return NextResponse.json(aluno);
}
