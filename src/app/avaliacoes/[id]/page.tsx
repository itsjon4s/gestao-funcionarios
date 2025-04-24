"use client";
import Navbar from "@/components/Nabvbar";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Aluno } from "@/components/User";

export default function AvaliacaoEstagiario() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const params = useParams();
  const id = params.id;

  const fetchAlunos = () => {
    fetch("/api/alunos").then((x) => {
      x.json().then((d) => {
        setAlunos(d);
      });
    });
  };

  useEffect(() => {
    fetchAlunos();
  }, []);
  const aluno = alunos.filter((x) => x.id == id)[0];

  return (
    <div>
      <Navbar />
      <div className=" bg-base-200">
        <div className="card p-4 rounded-lg">
          <div className="card-title text-xl">
            <h1>
              Avaliações de <strong>{aluno?.name}</strong>
            </h1>
          </div>
          <div className="card-body">
            <div className="flex flex-row flex-wrap">
              {aluno?.avaliacoes?.length >= 1 ? (
                aluno?.avaliacoes?.map((x, i) => {
                  return (
                    <div className="w-1/3 mb-2" key={i}>
                      <div className="card bg-base-300 w-72 p-2 rounded-lg">
                        <div className="card-title">
                          Avaliação <strong>N{i + 1}</strong>
                        </div>
                        <div className="card-body">
                          <span>
                            Qualidade: <strong>{x.qualidade}</strong>/10
                          </span>
                          <span>
                            Area: <strong>{x.area}</strong>
                          </span>
                          {x.comentario ? (
                            <>
                              <span>
                                Comentario: <strong>{x.comentario}</strong>
                              </span>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <h1>Sem avaliações ainda.</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
