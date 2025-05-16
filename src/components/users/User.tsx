import { useEffect, useState } from "react";
import type { Aluno, Mentor, Infos } from "@/types/users";

interface UserProps {
  aluno: Aluno;
  func: any;
}

export default function User(props: UserProps) {
  const [editando, setEditando] = useState(false);
  const [email, setEmail] = useState(props.aluno.email);
  const [name, setName] = useState(props.aluno.name);
  const [mentor, setMentor] = useState(props.aluno.mentor);
  const [instituicao, setInstituicao] = useState(props.aluno.instituicao);
  const [nivelDeEducacao, setNivelDeEducacao] = useState(
    props.aluno.nivelDeEducacao
  );

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

  async function deleteUser() {
    await fetch("/api/alunos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.aluno.id }),
    });
  }

  return (
    <div className="card bg-base-300 w-96 p-6 mr-12 mb-2">
      <p className="card-title">
        Estagiario - <strong>{props.aluno?.name}</strong>
      </p>
      <div className="card-body">
        {editando ? (
          <>
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
                placeholder="Qual o nome do estagiario(a)?"
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
            <div className="form-control">
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nivel de Educacacao</span>
              </label>
              <select
                className="select"
                required
                onChange={(x) => setNivelDeEducacao(x.target.value)}
              >
                <option disabled selected>
                  Qual o nivel de ensino?
                </option>
                {infos.niveisDeEducacao.map((x, i) => (
                  <option key={i}>{x}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-between pt-2">
              <button
                className="btn btn-error"
                onClick={() => {
                  setEditando(false);
                  setEmail(props.aluno.email);
                  setName(props.aluno.name);
                  setMentor(props.aluno.mentor);
                  setInstituicao(props.aluno.instituicao);
                  setNivelDeEducacao(props.aluno.nivelDeEducacao);
                }}
              >
                Cancelar Edicao
              </button>
              <button
                onClick={async () => {
                  await fetch("/api/alunos", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      id: props.aluno.id,
                      name,
                      mentor: mentor,
                      email,
                      instituicao: instituicao,
                      nivelDeEducacao: nivelDeEducacao,
                      avaliacoes: props.aluno.avaliacoes,
                      registrosSobreOAluno: props.aluno.registrosSobreOAluno,
                    }),
                  });
                  setEditando(false);
                  props.func(Date.now());
                }}
                className="btn btn-success"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </>
        ) : (
          <>
            <span>
              Email: <strong>{props.aluno?.email}</strong>
            </span>
            <span>
              Mentor: <strong>{props.aluno?.mentor}</strong>
            </span>
            <span>
              Instituicao: <strong>{props.aluno?.instituicao}</strong>
            </span>
            <span>
              Nivel de Educacacao:{" "}
              <strong>{props.aluno?.nivelDeEducacao}</strong>
            </span>
            <div className="card-actions flex justify-between">
              <button
                className="btn btn-success"
                onClick={async () => {
                  setEditando(true);
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-error"
                onClick={async () => {
                  deleteUser();
                  props.func(Date.now());
                }}
              >
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
