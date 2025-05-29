"use client";

import Navbar from "@/components/Nabvbar";

export default function Guia() {
  return (
    <div className="min-h-screen text-base-content relative">
      <Navbar />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 z-0 w-[700px] h-[350px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-primary blur-3xl opacity-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-primary blur-2xl opacity-30"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center pt-20 pb-10">
        <div className="w-full max-w-3xl bg-base-100/80 rounded-2xl shadow-2xl border border-base-300/40 backdrop-blur-md p-8">
          <h1 className="text-3xl font-bold text-primary mb-6 text-center">
            Guia de Utilização
          </h1>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-2">
              Página de Gestão de Utilizadores
            </h2>
            <ul className="list-disc ml-6 space-y-1 text-base-content/80">
              <li>Lista todos os estagiários da empresa.</li>
              <li>
                Cada utilizador tem as opções <b>EDITAR</b> e <b>ELIMINAR</b>.
              </li>
              <li>
                <b>ELIMINAR</b>: Remove o estagiário da base de dados.
              </li>
              <li>
                <b>EDITAR</b>: Abre um formulário para alterar as informações do
                estagiário.
              </li>
              <li>
                No canto da página existe o botão <b>Adicionar Estagiário</b>{" "}
                para criar um novo registo.
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-2">Painel de Avaliações</h2>
            <ul className="list-disc ml-6 space-y-1 text-base-content/80">
              <li>Lista todos os estagiários, cada um com duas opções:</li>
              <li>
                <b>Ver avaliações</b>: Mostra todas as avaliações do estagiário.
              </li>
              <li>
                <b>Adicionar avaliação</b>: Abre um formulário com os campos
                qualidade (0-10), comentário (opcional) e área.
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-2">Painel de Monitorização</h2>
            <ul className="list-disc ml-6 space-y-1 text-base-content/80">
              <li>
                Mostra 4 gráficos para visualizar o desempenho dos estagiários
                por área.
              </li>
              <li>Os gráficos são gerados a partir das avaliações.</li>
              <li>
                Ao clicar numa barra do gráfico, vê o total de avaliações de
                cada um.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold mb-2">Painel de Registros</h2>
            <ul className="list-disc ml-6 space-y-1 text-base-content/80">
              <li>Lista todos os estagiários, cada um com dois botões:</li>
              <li>
                <b>Ver registros</b>: Mostra todos os registros diários desse
                utilizador.
              </li>
              <li>
                <b>Adicionar registro</b>: Abre um formulário para preencher o
                registro diário.
              </li>
              <li>
                O formulário tem 3 campos: conteúdo do registro, mentor e data.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
