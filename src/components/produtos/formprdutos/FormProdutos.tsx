import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"

import type Categoria from "../../../models/Categoria"
import type Produto from "../../../models/Produto"

import { cadastrar, atualizar, buscar } from "../../../service/service"
import { AuthContext } from "../../../contestx/AuthContext"

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

  const header = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  useEffect(() => {

    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/")
      return
    }

    // buscar categorias
    buscar("/categorias", setCategorias, header)

    // se for edição buscar produto
    if (id !== undefined) {
      buscar(`/produtos/${id}`, setProduto, header)
    }

  }, [id, token])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

    const { name, value, type, checked } = e.target

    setProduto({
      ...produto,
      [name]:
        type === "checkbox"
          ? checked
          : name === "preco"
          ? Number(value)
          : value
    })

  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {

    e.preventDefault()

    // valida categoria
    if (!produto.categoria) {
      alert("Selecione uma categoria")
      return
    }

    try {

      if (id !== undefined) {

        await atualizar(`/produtos/${id}`, produto, setProduto, header)
        alert("Produto atualizado com sucesso!")

      } else {

        await cadastrar("/produtos", produto, setProduto, header)
        alert("Produto cadastrado com sucesso!")

      }

      navigate("/produtos")

    } catch (error) {

      console.log(error)
      alert("Erro ao salvar produto")

    }

  }

  return (

    <div className="container flex flex-col items-center mx-auto">

      <h2 className="text-2xl font-bold mb-4">
        {id ? "Editar Produto" : "Cadastrar Produto"}
      </h2>

      <form
        onSubmit={gerarNovoProduto}
        className="flex flex-col w-1/2 gap-4"
      >

        {/* NOME */}
        <input
          type="text"
          name="nome"
          placeholder="Nome do Produto"
          value={produto.nome}
          onChange={atualizarEstado}
          className="border p-2 rounded"
          required
        />

        {/* DESCRIÇÃO */}
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={produto.descricao}
          onChange={atualizarEstado}
          className="border p-2 rounded"
          required
        />

        {/* PREÇO */}
        <input
          type="number"
          name="preco"
          placeholder="Preço"
          value={produto.preco}
          onChange={atualizarEstado}
          className="border p-2 rounded"
          required
        />

        {/* CATEGORIA */}
        <select
          name="categoria"
          value={produto.categoria?.id || ""}
          onChange={(e) =>
            setProduto({
              ...produto,
              categoria: { id: Number(e.target.value) } as Categoria
            })
          }
          className="border p-2 rounded"
          required
        >

          <option value="">Selecione uma categoria</option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.descricao}
            </option>
          ))}

        </select>

        {/* DISPONÍVEL */}
        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            name="disponivel"
            checked={produto.disponivel}
            onChange={atualizarEstado}
          />

          Produto disponível

        </label>

        {/* BOTÃO */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>

      </form>

    </div>

  )
}

export default FormProduto