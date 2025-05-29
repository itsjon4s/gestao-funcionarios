"use client";

import { useState, useEffect } from "react";
import type { Aluno, Infos } from "@/types/users";

interface AvaliarUsuarioProps {
  aluno: Aluno;
}

export default function AvaliarUsuario({ aluno }: AvaliarUsuarioProps) {
  const [qualTrab, setQualTrab] = useState(0);
  const [area, setArea] = useState("");
  const [comentario, setComentario] = useState("");
  const [menuAdicionar, setMenuAdicionar] = useState(false);
  const [visibilidade, setVisibilidade] = useState(true);
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });

  useEffect(() => {
    fetch("/api/infosWebsite")
      .then((x) => x.json())
      .then((d) => setInfos(d));
  }, []);

  return (
    <div className="card bg-base-100/80 border border-base-300/40 shadow-xl rounded-2xl w-96 p-6 m-4 backdrop-blur-md transition hover:scale-[1.025]">
      <div className="card-title flex flex-col items-center mb-2">
        <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/40"
            />
            <circle
              cx="12"
              cy="12"
              r="5"
              fill="currentColor"
              className="text-primary/60"
            />
          </svg>
        </span>
        <h1 className="text-xl font-semibold text-base-content text-center">
          Avaliações - <span className="text-primary">{aluno.name}</span>
        </h1>
      </div>
      <div className="card-body p-0">
        <div className="flex justify-between space-x-2 mb-4">
          <a href={`/avaliacoes/${aluno.id}`}>
            <button
              className={`btn btn-primary btn-sm ${
                visibilidade ? "" : "hidden"
              }`}
            >
              Ver Avaliações
            </button>
          </a>
          <button
            className={`btn btn-outline btn-sm ${visibilidade ? "" : "hidden"}`}
            onClick={() => {
              setMenuAdicionar(true);
              setVisibilidade(false);
            }}
          >
            Adicionar Avaliação
          </button>
        </div>
        {menuAdicionar && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold pt-2 text-base-content">
              Adicionar uma nova Avaliação
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Qualidade (0 - 10)</span>
              </label>
              <input
                type="number"
                placeholder="Qual a qualidade do trabalho? (0-10)"
                className="input input-bordered"
                name="qualidade"
                value={qualTrab}
                onChange={(e) => setQualTrab(Number(e.target.value))}
                max={10}
                min={0}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Comentário</span>
              </label>
              <input
                type="text"
                placeholder="Deseja adicionar algum comentário?"
                className="input input-bordered"
                name="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                maxLength={200}
              />
            </div>
            <div className="form-control w-full max-w-x">
              <label className="label">
                <span className="label-text">
                  Qual a área em que foi realizada?
                </span>
              </label>
              <select
                className="select select-bordered"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="" disabled>
                  Escolha a área
                </option>
                {infos.areas.map((x, i) => (
                  <option key={i}>{x}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-error btn-sm"
                onClick={() => {
                  setMenuAdicionar(false);
                  setVisibilidade(true);
                }}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={async () => {
                  aluno.avaliacoes.push({
                    qualidade: qualTrab,
                    area,
                    comentario,
                  });
                  await fetch("/api/alunos", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: aluno.id,
                      name: aluno.name,
                      mentor: aluno.mentor,
                      email: aluno.email,
                      instituicao: aluno.instituicao,
                      nivelDeEducacao: aluno.nivelDeEducacao,
                      avaliacoes: aluno.avaliacoes,
                      registrosSobreOAluno: aluno.registrosSobreOAluno,
                    }),
                  });
                  setMenuAdicionar(false);
                  setVisibilidade(true);
                }}
              >
                Submeter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
