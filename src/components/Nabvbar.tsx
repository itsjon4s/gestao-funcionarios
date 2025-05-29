"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
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
    <nav className="w-full z-20 px-0 md:px-8 py-4 mb-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto rounded-xl bg-base-100/80 shadow-lg px-4 py-3 backdrop-blur-md border border-base-300/60">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="w-9 h-9 rounded-full bg-base-200 flex items-center justify-center shadow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-base-content/40"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  fill="currentColor"
                  className="text-primary/60"
                />
              </svg>
            </span>
            <span className="text-2xl font-bold text-base-content tracking-tight group-hover:text-primary transition">
              Gestão de Utilizadores
            </span>
          </Link>
        </div>
        {/* Nav Links */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg font-medium text-base-content hover:bg-base-200 transition"
          >
            Estagiários
          </Link>
          <Link
            href="/avaliacoes"
            className="px-4 py-2 rounded-lg font-medium text-base-content hover:bg-base-200 transition"
          >
            Avaliações
          </Link>
          <Link
            href="/monitorizacao"
            className="px-4 py-2 rounded-lg font-medium text-base-content hover:bg-base-200 transition"
          >
            Monitorização
          </Link>
          <Link
            href="/registro"
            className="px-4 py-2 rounded-lg font-medium text-base-content hover:bg-base-200 transition"
          >
            Registro
          </Link>
          <Link
            href="/guia"
            className="px-4 py-2 rounded-lg font-medium text-base-content hover:bg-base-200 transition"
          >
            Guia
          </Link>
          {admin && (
            <Link
              href="/backoffice"
              className="px-4 py-2 rounded-lg font-medium text-primary border border-primary/30 hover:bg-primary/10 transition ml-2"
            >
              Painel Administrativo
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
