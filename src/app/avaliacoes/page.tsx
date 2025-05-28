'use client'

import AvaliarUsuario from "@/components/users/AvaliarUser";
import Navbar from "@/components/Nabvbar";
import { useEffect, useState } from "react";
import type { Aluno } from "@/types/users";

export default function Avaliacoes() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alterar, setAlterar] = useState(0);
  const [loading, setLoading] = useState(true);

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
  }, [alterar]);

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
      <div className="  space-y-4">
        <div className="flex">
          <h1 className="text-3xl">
            Painel de Controle - <strong>Avaliações</strong>
          </h1>
        </div>
        <div className="flex flex-wrap">
          {alunos.map((aluno, i) => (
            <AvaliarUsuario aluno={aluno} key={i}></AvaliarUsuario>
          ))}
        </div>
      </div>
    </div>
  );
}
