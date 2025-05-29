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
      <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-300">
        <Navbar />
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
            Painel de Controle <span className="text-primary">Estagiários</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 text-center max-w-2xl mt-2">
            Organize, monitore e avalie os seus estagiários de forma inteligente
            e centralizada.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <a href="/adicionarEstagiario">
            <button className="btn btn-primary text-white text-lg px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all">
              Adicionar Estagiário
            </button>
          </a>
        </div>
        <div className="w-full max-w-5xl mt-10 bg-base-100/80 rounded-2xl shadow-2xl border border-base-300/40 backdrop-blur-md p-6">
          <User />
        </div>
      </div>
    </div>
  );
}
