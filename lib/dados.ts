export interface Material {
  nome: string;
  tipo: 'pdf' | 'video' | 'doc' | 'link';
  url: string;
}

export interface Semana {
  numero: number;
  periodo: string;
  titulo: string;
  materiais: Material[];
}

export interface Bimestre {
  id: number;
  nome: string;
  semanas: Semana[];
}

export interface Serie {
  id: string;
  nome: string;
  bimestres: Bimestre[];
}

export interface Disciplina {
  id: string;
  nome: string;
  series: Serie[];
}

export interface PortalData {
  disciplinas: Disciplina[];
}
