"use client";
import User from "@/components/User";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Home() {

  const alunos = await prisma.alunos.findMany();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
      <h1 className="text-3xl">
        Painel de Controle - <strong>Estagiarios</strong>
      </h1>
        <button className="btn btn-primary text-white">Adicionar Estagiario</button>
      </div>
      <div className="flex h-screen ">
        <div className="flex flex-col text-center space-x-4">
          <div className="flex flex-row">
            {alunos.map((x, index) => {
              return <User aluno={x} key={index} prisma={prisma} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
