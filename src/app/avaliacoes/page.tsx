"use client";

import AvaliarUsuario from "@/components/AvaliarUsuario";
import Navbar from "@/components/Nabvbar";
import { useEffect, useState } from "react";

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
export default function Avaliacoes() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alterar, setAlterar] = useState(0);

  const fetchAlunos = () => {
    fetch("/api/alunos").then((x) => {
      x.json().then((d) => {
        setAlunos(d);
      });
    });
  };

  useEffect(() => {
    fetchAlunos();
  }, [alterar]);

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
