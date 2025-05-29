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
    setLoading(true);
    fetchAlunos();
  }, []);
  const aluno = alunos.filter((x) => x.id == id)[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-300">
        <Navbar />
        <h1></h1>
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-base-content relative">
      <Navbar />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 w-[700px] h-[350px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-primary blur-3xl opacity-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-primary blur-2xl opacity-30"></div>
      </div>
      <div className="relative z-10 space-y-10 pt-20 pb-10 flex flex-col items-center">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center drop-shadow-lg">
            Registros de <span className="text-primary">{aluno?.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 text-center max-w-2xl mt-2">
            Veja todos os registros diários deste estagiário.
          </p>
        </div>
        <div className="w-full max-w-4xl mt-10 bg-base-100/80 rounded-2xl shadow-2xl border border-base-300/40 backdrop-blur-md p-6">
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
                      <td>{x.registro || "Sem comentário"}</td>
                      <td>
                        {x.mentor ||
                          "Sem mentor, provavelmente foi no início da app"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-base-content/60 py-8">
              Sem registros ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
