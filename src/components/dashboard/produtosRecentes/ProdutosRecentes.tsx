import type { Produto } from "../../../models/Produto"


interface Props {
  produtos: Produto[]
}

export function ProdutosRecentes({ produtos }: Props) {

  const produtosRecentes = produtos.slice(-5).reverse()

  function formatPrice(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  if (produtosRecentes.length === 0) {
    return (
      <p className="text-center text-gray-400 py-10">
        Nenhum produto cadastrado
      </p>
    )
  }

  return (
    <div className="space-y-3">

      {produtosRecentes.map((produto) => (
        <div
          key={produto.id}
          className="flex justify-between items-center border rounded-lg p-4"
        >

          <div>
            <p className="font-medium">{produto.nome}</p>
          </div>

          <span className="text-orange-500 font-semibold">
            {formatPrice(produto.preco)}
          </span>

        </div>
      ))}
    </div>
  )
}