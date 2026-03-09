import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Pencil, Trash2, Heart } from "lucide-react"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../service/service"
import { AuthContext } from "../../../contestx/AuthContext"

function ListaProdutos() {
  const navigate = useNavigate()
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
    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/")
      return
    }
    buscarProdutos()
  }, [token])

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
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-red-100 text-red-600 border border-red-200 whitespace-nowrap">
          {/* Ícone some no mobile para ficar mais compacto */}
          <Heart size={12} className="hidden sm:inline" /> Pouco saudável
        </span>
      )
    } else if (score >= 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200 whitespace-nowrap">
          <Heart size={12} className="hidden sm:inline" /> Moderado
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-green-100 text-green-700 border border-green-200 whitespace-nowrap">
          <Heart size={12} className="hidden sm:inline" /> Saudável
        </span>
      )
    }
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-sm sm:text-base font-semibold text-gray-700">
          Lista de Produtos
        </h2>
      </div>

      {/* Scroll horizontal só quando precisar */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[520px] sm:min-w-[640px]">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500">
                Nome
              </th>

              {/* Categoria só aparece a partir do sm */}
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 hidden sm:table-cell">
                Categoria
              </th>

              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 whitespace-nowrap">
                Preço
              </th>

              {/* No mobile mantém, mas bem compacto */}
              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500">
                Saúde
              </th>

              <th className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-semibold text-gray-500 text-right whitespace-nowrap w-[96px] sm:w-[120px]">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {produtos.map((produto) => (
              <tr key={produto.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">
                      {produto.nome}
                    </span>

                    {/* Extra útil no mobile: mostra categoria como “subtexto” já que a coluna some */}
                    <span className="text-[11px] text-gray-500 sm:hidden mt-0.5">
                      {produto.categoria?.descricao || "Sem categoria"}
                    </span>
                  </div>
                </td>

                <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                  {produto.categoria?.descricao || <span className="text-gray-300">-</span>}
                </td>

                <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-gray-700 font-mono whitespace-nowrap">
                  {formatarPreco(produto.preco)}
                </td>

                <td className="px-3 py-3 sm:px-4 sm:py-4">
                  {renderBadgeSaude(produto)}
                </td>

                <td className="px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex items-center justify-end gap-1 sm:gap-2 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/editarproduto/${produto.id}`)}
                      className="p-2 sm:p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
                      title="Editar"
                      aria-label={`Editar ${produto.nome}`}
                    >
                      <Pencil size={18} className="sm:w-[18px] sm:h-[18px] w-[20px] h-[20px]" />
                    </button>

                    <button
                      onClick={() => deletarProduto(produto.id)}
                      className="p-2 sm:p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Deletar"
                      aria-label={`Deletar ${produto.nome}`}
                    >
                      <Trash2 size={18} className="sm:w-[18px] sm:h-[18px] w-[20px] h-[20px]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {produtos.length === 0 && (
          <div className="p-6 sm:p-8 text-center text-gray-500 text-sm">
            Nenhum produto cadastrado no momento.
          </div>
        )}
      </div>
    </div>
  )
}

export default ListaProdutos