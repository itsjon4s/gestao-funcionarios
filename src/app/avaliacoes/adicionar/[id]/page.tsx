"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Nabvbar";
import type { Aluno, Infos } from "@/types/users";

export default function AdicionarAvaliacao() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });
  const [qualidade, setQualidade] = useState<number>(0);
  const [area, setArea] = useState<string>("");
  const [comentario, setComentario] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/alunos")
      .then((res) => res.json())
      .then((data: Aluno[]) => {
        const found = data.find((x) => x.id === id);
        if (found) {
          setAluno(found);
        } else {
          setError("Estagiário não encontrado.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao buscar dados.");
        setLoading(false);
      });

    fetch("/api/infosWebsite")
      .then((x) => x.json())
      .then((d) => setInfos(d));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!area) {
      setError("Selecione uma área.");
      setLoading(false);
      return;
    }

    const novaAvaliacao = {
      area,
      qualidade,
      comentario,
    };

    const res = await fetch("/api/alunos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: aluno?.name,
        email: aluno?.email,
        mentor: aluno?.mentor,
        instituicao: aluno?.instituicao,
        nivelDeEducacao: aluno?.nivelDeEducacao,
        avaliacoes: [...(aluno?.avaliacoes || []), novaAvaliacao],
        registrosSobreOAluno: aluno?.registrosSobreOAluno || [],
      }),
    });

    if (res.ok) {
      router.push(`/avaliacoes/${id}`);
    } else {
      setError("Erro ao adicionar avaliação.");
      setLoading(false);
    }
  }

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

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <span className="text-error">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-8">
        <div className="hero bg-base-200 w-full max-w-2xl rounded-xl shadow-lg">
          <div className="card p-8 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Adicionar Avaliação para{" "}
              <span className="text-primary">{aluno?.name}</span>
            </h2>
            <form onSubmit={handleSubmit} className="card-body space-y-4">
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Área</span>
                </label>
                <select
                  className="select select-bordered"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Selecione a área
                  </option>
                  {infos.areas.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Qualidade (0-10)</span>
                </label>
                <input
                  className="input input-bordered"
                  type="number"
                  min={0}
                  max={10}
                  value={qualidade}
                  onChange={(e) => setQualidade(Number(e.target.value))}
                  required
                />
              </div>
              <div className="form-control flex flex-col">
                <label className="label">
                  <span className="label-text">Comentário (opcional)</span>
                </label>
                <input
                  className="input input-bordered"
                  type="text"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  maxLength={200}
                  placeholder="Comentário sobre a avaliação"
                />
              </div>
              {error && <div className="text-error">{error}</div>}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => router.push(`/avaliacoes/${id}`)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={() => router.push(`/avaliacoes/${id}`)}
                >
                  Adicionar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
