"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Nabvbar";
import Link from "next/link";
import type { Infos } from "@/types/users";

export default function AdicionarMentor() {
  const [name, setName] = useState("");
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });
  const router = useRouter();

  const initialFetch = () => {
    fetch("/api/infosWebsite").then((x) => {
      x.json().then((d) => {
        setInfos(d);
      });
    });
  };

  useEffect(() => {
    initialFetch();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-between space-x-2">
        <div className="hero bg-base-200">
          <div className="card p-4 text-center text-3xl">
            <h1>Adicionar uma Instituicao</h1>
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  placeholder="Nome da Instituicao?"
                  className="input input-bordered"
                  name="name"
                  value={name}
                  onChange={(x) => setName(x.target.value)}
                  type="string"
                />
              </div>
            </form>
            <div className="flex justify-between">
              <button
                className="btn btn-error"
                onClick={() => {
                  setName("");
                }}
              >
                Limpar Formulario
              </button>
              <button
                className="btn btn-success"
                onClick={async () => {
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
                Submeter
              </button>
            </div>
          </div>
        </div>
        <Link href="/backoffice">
          <button className="btn">Votlar ao backoffice</button>
        </Link>
      </div>
    </div>
  );
}
