"use client";

import { useEffect, useState } from "react";
import type { Aluno } from "@/types/users";

export default function User() {
  const [alterar, setAlterar] = useState<number>(0);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const fetchAlunos = () => {
    fetch("/api/alunos").then((x) => {
      x.json().then((d) => {
        setAlunos(d);
      });
    });
  };
  useEffect(() => {
    fetchAlunos();
  }, [alterar]);

  async function deleteUser(id: string) {
    await fetch("/api/alunos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    setAlterar(alterar + 1);
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
      <table className="table">
        <thead>
          <th></th>
          <th>Email</th>
          <th>Nome</th>
          <th>Mentor</th>
          <th>Insituicao</th>
          <th>Nivel de Educacao</th>
          <th></th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          {alunos.map((x, i) => {
            return (
              <tr key={i} className="hover:bg-base-300">
                <td>{i + 1}</td>
                <td>{x.email}</td>
                <td>{x.name}</td>
                <td>{x.mentor}</td>
                <td>{x.instituicao}</td>
                <td>{x.nivelDeEducacao}</td>
                <td>
                  <a href={`/editar/${x.id}`}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-base-content"
                      aria-hidden="true"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                    </svg>
                  </a>
                </td>
                <td>
                  <button onClick={() => deleteUser(x.id)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-base-content"
                      aria-hidden="true"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </td>
                <td>
                  <a
                    href={`/avaliacoes/adicionar/${x.id}`}
                    className="flex items-center justify-center"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-base-content"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
