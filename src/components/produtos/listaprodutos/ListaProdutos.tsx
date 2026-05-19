import { useContext, useEffect, useState } from "react"
import { Pencil, Trash2, Heart, Package } from "lucide-react"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../service/service"
import { AuthContext } from "../../../contestx/AuthContext"

interface ListaProdutosProps {
  onEditarProduto: (produto: Produto) => void
  refreshKey?: number
}

function ListaProdutos({ onEditarProduto, refreshKey = 0 }: ListaProdutosProps) {
  const [produtos, setProdutos] = useState<Produto[]>([])

  const { usuario } = useContext(AuthContext)
  const token = usuario.token

  const header = {
    headers: {
      Authorization: token
    }
  }

  async function buscarProdutos() {
    try {
      await buscar("/produtos", setProdutos, header)
    } catch (error) {
      console.error("Erro ao buscar produtos", error)
    }
  }

  async function deletarProduto(id: number) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este produto?")
    if (confirmar) {
      try {
        await deletar(`/produtos/${id}`, header)
        buscarProdutos()
      } catch (error) {
        console.error("Erro ao deletar produto", error)
        alert("Erro ao deletar produto.")
      }
    }
  }

  useEffect(() => {
    if (token === "") return
    buscarProdutos()
  }, [token, refreshKey])

  function formatarPreco(valor: number | string) {
    const numero = typeof valor === "string" ? parseFloat(valor) : valor

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(numero || 0)
  }

  function renderBadgeSaude(produto: Produto) {
    if (!produto.calorias && !produto.gordura && !produto.acucar) {
      return <span className="text-gray-400 text-xs">-</span>
    }

    let score = 0

    if (produto.calorias && produto.calorias > 400) score += 2
    else if (produto.calorias && produto.calorias > 250) score += 1

    if (produto.gordura && produto.gordura > 15) score += 2
    else if (produto.gordura && produto.gordura > 8) score += 1

    if (score >= 3) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-500 border border-red-200 whitespace-nowrap">
          <Heart size={12} />
          Pouco saudável
        </span>
      )
    }

    if (score >= 1) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200 whitespace-nowrap">
          <Heart size={12} />
          Moderado
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200 whitespace-nowrap">
        <Heart size={12} />
        Saudável
      </span>
    )
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Package size={18} />
          Lista de Produtos
        </h2>
      </div>

      <div className="max-h-[420px] sm:max-h-[520px] overflow-y-auto">
        {produtos.length === 0 && (
          <div className="p-6 sm:p-8 text-center text-gray-500 text-sm">
            Nenhum produto cadastrado no momento.
          </div>
        )}

        <div className="md:hidden p-4 space-y-3">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 break-words">
                    {produto.nome}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500">
                    {produto.categoria?.descricao || "Sem categoria"}
                  </p>
                </div>

                <span className="text-sm font-medium text-slate-900 whitespace-nowrap">
                  {formatarPreco(produto.preco)}
                </span>
              </div>

              <div className="mt-3">
                {renderBadgeSaude(produto)}
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  onClick={() => onEditarProduto(produto)}
                  className="rounded-lg p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => deletarProduto(produto.id)}
                  className="rounded-lg p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Deletar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Nome
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Categoria
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Preço
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                  Saúde
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right w-24">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {produtos.map((produto) => (
                <tr
                  key={produto.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-5 text-sm font-medium text-gray-900">
                    {produto.nome}
                  </td>

                  <td className="px-6 py-5 text-sm font-normal text-gray-600">
                    {produto.categoria?.descricao || <span className="text-gray-300">-</span>}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-900 whitespace-nowrap">
                    {formatarPreco(produto.preco)}
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    {renderBadgeSaude(produto)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => onEditarProduto(produto)}
                        className="text-gray-400 hover:text-orange-500 transition-colors"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deletarProduto(produto.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Deletar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListaProdutos