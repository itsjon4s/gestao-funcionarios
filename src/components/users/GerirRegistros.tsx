"use client";

import { useState } from "react";
import type { Aluno } from "@/types/users";
interface PropsGerirRegistros {
  x: Aluno;
}

export default function GerirRegistros({ x }: PropsGerirRegistros) {
  const [adicionar, setAdicionar] = useState(false);
  const [registro, setRegistro] = useState("");
  const [mentor, setMentor] = useState("");
  const [dia, setDia] = useState("");
  const [visibilidade, setVisibilidade] = useState(true);

  return (
    <div className="bg-base-300 p-4 rounded-lg w-96 mr-4 mb-4 space-y-4">
      <h1 className="text-xl font-bold">Registros - {x.name}</h1>
      <div>
        {adicionar ? (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Registro</span>
              </label>
              <input
                type="text"
                placeholder="Qual o registro de hoje?"
                className="input input-bordered"
                value={registro}
                onChange={(x) => setRegistro(x.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mentor</span>
              </label>
              <input
                type="text"
                placeholder="Qual o mentor que esta a registrar?"
                className="input input-bordered"
                value={mentor}
                onChange={(x) => setMentor(x.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Data</span>
              </label>
              <input
                type="date"
                placeholder="Qual o dia do registro?"
                className="input input-bordered"
                value={dia}
                onChange={(x) => setDia(x.target.value)}
                
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-error"
                onClick={() => {
                  setVisibilidade(true);
                  setAdicionar(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  x.registrosSobreOAluno.push({
                    dia,
                    mentor,
                    registro
                  });
                  await fetch("/api/alunos", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: x.id,
                      name: x.name,
                      mentor: x.mentor,
                      aluno: x.email,
                      instituicao: x.instituicao,
                      nivelDeEducacao: x.nivelDeEducacao,
                      avaliacoes: x.avaliacoes,
                      registrosSobreOAluno: x.registrosSobreOAluno,
                    }),
                  });
                  setAdicionar(false)
                  setVisibilidade(true)
                }}
              >
                Registar
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-between">
        <a href={`/registro/${x.id}`}>
          <button className={`btn btn-primary ${visibilidade ? "" : "hidden"}`}>
            Ver Registros
          </button>
        </a>
        <button
          className={`btn ${visibilidade ? "" : "hidden"}`}
          onClick={() => {
            setAdicionar(true);
            setVisibilidade(false);
          }}
        >
          Adicionar Registro
        </button>
      </div>
    </div>
  );
}
