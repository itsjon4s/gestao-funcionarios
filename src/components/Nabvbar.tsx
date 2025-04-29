import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 rounded-lg  p-4 mb-5">
      <div className="navbar-center space-x-2">
        <Link
          href="/"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          Gestao de Utilizadores
        </Link>
        <Link
          href="/avaliacoes"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          Avaliações
        </Link>
        <Link
          href="/monitorizacao"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          Monitorização
        </Link>
        <Link
          href="/registro"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          Registro
        </Link>
        <Link
          href="/guia"
          className="btn btn-primary text-lg text-white hover:btn-secondary"
        >
          GUIA
        </Link>
      </div>
    </div>
  );
}
