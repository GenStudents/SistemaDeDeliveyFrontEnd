import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Pencil, Trash2, Heart, Package } from "lucide-react"
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
        // ATULIZAÇÃO REALIZADA AQUI: card principal padronizado
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* ATULIZAÇÃO REALIZADA AQUI: cabeçalho igual ao padrão das outras listas */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Package size={18} />
          Lista de Produtos
        </h2>
      </div>

      {/* ATULIZAÇÃO REALIZADA AQUI: scroll interno */}
      <div className="max-h-[420px] sm:max-h-[520px] overflow-y-auto">
        {produtos.length === 0 && (
          <div className="p-6 sm:p-8 text-center text-gray-500 text-sm">
            Nenhum produto cadastrado no momento.
          </div>
        )}

        {/* ATULIZAÇÃO REALIZADA AQUI: versão mobile em cards */}
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

                {/* ATULIZAÇÃO REALIZADA AQUI: preço */}
                <span className="text-sm font-medium text-slate-900 whitespace-nowrap">
                  {formatarPreco(produto.preco)}
                </span>
              </div>

              <div className="mt-3">
                {renderBadgeSaude(produto)}
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  onClick={() => navigate(`/editarproduto/${produto.id}`)}
                  className="rounded-lg p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                  title="Editar"
                  aria-label={`Editar ${produto.nome}`}
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => deletarProduto(produto.id)}
                  className="rounded-lg p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Deletar"
                  aria-label={`Deletar ${produto.nome}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ATULIZAÇÃO REALIZADA AQUI: tabela só no desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            {/* ATULIZAÇÃO REALIZADA AQUI: cabeçalho fixo dentro do scroll */}
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
                  {/* ATULIZAÇÃO REALIZADA AQUI: nome padronizado */}
                  <td className="px-6 py-5 text-sm font-medium text-gray-600">
                    {produto.nome}
                  </td>

                  {/* ATULIZAÇÃO REALIZADA AQUI: categoria mais leve */}
                  <td className="px-6 py-5 text-sm font-medium text-gray-600">
                    {produto.categoria?.descricao || <span className="text-gray-300">-</span>}
                  </td>

                  {/* ATULIZAÇÃO REALIZADA AQUI: preço sem font-mono */}
                  <td className="px-6 py-5 text-sm font-medium text-slate-900 whitespace-nowrap">
                    {formatarPreco(produto.preco)}
                  </td>

                  <td className="px-6 py-5 whitespace-nowrap">
                    {renderBadgeSaude(produto)}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => navigate(`/editarproduto/${produto.id}`)}
                        className="text-gray-400 hover:text-orange-500 transition-colors"
                        title="Editar"
                        aria-label={`Editar ${produto.nome}`}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deletarProduto(produto.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Deletar"
                        aria-label={`Deletar ${produto.nome}`}
                      >
                        <Trash2 size={18} />
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
  </div>
  )
}

export default ListaProdutos