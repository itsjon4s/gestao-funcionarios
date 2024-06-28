"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Nabvbar";
import type { Aluno } from "@/components/User";
import GerirRegistros from "@/components/GeirRegistros";
export default function Registro() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

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

  return (
    <div>
      <Navbar />
      <div className="space-y-4">
        <div className="flex justify-between">
          <h1 className="text-3xl">
            Painel de Controle - <strong>Estagiarios</strong>
          </h1>
        </div>
        <div className="flex flex-wrap">
          {alunos.map((x) => {
            return <GerirRegistros x={x} />;
          })}
        </div>
      </div>
    </div>
  );
}
