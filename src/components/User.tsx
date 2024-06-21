import { useState } from "react";

interface Avaliacao {
  area: string;
  qualidade: number;
}

interface Aluno {
  id: string;
  name: string;
  email: string;
  avaliacoes: Avaliacao[];
  mentor: string;
  instituicao: string;
  nivelDeEducacao: number;
  registrosSobreOAluno: string[];
}

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
                      mentor,
                      email,
                      instituicao,
                      nivelDeEducacao,
                      avaliacoes: props.aluno.avaliacoes,
                      registrosSobreOAluno: props.aluno.registrosSobreOAluno,
                    }),
                  });
                  setEditando(false);
                  props.func(Date.now());
                }}
                className="btn btn-success"
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
