jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  useParams: () => ({ id: "123" }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { nome: "João", id: 1 },
        { nome: "Maria", id: 2 },
      ]),
  })
) as jest.Mock;

import AdicionarArea from "../src/app/adicionarArea/page";
import AdicionarEstagiario from "../src/app/adicionarEstagiario/page";
import AdicionarInstituicao from "../src/app/adicionarInstituicao/page";
import AdicionarMentor from "../src/app/adicionarMentor/page";
import Avaliacao from "../src/app/avaliacoes/page";
import Backoffice from "../src/app/backoffice/page";
import Guia from "../src/app/guia/page";
import Login from "../src/app/login/page";
import Monitorizacao from "../src/app/monitorizacao/page";
import Registro from "../src/app/registro/page";
import RegistroId from "../src/app/registro/[id]/page";
import AvaliacaoId from "../src/app/avaliacoes/[id]/page";
import Home from "../src/app/page";

describe("Testar todas as rotas do app", () => {
  it("renderiza Home", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza AdicionarArea", () => {
    render(<AdicionarArea />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza AdicionarEstagiario", () => {
    render(<AdicionarEstagiario />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza AdicionarInstituicao", () => {
    render(<AdicionarInstituicao />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza AdicionarMentor", () => {
    render(<AdicionarMentor />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza Avaliacao", () => {
    render(<Avaliacao />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza Backoffice", () => {
    render(<Backoffice />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza Guia", () => {
    render(<Guia />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza Login", () => {
    render(<Login />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza Monitorizacao", () => {
    render(<Monitorizacao />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza Registro", () => {
    render(<Registro />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza RegistroId", () => {
    render(<RegistroId />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });

  it("renderiza AvaliacaoId", () => {
    render(<AvaliacaoId />);
    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
  });
});
