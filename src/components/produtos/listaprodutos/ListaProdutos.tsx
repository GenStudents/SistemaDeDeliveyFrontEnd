import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contestx/AuthContext"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../service/service"

function ListaProdutos() {

  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)
  const token = usuario.token

  const [produtos, setProdutos] = useState<Produto[]>([])

  const header = {
    headers: {
      Authorization: token
    }
  }

  async function buscarProdutos() {
    await buscar("/produtos", setProdutos, header)
  }

  useEffect(() => {
    buscarProdutos()
  }, [])

  async function deletarProduto(id: number) {
    await deletar(`/produtos/${id}`, header)
    buscarProdutos()
  }

  return (
    <div>
      <h2>Lista de Produtos</h2>

      <button onClick={() => navigate("/cadastrarproduto")}>
        Novo Produto
      </button>

      {produtos.map(produto => (
        <div key={produto.id}>
          <p>{produto.nome}</p>
          <p>R$ {produto.preco.toFixed(2)}</p>

          <button onClick={() => navigate(`/editarproduto/${produto.id}`)}>
            Editar
          </button>

          <button onClick={() => deletarProduto(produto.id!)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  )
}

export default ListaProdutos