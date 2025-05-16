"use client";
import Navbar from "@/components/Nabvbar";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Aluno } from "@/types/users";

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
          {aluno?.avaliacoes?.length >= 1 ? (
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
              <table className="table">
                <thead>
                  <th></th>
                  <th>Area</th>
                  <th>Comentario</th>
                  <th>Qualidade</th>
                </thead>
                <tbody>
                  {aluno?.avaliacoes?.map((x, i) => {
                    return (
                      <tr key={i} className="hover:bg-base-300">
                        <th>{i}</th>
                        <td>{x.area}</td>
                        <td>{x.comentario || "Sem comentario"}</td>
                        <td>{x.qualidade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <tr>Sem avaliações ainda.</tr>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
