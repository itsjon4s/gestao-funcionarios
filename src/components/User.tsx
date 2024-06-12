"use client";
import { PrismaClient } from "@prisma/client/extension";

interface Aluno {
  id: string;
  name: string;
  email: string;
  avaliacoes: string[];
  mentor: string;
  instituicao: string;
  nivelDeEducacao: number;
  registrosSobreOAluno: string[];
}

interface UserProps {
  aluno: Aluno;
  prisma: PrismaClient;
}
export default async function User(props: UserProps) {
  const { prisma } = props;
  return (
    <div className="card bg-zinc-800 w-96 p-6 mr-12">
      <p className="card-title">
        Estagiario - <strong>{props.aluno?.name}</strong>
      </p>
      <div className="card-body">
        <span>
          Email: <strong>{props.aluno?.email}</strong>
        </span>
        <span>
          Mentor: <strong>{props.aluno?.mentor}</strong>
        </span>
        <span>
          Instituicao: <strong>{props.aluno?.instituicao}</strong>
        </span>
        <span>
          Nivel de Educacacao: <strong>{props.aluno?.nivelDeEducacao}</strong>
        </span>
        <div>
          <span>Avaliacoes:</span>
          {
            // Futuramente um url que manda para o painel de avaliacoes ao clicar no id
          }
          {/* <ul>
                    {props.aluno.avaliacoes.map((av) =>{
                        return <li><strong>{av}</strong></li>
                    })}
                </ul> */}
        </div>
      </div>
      <div className="card-actions flex justify-between">
        <button className="btn btn-success" onClick={async () => {
            // Nao adianta fazer o update hoje porque a interface vai mudar toda entao ia basicamente ter de refaze-lo depois
        }}>Editar</button>
        <button
          className="btn btn-error"
          onClick={async () => {
            await prisma.alunos.delete({
              where: {
                id: props.aluno.id,
              },
            });
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
