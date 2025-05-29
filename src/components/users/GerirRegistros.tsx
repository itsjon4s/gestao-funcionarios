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
    <div className="card bg-base-100/80 border border-base-300/40 shadow-xl rounded-2xl w-96 p-6 m-4 backdrop-blur-md transition hover:scale-[1.025]">
      <div className="card-title flex flex-col items-center mb-2">
        <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/40"
            />
            <rect
              x="8"
              y="8"
              width="8"
              height="8"
              rx="2"
              fill="currentColor"
              className="text-primary/60"
            />
          </svg>
        </span>
        <h1 className="text-xl font-semibold text-base-content text-center">
          Registros - <span className="text-primary">{x.name}</span>
        </h1>
      </div>
      <div className="card-body p-0">
        {adicionar && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold pt-2 text-base-content">
              Adicionar novo Registro
            </h2>
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
                placeholder="Qual o mentor que está a registrar?"
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
                className="btn btn-error btn-sm"
                onClick={() => {
                  setVisibilidade(true);
                  setAdicionar(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={async () => {
                  x.registrosSobreOAluno.push({
                    dia,
                    mentor,
                    registro,
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
                      email: x.email,
                      instituicao: x.instituicao,
                      nivelDeEducacao: x.nivelDeEducacao,
                      avaliacoes: x.avaliacoes,
                      registrosSobreOAluno: x.registrosSobreOAluno,
                    }),
                  });
                  setAdicionar(false);
                  setVisibilidade(true);
                }}
              >
                Registar
              </button>
            </div>
          </div>
        )}
        <div
          className={`flex justify-between mt-4 ${adicionar ? "hidden" : ""}`}
        >
          <a href={`/registro/${x.id}`}>
            <button className="btn btn-primary btn-sm">Ver Registros</button>
          </a>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              setAdicionar(true);
              setVisibilidade(false);
            }}
          >
            Adicionar Registro
          </button>
        </div>
      </div>
    </div>
  );
}
