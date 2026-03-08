import type Produto from "../../../models/Produto"

interface Props {
  produtos: Produto[]
}

export function ProdutosRecentes({ produtos }: Props) {

  // LÓGICA DE FILTRO
  const ultimos = produtos.slice(-5).reverse()

  // FORMATAÇÃO DE MOEDA
  function formatarPreco(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(valor)
  }

  return (

    <div className="
      bg-white
      border border-gray-200
      rounded-xl
      p-6
      shadow-sm
    ">

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-gray-900">
          Produtos Recentes
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Os últimos produtos adicionados ao cardápio
        </p>

      </div>

      <div className="flex flex-col gap-3">

        {ultimos.map(produto => (

          <div
            key={produto.id}
            className="
            flex items-center justify-between
            border border-gray-200
            rounded-lg
            px-4 py-3
            hover:bg-gray-50
            transition
            "
          >

            <div className="flex flex-col gap-1">

              <span className="text-sm font-medium text-gray-900">
                {produto.nome}
              </span>

              {produto.categoria && (
                <span className="
                  text-xs
                  bg-gray-100
                  text-gray-700
                  px-2 py-1
                  rounded-md
                  w-fit
                ">
                  {produto.categoria.descricao}
                </span>
              )}

            </div>

            <span className="
              text-sm
              font-semibold
              text-orange-600
            ">
              {formatarPreco(produto.preco)}
            </span>

          </div>

        ))}

      </div>

    </div>
  )
}