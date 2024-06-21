"use client";

interface Avaliacao {
  area: string;
  qualidade: number;
}

interface Aluno {
  id: string;
  name: string;
  email: string;
  avaliacoes: Avaliacao[];
  mentor: string;
  instituicao: string;
  nivelDeEducacao: number;
  registrosSobreOAluno: string[];
}

interface AvaliarUsuarioProps {
  aluno: Aluno;
}
import { useState } from "react";

export default function AvaliarUsuario({ aluno }: AvaliarUsuarioProps) {
  const [qualTrab, setQualTrab] = useState(0);
  const [area, setArea] = useState("");
  const [menuAdicionar, setMenuAdicionar] = useState(false);

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
            <button className="btn btn-primary">Ver Avaliações</button>
          </a>
          <button
            className="btn btn-success"
            onClick={() => {
              setMenuAdicionar(true);
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
                  onChange={(aluno) =>
                    setQualTrab(parseInt(aluno.target.value))
                  }
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
                      })
                    console.log(aluno.avaliacoes)
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
                    setMenuAdicionar(false)
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
