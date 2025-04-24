import Navbar from "@/components/Nabvbar";

export default function Guia() {
  return (
    <div>
      <Navbar />
      <div className="hero hero-content bg-base-300 rounded-lg flex flex-col px-10">
        <h1 className="text-xl font-bold">Pagina de Gestao de utilizadores</h1>
        <span>
          Nesta pagina sera mostrado uma pagina em que sera listado todos os
          estagiarios da empresa
        </span>
        <span>
          Em cada utilizador apos mostrar as suas informacoes, existem 2 opcoes,
          EDITAR e ELIMINAR
        </span>
        <span>
          Ao clicar em eliminar o estagiario sera eleminado da base de dados
        </span>
        <span>
          Ao clicar em editar sera mostrado um formulario em que voce pode
          alterar as informacoes do estagiario
        </span>
        <span>
          E no canto da pagina existe o botao &apos;Adicionar Estagiario&apos;
          que ao clicar no mesmo sera redirecionado para outra pagina com um
          formulario para preencher com as informacoes do mesmo
        </span>
        <h1 className="text-xl font-bold">Painel de Avaliacoes</h1>
        <span>
          Neste painel ao entrar nele, e possivel ver uma lista dos estagiarios
          cada um com 2 opcoes
        </span>
        <ul>
          <li>
            <span>
              1 opcao: Ver avaliacoes, ao clicar neste botao voce sera
              redirecionado para uma pagina em que serao exibidas todas as
              avaliacoes do estagiario
            </span>
          </li>
          <li>
            <span>
              2 opcao: Adicioanr avaliacao, ao clicar neste botao ira aparecer
              um pequeno formulario com 3 campos, qualidade(0-10), comentario
              (opcional), e a area em que foi realizado o trabalho
            </span>
          </li>
        </ul>
        <h1 className="text-xl font-bold">Painel de Monotorizacao</h1>
        <span>
          Neste painel e possivel ver 4 graficos, este painel tem como objetivo
          ver quais estagiarios sao melhores em cada area.
        </span>
        <span>Os graficos sao gerados apartir das avaliacoes de cada um</span>
        <span>
          Ao clicar em cada barra do grafico e possivel ver o total de
          avaliacoes de cada um
        </span>
        <h1 className="text-xl font-bold">Painel de Registros</h1>
        <span>
          Neste painel ao entrar voce vai ver logo uma lista de todos os
          estagiarios e cada um com dois botoes
        </span>
        <span>
          Botao 1: Ver registros, ao clicar neste botao voce sera redirecionado
          para uma pagina em que sera mostrado todos os registros diarios desse
          usuario
        </span>
        <span>
          Botao 2: Adicionar registro, ao clicar neste botao ira aparecer um
          formulario para preencher com as informacoes do registro diario do
          funcionario
        </span>
        <span>
          Nele tem 3 campos o conteudo do registro, o mentor que esta a fazer o
          registro e a data do mesmo.
        </span>
      </div>
    </div>
  );
}
