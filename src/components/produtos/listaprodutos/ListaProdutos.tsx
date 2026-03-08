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
        alert("Produto deletado com sucesso!")
        buscarProdutos() // Recarrega a lista após deletar
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

  // Função para formatar o preço para R$
  function formatarPreco(valor: number | string) {
    const numero = typeof valor === "string" ? parseFloat(valor) : valor
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numero || 0)
  }

  // Função que define se é Saudável, Moderado ou Pouco Saudável
  function renderBadgeSaude(produto: Produto) {
    // Se não tiver nenhuma informação nutricional, não mostra nada
    if (!produto.calorias && !produto.gordura && !produto.acucar) {
      return <span className="text-gray-400 text-xs">-</span>
    }

    // Lógica simplificada de pontuação para o semáforo
    let score = 0
    if (produto.calorias && produto.calorias > 400) score += 2
    else if (produto.calorias && produto.calorias > 250) score += 1

    if (produto.gordura && produto.gordura > 15) score += 2
    else if (produto.gordura && produto.gordura > 8) score += 1

    if (score >= 3) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200">
          <Heart size={12} /> Pouco saudável
        </span>
      )
    } else if (score >= 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-600 border border-yellow-200">
          <Heart size={12} /> Moderado
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 border border-green-200">
          <Heart size={12} /> Saudável
        </span>
      )
    }
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          Lista de Produtos
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-500">Nome</th>
              <th className="p-4 text-sm font-semibold text-gray-500">Categoria</th>
              <th className="p-4 text-sm font-semibold text-gray-500">Preço</th>
              <th className="p-4 text-sm font-semibold text-gray-500">Saúde</th>
              <th className="p-4 text-sm font-semibold text-gray-500 text-right w-24">Ações</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {produtos.map((produto) => (
              <tr key={produto.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm font-medium text-gray-800">
                  {produto.nome}
                </td>
                
                <td className="p-4 text-sm text-gray-500">
                  {produto.categoria?.descricao || <span className="text-gray-300">-</span>}
                </td>

                <td className="p-4 text-sm text-gray-600 font-mono">
                  {formatarPreco(produto.preco)}
                </td>

                <td className="p-4">
                  {renderBadgeSaude(produto)}
                </td>

                <td className="p-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => navigate(`/editarproduto/${produto.id}`)}
                    className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deletarProduto(produto.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Deletar"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {produtos.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            Nenhum produto cadastrado no momento.
          </div>
        )}
      </div>
    </div>
  )
}

export default ListaProdutos