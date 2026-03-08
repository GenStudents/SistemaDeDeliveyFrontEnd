import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Produto } from "../../../models/Produto"
import { buscar } from "../../../service/service"
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
      console.log(error)
    }
  }

  useEffect(() => {

    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/")
    }

    buscarProdutos()

  }, [token])

  return (
    <div className="w-full p-4">

      <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Nome</th>
            <th className="p-2">Descrição</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Disponível</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>

        <tbody>

          {produtos.map((produto) => (

            <tr key={produto.id} className="border">

              <td className="p-2">{produto.nome}</td>

              <td className="p-2">{produto.descricao}</td>

              <td className="p-2">R$ {produto.preco}</td>

              <td className="p-2">
                {produto.disponivel ? "Sim" : "Não"}
              </td>

              <td className="p-2">
                {produto.categoria?.descricao}
              </td>

              <td className="p-2 flex gap-2">

                <button
                  onClick={() => navigate(`/editarproduto/${produto.id}`)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Deletar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default ListaProdutos