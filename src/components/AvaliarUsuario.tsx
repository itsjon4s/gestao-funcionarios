"use client";

import { useState } from "react";
import type { Aluno } from "@/components/User";

interface AvaliarUsuarioProps {
  aluno: Aluno;
}

export default function AvaliarUsuario({ aluno }: AvaliarUsuarioProps) {
  const [qualTrab, setQualTrab] = useState(0);
  const [area, setArea] = useState("");
  const [comentario, setComentario] = useState("");
  const [menuAdicionar, setMenuAdicionar] = useState(false);
  const [visibilidade, setVisibilidade] = useState(true);

  return (
    <div className="card bg-base-300 w-96 p-6 mr-12 mb-2">
      <div className="card-title">
        <h1 className="text-xl">
          Avaliacoes - <strong>{aluno.name}</strong>
        </h1>
      </div>
      <div className="card-body">
        <div className="flex justify-between space-x-2">
          <a href={`/avaliacoes/${aluno.id}`}>
            <button
              className={`btn btn-primary ${visibilidade ? "" : "hidden"}`}
            >
              Ver Avaliações
            </button>
          </a>
          <button
            className={`btn ${visibilidade ? "" : "hidden"}`}
            onClick={() => {
              setMenuAdicionar(true);
              setVisibilidade(false);
            }}
          >
            Adicionar Avaliacao
          </button>
        </div>
        {menuAdicionar ? (
          <>
            <h1 className="text-xl font-semibold pt-2">
              Adicionar uma nova Avaliacao
            </h1>
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
                onChange={(aluno) => setQualTrab(Number(aluno.target.value))}
                max={10}
                min={0}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Comentario</span>
              </label>
              <input
                type="text"
                placeholder="Deseja adicionar algum comentario?"
                className="input input-bordered"
                name="comentario"
                value={comentario}
                onChange={(x) => setComentario(x.target.value)}
                max={10}
                min={0}
              />
            </div>
            <div className="form-control w-full max-w-x">
              <div className="label">
                <span className="label-text">
                  Qual a area em que foi realizada?
                </span>
              </div>
              <select
                className="select select-bordered"
                onChange={(aluno) => setArea(aluno.target.value)}
              >
                <option disabled selected>
                  Escolha a area
                </option>
                <option>Front-End</option>
                <option>Back-End</option>
                <option>Banco de Dados</option>
                <option>Design Grafico</option>
              </select>
            </div>
            <div className="flex justify-between mt-2">
              <button
                className="btn btn-error"
                onClick={() => {
                  setMenuAdicionar(false);
                  setVisibilidade(true);
                }}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success"
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
                      aluno: aluno.email,
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
                Submenter
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
