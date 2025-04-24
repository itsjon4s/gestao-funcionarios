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
  const [alterar, setAlterar] = useState(0);
  const [data1, setData1] = useState<Data[]>([{ name: "A", uv: 40, amt: 40 }]);
  const [data2, setData2] = useState<Data[]>([{ name: "A", uv: 40, amt: 40 }]);
  const [data3, setData3] = useState<Data[]>([{ name: "A", uv: 40, amt: 40 }]);
  const [data4, setData4] = useState<Data[]>([{ name: "A", uv: 40, amt: 40 }]);


  useEffect(() => {
    fetchAlunos();
    //@ts-ignore
  }, [alterar]);

  
  useEffect(() => {
    setData1(
      alunos.map(
        (a) => {
          return {
            name: a?.name,
            uv: a?.avaliacoes
              .filter((x) => x.area == "Front-End")
              ?.map((x) => x.qualidade)
              ? a?.avaliacoes
                  .filter((x) => x.area == "Front-End")
                  ?.map((x) => x.qualidade)
                  .reduce((acc, c) => acc + c)
              : 0,
            amt: a?.avaliacoes
              .filter((x) => x.area == "Front-End")
              ?.map((x) => x.qualidade)
              ? a?.avaliacoes
                  .filter((x) => x.area == "Front-End")
                  ?.map((x) => x.qualidade)
                  .reduce((acc, c) => acc + c)
              : 0,
          };
        },
        [alunos]
      )
    );
    //
    setData2(
      alunos.map(
        (a) => {
          return {
            name: a?.name,
            uv: a?.avaliacoes
              .filter((x) => x.area == "Back-End")
              ?.map((x) => x.qualidade)
              ? a?.avaliacoes
                  .filter((x) => x.area == "Back-End")
                  ?.map((x) => x.qualidade)
                  .reduce((acc, c) => acc + c)
              : 0,
            amt: a?.avaliacoes
              .filter((x) => x.area == "Back-End")
              ?.map((x) => x.qualidade)
              ? a?.avaliacoes
                  .filter((x) => x.area == "Back-End")
                  ?.map((x) => x.qualidade)
                  .reduce((acc, c) => acc + c)
              : 0,
          };
        },
        [alunos]
      )
    );
    //
    setData3(
      alunos.map(
        (a) => {
          return {
            name: a?.name,
            uv: a?.avaliacoes
              .filter((x) => x.area == "Banco de Dados")
              ?.map((x) => x.qualidade)
              ? a?.avaliacoes
                  .filter((x) => x.area == "Banco de Dados")
                  ?.map((x) => x.qualidade)
                  .reduce((acc, c) => acc + c)
              : 0,
            amt: a?.avaliacoes
              .filter((x) => x.area == "Banco de Dados")
              ?.map((x) => x.qualidade)
              ? a?.avaliacoes
                  .filter((x) => x.area == "Banco de Dados")
                  ?.map((x) => x.qualidade)
                  .reduce((acc, c) => acc + c)
              : 0,
          };
        },
        [alunos]
      )
    );
    //
    setData4(
      alunos.map(
        (a) => {
          return {
            name: a?.name,
            uv: a?.avaliacoes
              .filter((x) => x.area == "Design Grafico")
              ?.map((x) => x.qualidade)
              ? a?.avaliacoes
                  .filter((x) => x.area == "Design Grafico")
                  ?.map((x) => x.qualidade)
                  .reduce((acc, c) => acc + c)
              : 0,
            amt: a?.avaliacoes
              .filter((x) => x.area == "Design Grafico")
              ?.map((x) => x.qualidade)
              ? a?.avaliacoes
                  .filter((x) => x.area == "Design Grafico")
                  ?.map((x) => x.qualidade)
                  .reduce((acc, c) => acc + c)
              : 0,
          };
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
