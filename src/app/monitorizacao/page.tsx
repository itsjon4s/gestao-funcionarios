"use client";

import Grafico from "@/components/Grafico";
import Navbar from "@/components/Nabvbar";
import React, { useEffect, useState } from "react";
import type { Aluno } from "@/components/User";

interface Data {
  name: string;
  uv: number;
  amt: number;
}

export default function Home() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const fetchAlunos = async () => {
    fetch("/api/alunos").then((x) => {
      x.json().then((d) => {
        setAlunos(d);
      });
    });
  };
  const [data1, setData1] = useState<Data[]>([{ name: "A", uv: 40, amt: 40 }]);
  const [data2, setData2] = useState<Data[]>([{ name: "A", uv: 40, amt: 40 }]);
  const [data3, setData3] = useState<Data[]>([{ name: "A", uv: 40, amt: 40 }]);
  const [data4, setData4] = useState<Data[]>([{ name: "A", uv: 40, amt: 40 }]);

  useEffect(() => {
    fetchAlunos();
    //@ts-ignore
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

  useEffect(() => {
    setData1(
      alunos.map(
        (data) => {
          return d(data, "Front-End");
        },
        [alunos]
      )
    );
    setData2(
      alunos.map(
        (data) => {
          return d(data, "Back-End");
        },
        [alunos]
      )
    );
    setData3(
      alunos.map(
        (data) => {
          return d(data, "Banco de Dados");
        },
        [alunos]
      )
    );
    setData4(
      alunos.map(
        (data) => {
          return d(data, "Design Grafico");
        },
        [alunos]
      )
    );
  }, [alunos]);

  return (
    <div>
      <Navbar />
      <div className="space-y-4">
        <h1 className="text-3xl">
          Painel de Controle - <strong>monitorização</strong>
        </h1>
        <div className="card bg-base-300 p-4">
          <div className="card-title"></div>
          <h1 className="text-3xl">
            <strong>{alunos.length}</strong> - Estagiarios
          </h1>
          <div className="card-body flex flex-col space-y-6 ">
            <div className="flex justify-between bg-base-100 space-x-4 p-10 rounded-lg">
              <div>
                <h1 className="text-xl">
                  <strong>Front-End</strong>
                </h1>
                <Grafico data={data1} />
              </div>
              <div>
                <h1 className="text-xl">
                  <strong>Back-End</strong>
                </h1>
                <Grafico data={data2} />
              </div>
            </div>

            <div className="flex justify-between bg-base-100 space-x-4 p-10 rounded-lg">
              <div>
                <h1 className="text-xl">
                  <strong>Banco de Dados</strong>
                </h1>
                <Grafico data={data3} />
              </div>
              <div>
                <h1 className="text-xl">
                  <strong>Design Grafico</strong>
                </h1>
                <Grafico data={data4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
