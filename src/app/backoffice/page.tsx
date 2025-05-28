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
  }, []);

  if (!user) {
    return <h1>Carregando...</h1>;
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

  return (
    <div>
      <Navbar />
      <div className="space-y-4">
        <div className="flex justify-between">
          <h1 className="text-3xl">
            <strong>Painel Administrativo</strong>
          </h1>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="bg-base-300 p-5 rounded-lg flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">Mentores:</h1>
              <p>Mentores disponiveis:</p>
              <ol className="ml-4 ">
                {mentores.length == 0 ? (
                  <strong>Sem mentores adicionados ainda.</strong>
                ) : (
                  mentores.map((x, i) => <li key={i}>{x.name}</li>)
                )}
              </ol>
            </div>
            <div>
              <a href="/adicionarMentor">
                <button className="btn btn-primary  hover:btn-error text-lg">
                  Adicionar Mentor
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-base-300 p-5 rounded-lg flex justify-between ">
          <div>
            <h1 className="text-2xl font-bold">Instituições:</h1>
            <p>Instituições ja presentes:</p>
            <ol className="ml-4 ">
              {infos!.instituicoes.length == 0 ? (
                <strong>Sem instituições adicionadas ainda.</strong>
              ) : (
                infos!.instituicoes.map((x, i) => <li key={i}>{x}</li>)
              )}
            </ol>
          </div>
          <div>
            <a href="/adicionarInstituicao">
              <button className="btn btn-primary  hover:btn-error text-lg">
                Adicionar Instituição
              </button>
            </a>
          </div>
        </div>

        <div className="bg-base-300 p-5 rounded-lg flex justify-between ">
          <div>
            <h1 className="text-2xl font-bold">Níveis de educacao:</h1>
            <p>Níveis ja presentes:</p>
            <ol className="ml-4 ">
              {infos!.niveisDeEducacao.length == 0 ? (
                <strong>Sem níveis de educacao adicionadas ainda.</strong>
              ) : (
                infos!.niveisDeEducacao.map((x, i) => <li key={i}>{x}</li>)
              )}
            </ol>
          </div>
          <div>
            <a href="/adicionarInstituicao">
              <button className="btn btn-primary  hover:btn-error text-lg">
                Adicionar nível de educacao
              </button>
            </a>
          </div>
        </div>

        <div className="bg-base-300 p-5 rounded-lg flex justify-between ">
          <div>
            <h1 className="text-2xl font-bold">Areas:</h1>
            <p>Areas ja presentes:</p>
            <ol className="ml-4 ">
              {infos!.areas.length == 0 ? (
                <strong>Sem areas adicionadas ainda.</strong>
              ) : (
                infos!.areas.map((x, i) => <li key={i}>{x}</li>)
              )}
            </ol>
          </div>
          <div>
            <a href="/adicionarArea">
              <button className="btn btn-primary  hover:btn-error text-lg">
                Adicionar Area
              </button>
            </a>
          </div>
        </div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Nome</th>
                <th>Mentor</th>
                <th>Instituição</th>
                <th>Nível de Educação</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((x, i) => (
                <tr key={i} className="hover:bg-base-300">
                  <td>{i + 1}</td>
                  <td>{x.email}</td>
                  <td>{x.name}</td>
                  <td>{x.mentor}</td>
                  <td>{x.instituicao}</td>
                  <td>{x.nivelDeEducacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
