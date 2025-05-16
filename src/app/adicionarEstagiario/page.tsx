"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Nabvbar";
import Link from "next/link";
import type { Mentor, Infos } from "@/types/users";

export default function AdicionarEstagiario() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [MENTOR, setMentor] = useState("");
  const [INSTITUICAO, setInstituicao] = useState("");
  const [NIVELDEEDUCACAO, setNivelDeEducacao] = useState("");
  const router = useRouter();

  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });

  const initialFetch = () => {
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
            {/* <h1>Adicionar um Estagiario</h1> */}
            <form className="card-body">
              <div className="form-control flex justify-center items-center space-x-3">
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
              <div className="form-control flex justify-center items-center space-x-3">
                <label className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  placeholder="Qual o nome do estagiario(a)?"
                  className="input input-bordered"
                  name="name"
                  value={name}
                  onChange={(x) => setName(x.target.value)}
                  required
                />
              </div>
              <div className="form-control flex justify-center items-center space-x-3">
                <label className="label">
                  <span className="label-text">Mentor</span>
                </label>
                <select
                  className="select"
                  required
                  onChange={(x) => {
                    return setMentor(x.target.value);
                  }}
                >
                  <option disabled selected>
                    Qual o mentor dele(a)
                  </option>
                  {mentores.map((x, i) => (
                    <option key={i}>{x.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-control flex justify-center items-center space-x-3">
                <label className="label">
                  <span className="label-text">Instituicao</span>
                </label>
                <select
                  className="select"
                  required
                  onChange={(x) => {
                    return setInstituicao(x.target.value);
                  }}
                >
                  <option disabled selected>
                    Qual a instituicao de ensino?
                  </option>
                  {infos.instituicoes.map((x, i) => (
                    <option key={i}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="form-control flex justify-center items-center space-x-3">
                <label className="label">
                  <span className="label-text">Nivel de Educacacao</span>
                </label>
                <select
                  className="select"
                  required
                  onChange={(x) => {
                    return setNivelDeEducacao(x.target.value);
                  }}
                >
                  <option disabled selected>
                    Qual o nivel de ensino?
                  </option>
                  {infos.niveisDeEducacao.map((x, i) => (
                    <option key={i}>{x}</option>
                  ))}
                </select>
              </div>
            </form>
            <div className="flex justify-center items-center">
              <button
                className="btn btn-success"
                type="submit"
                onClick={async () => {
                  await fetch("/api/alunos", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name,
                      mentor: MENTOR,
                      email,
                      instituicao: INSTITUICAO,
                      nivelDeEducacao: NIVELDEEDUCACAO,
                      avaliacoes: [],
                      registrosSobreOAluno: [],
                    }),
                  });
                  router.push("/");
                }}
              >
                Submeter
              </button>
            </div>
          </div>
        </div>
        <Link href="/">
          <button className="btn">Votlar a pagina inicial</button>
        </Link>
      </div>
    </div>
  );
}
