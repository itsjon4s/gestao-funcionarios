"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Nabvbar";
import { useRouter } from "next/navigation";
import type { Mentor, Infos, Aluno } from "@/types/users";

export default function Registro() {
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [infos, setInfos] = useState<Infos>({
    instituicoes: [],
    niveisDeEducacao: [],
    id: "",
    areas: [],
  });
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  const initialFetch = async () => {
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
    fetch("/api/alunos")
      .then((res) => res.json())
      .then((data) => {
        setAlunos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetch("/api/me")
      .then(async (res) => {
        if (!res.ok) {
          router.push("/");
          return;
        }
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => {
        router.push("/");
      });
    initialFetch();
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-300 flex items-center justify-center">
        <Navbar />
        <h1></h1>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-300">
        <Navbar />
        <h1></h1>
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-base-content relative">
      <Navbar />
      <h1></h1>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 w-[700px] h-[350px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-primary blur-3xl opacity-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-primary blur-2xl opacity-30"></div>
      </div>
      <div className="relative z-10 space-y-8 pt-20 pb-10 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center drop-shadow-lg mb-8">
          <span className="text-primary">Painel Administrativo</span>
        </h1>
        <div className="flex flex-col space-y-5">
          <div className="bg-base-100/80 p-5 rounded-2xl shadow border border-base-300/40 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Mentores:</h1>
              <p>Mentores disponíveis:</p>
              <ol className="ml-4">
                {mentores.length === 0 ? (
                  <strong>Sem mentores adicionados ainda.</strong>
                ) : (
                  mentores.map((x, i) => <li key={i}>{x.name}</li>)
                )}
              </ol>
            </div>
            <a href="/adicionarMentor">
              <button className="btn btn-primary hover:btn-error text-lg">
                Adicionar Mentor
              </button>
            </a>
          </div>
          <div className="bg-base-100/80 p-5 rounded-2xl shadow border border-base-300/40 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Instituições:</h1>
              <p>Instituições já presentes:</p>
              <ol className="ml-4">
                {infos.instituicoes.length === 0 ? (
                  <strong>Sem instituições adicionadas ainda.</strong>
                ) : (
                  infos.instituicoes.map((x, i) => <li key={i}>{x}</li>)
                )}
              </ol>
            </div>
            <a href="/adicionarInstituicao">
              <button className="btn btn-primary hover:btn-error text-lg">
                Adicionar Instituição
              </button>
            </a>
          </div>
          <div className="bg-base-100/80 p-5 rounded-2xl shadow border border-base-300/40 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Níveis de Educação:</h1>
              <p>Níveis já presentes:</p>
              <ol className="ml-4">
                {infos.niveisDeEducacao.length === 0 ? (
                  <strong>Sem níveis de educação adicionados ainda.</strong>
                ) : (
                  infos.niveisDeEducacao.map((x, i) => <li key={i}>{x}</li>)
                )}
              </ol>
            </div>
            <a href="/adicionarInstituicao">
              <button className="btn btn-primary hover:btn-error text-lg">
                Adicionar nível de educação
              </button>
            </a>
          </div>
          <div className="bg-base-100/80 p-5 rounded-2xl shadow border border-base-300/40 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Áreas:</h1>
              <p>Áreas já presentes:</p>
              <ol className="ml-4">
                {infos.areas.length === 0 ? (
                  <strong>Sem áreas adicionadas ainda.</strong>
                ) : (
                  infos.areas.map((x, i) => <li key={i}>{x}</li>)
                )}
              </ol>
            </div>
            <a href="/adicionarArea">
              <button className="btn btn-primary hover:btn-error text-lg">
                Adicionar Área
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
