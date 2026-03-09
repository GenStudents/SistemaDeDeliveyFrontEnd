import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"

import type Produto from "../../../models/Produto"
import type Categoria from "../../../models/Categoria"
import { AuthContext } from "../../../contestx/AuthContext"
import { buscar, cadastrar, atualizar } from "../../../service/service"

function FormProdutos() {
  const navigate = useNavigate()

  // Pegamos o ID da URL. Se existir, é edição. Se não, é cadastro.
  const { id } = useParams<{ id: string }>()

  const { usuario } = useContext(AuthContext)
  const token = usuario.token

  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    descricao: "",
    preco: "0.00", // ✅ evita string vazia em input number + backend
    foto: "",
    quantidade: 0,
    disponivel: true, // Padrão como true para novos cadastros
    calorias: 0,
    proteina: 0,
    gordura: 0,
    acucar: 0,
    carboidratos: 0,
    categoria: {
      id: 0,
      descricao: ""
    }
  })

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token }
      })
    } catch (error) {
      console.error("Erro ao buscar categorias", error)
    }
  }

  // Busca o produto específico se estivermos na tela de edição
  async function buscarProdutoPorId(idProduto: string) {
    try {
      await buscar(`/produtos/${idProduto}`, setProduto, {
        headers: { Authorization: token }
      })
    } catch (error) {
      console.error("Erro ao buscar produto", error)
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/")
      return
    }

    buscarCategorias()

    // Se tiver um ID na URL, busca os dados dele para preencher o formulário
    if (id !== undefined) {
      buscarProdutoPorId(id)
    }
  }, [token, id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement
    const { name, value, type, checked } = target

    setProduto((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? value === ""
              ? 0
              : Number(value)
            : value
    }))
  }

  function selecionarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const idCategoria = Number(e.target.value)
    const categoriaSelecionada = categorias.find((c) => c.id === idCategoria)

    if (categoriaSelecionada) {
      setProduto((prev) => ({
        ...prev,
        categoria: categoriaSelecionada
      }))
    } else {
      // ✅ volta para "nenhuma categoria"
      setProduto((prev) => ({
        ...prev,
        categoria: { id: 0, descricao: "" }
      }))
    }
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // ✅ validação de categoria (o required do select nem sempre impede se value=0)
    if (!produto.categoria?.id || produto.categoria.id === 0) {
      alert("Selecione uma categoria!")
      return
    }

    // ✅ normalização final antes de enviar (evita undefined/string vazia)
    const produtoParaEnviar: Produto = {
      ...produto,
      preco:
        typeof produto.preco === "string"
          ? (produto.preco.trim() === "" ? "0.00" : produto.preco)
          : (Number(produto.preco) || 0),
      quantidade: Number(produto.quantidade) || 0,
      calorias: Number(produto.calorias) || 0,
      proteina: Number(produto.proteina) || 0,
      gordura: Number(produto.gordura) || 0,
      acucar: Number(produto.acucar) || 0,
      carboidratos: Number(produto.carboidratos) || 0
    }

    // Lógica para Atualizar (se tiver ID) ou Cadastrar (se não tiver)
    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, produtoParaEnviar, setProduto, {
          headers: { Authorization: token }
        })
        // alert("Produto atualizado com sucesso!")
        navigate("/produtos")
      } catch (error) {
        console.error("Erro ao atualizar produto", error)
        alert("Erro ao atualizar o produto.")
      }
    } else {
      try {
        await cadastrar("/produtos", produtoParaEnviar, setProduto, {
          headers: { Authorization: token }
        })
        // alert("Produto cadastrado com sucesso!")
        navigate("/produtos")
      } catch (error) {
        console.error("Erro ao cadastrar produto", error)
        alert("Erro ao cadastrar o produto.")
      }
    }
  }

  return (
    <div className="flex justify-center min-h-screen bg-[#F8F9FA] p-8">
      <form
        className="flex flex-col gap-6 w-full max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200"
        onSubmit={gerarNovoProduto}
      >
        <div className="border-b pb-4 mb-2">
          {/* Título dinâmico */}
          <h2 className="text-2xl font-bold text-gray-800">
            {id !== undefined ? "Editar Produto" : "Cadastrar Novo Produto"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {id !== undefined
              ? "Atualize as informações do produto existente no cardápio."
              : "Preencha os detalhes do produto para adicioná-lo ao cardápio."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Nome do Produto</label>
            <input
              type="text"
              name="nome"
              placeholder="Ex: Hambúrguer Clássico"
              value={produto.nome}
              onChange={atualizarEstado}
              className="p-2 border rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Preço (R$)</label>
            <input
              type="number"
              name="preco"
              placeholder="0.00"
              step="0.01"
              value={typeof produto.preco === "number" ? produto.preco : Number(produto.preco) || 0}
              onChange={atualizarEstado}
              className="p-2 border rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Descrição</label>
          <textarea
            name="descricao"
            placeholder="Breve descrição do produto..."
            value={produto.descricao}
            onChange={atualizarEstado}
            rows={3}
            className="p-2 border rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="flex items-center gap-3 p-4 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            id="disponivel"
            name="disponivel"
            checked={produto.disponivel}
            onChange={atualizarEstado}
            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
          />
          <div className="flex flex-col">
            <label htmlFor="disponivel" className="text-sm font-semibold text-gray-700 cursor-pointer">
              Produto Disponível
            </label>
            <span className="text-xs text-gray-500">
              {produto.disponivel
                ? "O produto ficará visível no cardápio para os clientes."
                : "O produto ficará oculto do cardápio."}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Categoria</label>
            <select
              value={produto.categoria?.id ? produto.categoria.id : ""} // ✅ evita conflito 0 vs ""
              onChange={selecionarCategoria}
              className="p-2 border rounded-md outline-none focus:border-orange-500 bg-white"
              required
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.descricao}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">URL da Foto</label>
            <input
              type="text"
              name="foto"
              placeholder="https://..."
              value={produto.foto}
              onChange={atualizarEstado}
              className="p-2 border rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="mt-4 border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Informações Nutricionais</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-600 uppercase">Calorias (kcal)</label>
              <input
                type="number"
                name="calorias"
                value={produto.calorias}
                onChange={atualizarEstado}
                className="p-2 border rounded-md text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-600 uppercase">Proteína (g)</label>
              <input
                type="number"
                name="proteina"
                value={produto.proteina}
                onChange={atualizarEstado}
                className="p-2 border rounded-md text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-600 uppercase">Gordura (g)</label>
              <input
                type="number"
                name="gordura"
                value={produto.gordura}
                onChange={atualizarEstado}
                className="p-2 border rounded-md text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-600 uppercase">Açúcar (g)</label>
              <input
                type="number"
                name="acucar"
                value={produto.acucar}
                onChange={atualizarEstado}
                className="p-2 border rounded-md text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/produtos")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-medium transition-colors"
          >
            {/* Botão dinâmico */}
            {id !== undefined ? "Atualizar Produto" : "Salvar Produto"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormProdutos