"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Nabvbar";
import Link from "next/link";
import type { Mentor, Infos } from "@/types/users";

export default function AdicionarEstagiario() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mentor, setMentor] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [nivelDeEducacao, setNivelDeEducacao] = useState("");
  const router = useRouter();

  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });

  useEffect(() => {
    fetch("/api/mentores").then((x) => {
      x.json().then((d) => {
        setMentores(d);
      });
    });
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
            Adicionar Estagiário
          </h1>
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              await fetch("/api/alunos", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  mentor,
                  email,
                  instituicao,
                  nivelDeEducacao,
                  avaliacoes: [],
                  registrosSobreOAluno: [],
                }),
              });
              router.push("/");
            }}
          >
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
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nome</span>
              </label>
              <input
                placeholder="Qual o nome do estagiário(a)?"
                className="input input-bordered"
                name="name"
                value={name}
                onChange={(x) => setName(x.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mentor</span>
              </label>
              <select
                className="select"
                required
                value={mentor}
                onChange={(x) => setMentor(x.target.value)}
              >
                <option disabled value="">
                  Qual o mentor dele(a)?
                </option>
                {mentores.map((x, i) => (
                  <option key={i}>{x.name}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instituição</span>
              </label>
              <select
                className="select"
                required
                value={instituicao}
                onChange={(x) => setInstituicao(x.target.value)}
              >
                <option disabled value="">
                  Qual a instituição de ensino?
                </option>
                {infos.instituicoes.map((x, i) => (
                  <option key={i}>{x}</option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nível de Educação</span>
              </label>
              <select
                className="select"
                required
                value={nivelDeEducacao}
                onChange={(x) => setNivelDeEducacao(x.target.value)}
              >
                <option disabled value="">
                  Qual o nível de ensino?
                </option>
                {infos.niveisDeEducacao.map((x, i) => (
                  <option key={i}>{x}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="btn btn-error"
                type="button"
                onClick={() => {
                  setName("");
                  setEmail("");
                  setMentor("");
                  setInstituicao("");
                  setNivelDeEducacao("");
                }}
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
              onClick={() => router.push("/")}
            >
              Voltar à página inicial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
