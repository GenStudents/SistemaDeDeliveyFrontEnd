import type Categoria from "./Categoria"

export interface Produto {
  id?: number
  nome: string
  descricao: string
  preco: number
  disponivel: boolean
  categoria: Categoria | null
}