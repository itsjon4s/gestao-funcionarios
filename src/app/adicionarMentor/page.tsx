"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Nabvbar";
import Link from "next/link";

export default function AdicionarMentor() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="flex justify-between space-x-2">
        <div className="hero bg-base-200">
          <div className="card p-4 text-center text-3xl">
            <h1>Adicionar um Mentor</h1>
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Qual o email dele(a)?"
                  className="input input-bordered"
                  name="email"
                  value={email}
                  onChange={(x) => setEmail(x.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  placeholder="Qual o nome do dele(a)?"
                  className="input input-bordered"
                  name="name"
                  value={name}
                  onChange={(x) => setName(x.target.value)}
                />
              </div>
            </form>
            <div className="flex justify-between">
              <button
                className="btn btn-error"
                onClick={() => {
                  setName("");
                  setEmail("");
                }}
              >
                Limpar Formulario
              </button>
              <button
                className="btn btn-success"
                onClick={async () => {
                  await fetch("/api/mentores", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name,
                      email,
                      alunosMentorados: [],
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
