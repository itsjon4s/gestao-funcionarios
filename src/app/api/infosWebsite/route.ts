//@ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const infos = await prisma!.infos.findFirst();
  console.log(infos);
  return NextResponse.json(infos);
}

export async function PUT(req: Request) {
  const { niveisDeEducacao, instituicoes, areas } = await req.json();
  const info = await prisma!.infos.updateMany({
    data: {
      niveisDeEducacao,
      instituicoes,
      areas,
    },
  });
  return new NextResponse(JSON.stringify(info), {
    status: 200,
  });
}
