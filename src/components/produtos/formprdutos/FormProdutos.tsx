import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { X } from "lucide-react"
import type Produto from "../../../models/Produto"
import type Categoria from "../../../models/Categoria"
import { AuthContext } from "../../../contestx/AuthContext"
import { buscar, cadastrar, atualizar } from "../../../service/service"

interface FormProdutosProps {
  produtoInicial?: Produto | null
  fecharModal: () => void
}

function FormProdutos({ produtoInicial, fecharModal }: FormProdutosProps) {
  const { usuario } = useContext(AuthContext)
  const token = usuario.token

  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    descricao: "",
    preco: "0.00",
    foto: "",
    quantidade: 0,
    disponivel: true,
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

  useEffect(() => {
    if (produtoInicial) {
      setProduto({
        ...produtoInicial,
        preco: produtoInicial.preco ?? "0.00",
        categoria: produtoInicial.categoria ?? { id: 0, descricao: "" }
      })
    }
  }, [produtoInicial])

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token }
      })
    } catch (error) {
      console.error("Erro ao buscar categorias", error)
    }
  }

  useEffect(() => {
    if (!token) return
    buscarCategorias()
  }, [token])

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
      setProduto((prev) => ({
        ...prev,
        categoria: { id: 0, descricao: "" }
      }))
    }
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!produto.categoria?.id || produto.categoria.id === 0) {
      alert("Selecione uma categoria!")
      return
    }

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

    try {
      if (produtoInicial?.id) {
        await atualizar("/produtos", produtoParaEnviar, setProduto, {
          headers: { Authorization: token }
        })
      } else {
        await cadastrar("/produtos", produtoParaEnviar, setProduto, {
          headers: { Authorization: token }
        })
      }

      fecharModal()
    } catch (error) {
      console.error("Erro ao salvar produto", error)
      alert("Erro ao salvar o produto.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {produtoInicial?.id ? "Editar Produto" : "Cadastrar Novo Produto"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {produtoInicial?.id
                ? "Atualize as informações do produto existente no cardápio."
                : "Preencha os detalhes do produto para adicioná-lo ao cardápio."}
            </p>
          </div>

          <button
            type="button"
            onClick={fecharModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Fechar"
          >
            <X size={22} />
          </button>
        </div>

        <form
          className="flex flex-col gap-6 p-6"
          onSubmit={gerarNovoProduto}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Nome do Produto</label>
              <input
                type="text"
                name="nome"
                placeholder="Ex: Hambúrguer Clássico"
                value={produto.nome}
                onChange={atualizarEstado}
                className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
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
                className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
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
              rows={4}
              className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
            />
          </div>

          <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
            <input
              type="checkbox"
              id="disponivel"
              name="disponivel"
              checked={produto.disponivel}
              onChange={atualizarEstado}
              className="w-5 h-5 mt-1 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
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
                value={produto.categoria?.id ? produto.categoria.id : ""}
                onChange={selecionarCategoria}
                className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 bg-white"
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
                className="px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informações Nutricionais
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-600 uppercase">Calorias (kcal)</label>
                <input
                  type="number"
                  name="calorias"
                  value={produto.calorias}
                  onChange={atualizarEstado}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-600 uppercase">Proteína (g)</label>
                <input
                  type="number"
                  name="proteina"
                  value={produto.proteina}
                  onChange={atualizarEstado}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-600 uppercase">Gordura (g)</label>
                <input
                  type="number"
                  name="gordura"
                  value={produto.gordura}
                  onChange={atualizarEstado}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-gray-600 uppercase">Açúcar (g)</label>
                <input
                  type="number"
                  name="acucar"
                  value={produto.acucar}
                  onChange={atualizarEstado}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={fecharModal}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#D35400] text-white rounded-lg hover:bg-[#b54800] font-semibold transition-colors"
            >
              {produtoInicial?.id ? "Atualizar Produto" : "Salvar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormProdutos