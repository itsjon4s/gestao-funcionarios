"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Nabvbar";
import type { Infos } from "@/types/users";

export default function AdicionarInstituicao() {
  const [name, setName] = useState("");
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });
  const router = useRouter();

  useEffect(() => {
    fetch("/api/infosWebsite").then((x) => {
      x.json().then((d) => {
        setInfos(d);
      });
    });
  }, []);

  return (
    <div className="min-h-screen text-base-content relative flex flex-col">
      <Navbar />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 w-[700px] h-[350px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-primary blur-3xl opacity-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-primary blur-2xl opacity-30"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 pt-20 pb-10">
        <div className="w-full max-w-md bg-base-100/80 rounded-2xl shadow-2xl border border-base-300/40 backdrop-blur-md p-8">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">
            Adicionar uma Instituição
          </h1>
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              infos.instituicoes.push(name);
              await fetch("/api/infosWebsite", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  instituicoes: infos.instituicoes,
                  niveisDeEducacao: infos.niveisDeEducacao,
                  areas: infos.areas,
                }),
              });
              router.push("/backoffice");
            }}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nome</span>
              </label>
              <input
                placeholder="Nome da Instituição?"
                className="input input-bordered"
                name="name"
                value={name}
                onChange={(x) => setName(x.target.value)}
                type="text"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                className="btn btn-error"
                type="button"
                onClick={() => setName("")}
              >
                Limpar Formulário
              </button>
              <button className="btn btn-success" type="submit">
                Submeter
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-6">
            <button
              className="btn"
              type="button"
              onClick={() => router.push("/backoffice")}
            >
              Voltar ao backoffice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
