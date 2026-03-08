import type Categoria from "./Categoria";

export default interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string | number; // Aceita string do JSON ou número tratado
  foto?: string;
  quantidade?: number;
  disponivel: boolean;
  
  // Novos campos nutricionais vindos do JSON
  calorias?: number;
  proteina?: number;
  gordura?: number;
  acucar?: number;
  carboidratos?: number; // Adicionado conforme sua necessidade

  categoria: Categoria; // Removido o null para garantir acesso à descrição
}