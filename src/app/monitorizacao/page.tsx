"use client";

import Grafico from "@/components/Grafico";
import Navbar from "@/components/Nabvbar";
import React, { useEffect, useState } from "react";
import type { Aluno, Infos } from "@/types/users";

export default function Home() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchAlunos = async () => {
    fetch("/api/alunos")
      .then((x) => x.json())
      .then((d) => {
        setAlunos(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const initialFetch = () => {
    fetch("/api/infosWebsite").then((x) => {
      x.json().then((d) => {
        setInfos(d);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchAlunos();
    initialFetch();
  }, []);

  function d(data: any, type: string) {
    return {
      name: data?.name,
      uv: data?.avaliacoes
        .filter((x: { area: string }) => x.area == type)
        ?.map((x: { qualidade: number }) => x.qualidade)
        ? data?.avaliacoes
            .filter((x: { area: string }) => x.area == type)
            ?.map((x: { qualidade: number }) => x.qualidade)
            .reduce((acc: number, c: number) => acc + c, 0)
        : 0,
      amt: data?.avaliacoes
        .filter((x: { area: string }) => x.area == type)
        ?.map((x: { qualidade: any }) => x.qualidade)
        ? data?.avaliacoes
            .filter((x: { area: string }) => x.area == type)
            ?.map((x: { qualidade: any }) => x.qualidade)
            .reduce((acc: number, c: number) => acc + c, 0)
        : 0,
    };
  }

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
            Painel de <span className="text-primary">Monitorização</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 text-center max-w-2xl mt-2">
            Visualize o desempenho dos seus estagiários por área de avaliação.
          </p>
        </div>
        <div className="w-full max-w-5xl mt-10 bg-base-100/80 rounded-2xl shadow-2xl border border-base-300/40 backdrop-blur-md p-6">
          <h2 className="text-2xl font-semibold mb-6">
            <span className="text-primary">{alunos.length}</span> Estagiários
          </h2>
          <div className="flex flex-wrap justify-between bg-base-100 space-x-4 p-6 rounded-lg">
            {infos.areas.map((x, i) => (
              <div key={i} className="flex-1 min-w-[220px] max-w-xs mb-6">
                <h3 className="text-xl font-bold mb-2 text-center">
                  {x}
                </h3>
                <Grafico data={alunos.map((data) => d(data, x))} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
