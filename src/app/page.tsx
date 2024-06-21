"use client";

import Navbar from "@/components/Nabvbar";
import User from "@/components/User";
import { useEffect, useState } from "react";
export default function Home() {
  const [alunos, setAlunos] = useState([]);
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
        <div className="flex justify-between">
          <h1 className="text-3xl">
            Painel de Controle - <strong>Estagiarios</strong>
          </h1>
          <a href="/adicionarEstagiario">
            <button className="btn btn-primary text-white hover:btn-error text-lg">
              Adicionar Estagiario
            </button>
          </a>
        </div>
        <div className="flex">
          <div className="flex flex-col text-center space-x-4">
            <div className="flex flex-row flex-wrap">
              {alunos.map((x, index) => {
                return <User aluno={x} key={index} func={setAlterar} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
