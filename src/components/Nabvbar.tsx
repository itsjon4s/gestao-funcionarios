import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then(async (res) => {
        if (!res.ok) {
          setAdmin(false);
        } else {
          setAdmin(true);
        }
        const data = await res.json();
        setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="navbar bg-base-300 rounded-lg  p-4 mb-5 flex justify-between">
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
          Guia
        </Link>
      </div>
      <div>
        <Link
          href="/backoffice"
          className={`btn btn-primary text-lg text-white hover:btn-secondary ${
            admin ? "" : "hidden"
          }`}
        >
          Painel Administrativo
        </Link>
      </div>
    </div>
  );
}
