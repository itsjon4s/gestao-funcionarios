"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Nabvbar";
import type { Aluno, Mentor, Infos } from "@/types/users";

export default function EditarEstagiario() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mentor, setMentor] = useState("");
  const [instituicao, setInstituicao] = useState("");
  const [nivelDeEducacao, setNivelDeEducacao] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });

  useEffect(() => {
    fetch("/api/alunos")
      .then((res) => res.json())
      .then((data: Aluno[]) => {
        const found = data.find((x) => x.id === id);
        if (found) {
          setAluno(found);
          setName(found.name);
          setEmail(found.email);
          setMentor(found.mentor);
          setInstituicao(found.instituicao);
          setNivelDeEducacao(found.nivelDeEducacao);
        } else {
          setError("Estagiário não encontrado.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao buscar dados.");
        setLoading(false);
      });

    fetch("/api/mentores")
      .then((x) => x.json())
      .then((d) => setMentores(d));

    fetch("/api/infosWebsite")
      .then((x) => x.json())
      .then((d) => setInfos(d));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/alunos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name,
        email,
        mentor,
        instituicao,
        nivelDeEducacao,
        avaliacoes: aluno?.avaliacoes || [],
        registrosSobreOAluno: aluno?.registrosSobreOAluno || [],
      }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError("Erro ao atualizar estagiário.");
      setLoading(false);
    }
  }

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-300">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <span className="text-error">{error}</span>
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
      <div className="relative z-10 flex justify-center pt-20 pb-10">
        <div className="hero bg-base-100/80 w-full max-w-2xl rounded-2xl shadow-2xl border border-base-300/40 backdrop-blur-md">
          <div className="card p-8 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Editar Estagiário
            </h2>
            <form onSubmit={handleSubmit} className="card-body space-y-4">
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Nome</span>
                </label>
                <input
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  className="input input-bordered"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Mentor</span>
                </label>
                <select
                  className="select select-bordered"
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Selecione o mentor
                  </option>
                  {mentores.map((m, i) => (
                    <option key={i} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Instituição</span>
                </label>
                <select
                  className="select select-bordered"
                  value={instituicao}
                  onChange={(e) => setInstituicao(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Selecione a instituição
                  </option>
                  {infos.instituicoes?.map((inst, i) => (
                    <option key={i} value={inst}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Nível de Educação</span>
                </label>
                <select
                  className="select select-bordered"
                  value={nivelDeEducacao}
                  onChange={(e) => setNivelDeEducacao(e.target.value)}
                  required
                >
                  <option disabled value="">
                    Selecione o nível de educação
                  </option>
                  {infos.niveisDeEducacao?.map((nivel, i) => (
                    <option key={i} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
              </div>
              {error && <div className="text-error">{error}</div>}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => router.push("/")}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  Guardar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
