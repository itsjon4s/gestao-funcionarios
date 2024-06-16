"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function adicionarEstagiario() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mentor, setMentor] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [nivelDeEducacao, setNivelDeEducacao] = useState(0);

  const router = useRouter();

  return (
    <div className="flex justify-between space-x-2">
      <div className="hero bg-base-200">
        <div className="card p-4 text-center text-3xl">
          <h1>Adicionar um Estagiario</h1>
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
                placeholder="Qual o nome do estagiario(a)?"
                className="input input-bordered"
                name="name"
                value={name}
                onChange={(x) => setName(x.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mentor</span>
              </label>
              <input
                placeholder="Qual o mentor dele(a)?"
                className="input input-bordered"
                name="mentor"
                value={mentor}
                onChange={(x) => setMentor(x.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instituicao</span>
              </label>
              <input
                placeholder="Qual a instituicao de ensino?"
                className="input input-bordered"
                name="instituicao"
                value={instituicao}
                onChange={(x) => setInstituicao(x.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nivel de Educacacao</span>
              </label>
              <input
                type="number"
                placeholder="Qual o nivel de ensino?"
                className="input input-bordered"
                name="nivelDeEducacao"
                value={nivelDeEducacao}
                onChange={(x) => setNivelDeEducacao(parseInt(x.target.value))}
              />
            </div>
          </form>
          <div className="flex justify-between">
            <button
              className="btn btn-error"
              onClick={() => {
                setName("");
                setMentor("");
                setEmail("");
                setInstituicao("");
                setNivelDeEducacao(0);
              }}
            >
              Limpar Formulario
            </button>
            <button
              className="btn btn-success"
              onClick={async () => {
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
                router.push("/")
              }}
            >
              Submeter
            </button>
          </div>
        </div>
      </div>
      <a href="/">
        <button className="btn">Votlar a pagina inicial</button>
      </a>
    </div>
  );
}
