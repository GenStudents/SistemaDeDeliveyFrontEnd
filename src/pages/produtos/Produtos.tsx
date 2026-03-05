import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Produto } from "../../models/Produto"
import { buscar, deletar } from "../../service/service"
import { AuthContext } from "../../contestx/AuthContext"

function Produtos() {

  const navigate = useNavigate()
  const { usuario } = useContext(AuthContext)
  const token = usuario.token

  const [produtos, setProdutos] = useState<Produto[]>([])

  const header = {
    headers: {
      Authorization: token
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/login")
    }
  }, [token, navigate])

  useEffect(() => {
    if (token !== "") {
      buscarProdutos()
    }
  }, [token])

  async function buscarProdutos() {
    await buscar("/produtos", setProdutos, header)
  }

  async function deletarProduto(id: number) {
    await deletar(`/produtos/${id}`, header)
    buscarProdutos()
  }

  return (
    <div>
      <h2>Lista de Produtos</h2>

      <button onClick={() => navigate("/cadastrarproduto")}>
        Cadastrar Produto
      </button>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.categoria?.descricao || "Nenhuma"}</td>
              <td>
                <button onClick={() => navigate(`/editarproduto/${produto.id}`)}>
                  Editar
                </button>
                <button onClick={() => deletarProduto(produto.id!)}>
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

export default Produtos