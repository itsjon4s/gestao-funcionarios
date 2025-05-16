export interface Avaliacao {
  area: string;
  qualidade: number;
  comentario?: string;
}

export interface Registro {
  mentor: string;
  dia: string;
  registro: string;
}

export interface Aluno {
  id: string;
  name: string;
  email: string;
  avaliacoes: Avaliacao[];
  mentor: string;
  instituicao: string;
  nivelDeEducacao: string;
  registrosSobreOAluno: Registro[];
}


export interface Mentor {
  name: string;
  email: string;
  id: string;
  alunosMentorados: string[];
}

export interface Infos {
  id: string;
  niveisDeEducacao: string[];
  instituicoes: string[];
  areas: string[];
}
