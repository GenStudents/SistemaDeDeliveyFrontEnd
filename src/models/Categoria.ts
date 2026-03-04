import type Produto from "./Produto";

export default interface Categoria{
  descricao: string;
  produtos?: Produto|null;
}