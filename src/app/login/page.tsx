"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError("Erro ao autenticar. Verifique suas credenciais.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 via-base-100 to-base-300 text-base-content relative flex items-center justify-center">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 w-[700px] h-[350px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-primary blur-3xl opacity-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-primary blur-2xl opacity-30"></div>
      </div>
      <div className="relative z-10 w-full max-w-sm bg-base-100/90 p-8 rounded-xl shadow-2xl border border-base-300/40 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/40"
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
          <h2 className="text-3xl font-semibold text-center text-base-content">
            Entrar
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-base-content"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-200/70"
              placeholder="you@devscope.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-base-content"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-200/70"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-focus focus:ring-4 focus:ring-primary transition"
          >
            Login
          </button>
        </form>
      </div>
      <footer className="absolute bottom-0 left-0 w-full py-4 bg-gradient-to-t from-base-200/80 via-base-100/60 to-transparent text-center text-base-content/60 text-sm">
        Gestão de Estagiários &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
