//@ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const infos = await prisma!.infos.findFirst();
  return NextResponse.json(infos);
}

export async function PUT(req: Request) {
  const { niveisDeEducacao, instituicoes } = await req.json();
  const info = await prisma!.infos.updateMany({
    data: {
      niveisDeEducacao,
      instituicoes,
    },
  });
  return new NextResponse(JSON.stringify(info), {
    status: 200,
  });
}
