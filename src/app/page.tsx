"use client";

import Navbar from "@/components/Nabvbar";
import User from "@/components/users/User";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div>
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
            <User />
          </div>
        </div>
      </div>
    </div>
  );
}
