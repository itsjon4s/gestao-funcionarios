interface Aluno {
  id: string;
  name: string;
  email: string;
  avaliacoes: string[];
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
    <div className="card bg-zinc-800 w-96 p-6 mr-12">
      <p className="card-title">
        Estagiario - <strong>{props.aluno?.name}</strong>
      </p>
      <div className="card-body">
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
          Nivel de Educacacao: <strong>{props.aluno?.nivelDeEducacao}</strong>
        </span>
        <div>
          <span>Avaliacoes:</span>
          {
            // Futuramente um url que manda para o painel de avaliacoes ao clicar no id
          }
        </div>
      </div>
      <div className="card-actions flex justify-between">
        <button
          className="btn btn-success"
          onClick={async () => {
            // Nao adianta fazer o update hoje porque a interface vai mudar toda entao ia basicamente ter de refaze-lo depois
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
    </div>
  );
}
