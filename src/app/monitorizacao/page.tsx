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
      <div className="space-y-4">
        <h1 className="text-3xl">
          Painel de Controle - <strong>Monitorização</strong>
        </h1>
        <div className="card bg-base-300 p-4">
          <div className="card-title"></div>
          <h1 className="text-3xl">
            <strong>{alunos.length}</strong> - Estagiarios
          </h1>
          <div className="card-body flex flex-col space-y-6 ">
            <div className="flex justify-between bg-base-100 space-x-4 p-10 rounded-lg">
              {infos.areas.map((x, i) => {
                return (
                  <div key={i}>
                    <h1 className="text-xl">
                      <strong>{x}</strong>
                    </h1>
                    <Grafico
                      data={alunos.map(
                        (data) => {
                          return d(data, x);
                        },
                        [alunos]
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
