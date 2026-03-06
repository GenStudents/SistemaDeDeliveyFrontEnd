import { useState, useEffect, useContext, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contestx/AuthContext"
import { cadastrar, atualizar, buscar } from "../../service/service"
import type { Produto } from "../../models/Produto"
import type Categoria from "../../models/Categoria"
import { toast } from "react-toastify"

function FormProduto() {

  const navigate = useNavigate()
  const { id } = useParams()

  const { usuario } = useContext(AuthContext)
  const token = usuario?.token || ""

  const [produto, setProduto] = useState<Produto>({
    nome: "",
    descricao: "",
    preco: 0,
    disponivel: true,
    categoria: null
  })

  const [categorias, setCategorias] = useState<Categoria[]>([])

  // Buscar categorias para o select
  useEffect(() => {
    if (!token) return
    const header = { headers: { Authorization: token } }
    buscar("/categorias", setCategorias, header)
  }, [token])

  // Buscar produto caso seja edição
  useEffect(() => {
    if (!id || !token) return
    const header = { headers: { Authorization: token } }
    buscar(`/produtos/${id}`, setProduto, header)
  }, [id, token])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setProduto({
      ...produto,
      [name]: type === "checkbox" ? checked : name === "preco" ? Number(value) : value
    })
  }

  async function enviarProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if (!token) {
        toast.error("Você precisa estar logado para cadastrar ou editar produtos")
        return
      }

      if (!produto.nome.trim()) {
        toast.error("Nome do produto é obrigatório")
        return
      }

      if (produto.preco <= 0) {
        toast.error("Preço deve ser maior que zero")
        return
      }

      if (!produto.categoria?.id) {
        toast.error("Selecione uma categoria")
        return
      }

      const header = { headers: { Authorization: token } }

      if (id) {
        await atualizar(`/produtos/${id}`, produto, setProduto, header)
      } else {
        await cadastrar("/produtos", produto, setProduto, header)
      }

      navigate("/produtos")
    } catch (erro) {
      toast.error("Erro ao salvar produto")
      console.error(erro)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Editar Produto" : "Cadastrar Produto"}</h2>

      <form onSubmit={enviarProduto} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>

        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={produto.nome}
          onChange={atualizarEstado}
          required
        />

        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={produto.descricao}
          onChange={atualizarEstado}
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={produto.preco}
          onChange={atualizarEstado}
          step="0.01"
          required
        />

        <select
          name="categoria"
          value={produto.categoria?.id || ""}
          onChange={e => {
            const categoriaSelecionada = categorias.find(c => c.id === Number(e.target.value)) || null
            setProduto({ ...produto, categoria: categoriaSelecionada })
          }}
        >
          <option value="">Selecione a categoria</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.descricao}</option>
          ))}
        </select>

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            name="disponivel"
            checked={produto.disponivel}
            onChange={atualizarEstado}
          />
          Disponível
        </label>

        <button
          type="submit"
          style={{ padding: "8px 12px", backgroundColor: "#28a745", color: "white", borderRadius: "4px" }}
        >
          Salvar
        </button>

      </form>
    </div>
  )
}

export default FormProduto