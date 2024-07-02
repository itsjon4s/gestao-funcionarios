export default function Navbar() {
  return (
    <div className="navbar bg-base-300 rounded-lg  p-4 mb-5">
      <div className="navbar-center space-x-2">
        <a
          href="/"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          Gestao de Utilizadores
        </a>
        <a
          href="/avaliacoes"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          Avaliações
        </a>
        <a
          href="/monitorizacao"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          Monitorização
        </a>
        <a
          href="/registro"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          Registro
        </a>
        <a
          href="/guia"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          GUIA
        </a>
      </div>
    </div>
  );
}
