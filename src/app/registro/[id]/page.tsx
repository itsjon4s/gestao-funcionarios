"use client";
import Navbar from "@/components/Nabvbar";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Aluno } from "@/types/users";

export default function RegistroEstagiario() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  const fetchAlunos = () => {
    fetch("/api/alunos")
      .then((x) => x.json())
      .then((d) => {
        setAlunos(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlunos();
  }, []);
  const aluno = alunos.filter((x) => x.id == id)[0];

  if (loading) {
    return (
      <div>
        <h1></h1>
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="bg-base-200">
        <div className="card p-4 rounded-lg">
          <div className="card-title text-xl">
            <h1>
              Registros de <strong>{aluno?.name}</strong>
            </h1>
          </div>
          {aluno?.registrosSobreOAluno?.length >= 1 ? (
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Dia</th>
                    <th>Registro</th>
                    <th>Mentor</th>
                  </tr>
                </thead>
                <tbody>
                  {aluno?.registrosSobreOAluno?.map((x, i) => (
                    <tr key={i} className="hover:bg-base-300">
                      <th>{i + 1}</th>
                      <td>{x.dia}</td>
                      <td>{x.registro || "Sem comentario"}</td>
                      <td>
                        {x.mentor ||
                          "Sem mentor, provalvemente foi no inicio da app"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <tr>Sem registros ainda.</tr>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
