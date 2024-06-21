export default function Navbar() {
  return (
    <div className="navbar bg-base-300 rounded-lg  p-4 mb-5">
      <div className="navbar-center space-x-2">
        <a
          href="/"
          className="btn btn-primary text-lg text-white hover:btn-error"
        >
          Gestao de Utilizadores
        </a>
        <a
          href="/avaliacoes"
          className="btn btn-primary text-lg text-white hover:btn-error"
        >
          Avaliações
        </a>
        <a
          href="monitorização"
          className="btn btn-primary text-lg text-white hover:btn-error"
        >
          Monitorização
        </a>
      </div>
    </div>
  );
}
