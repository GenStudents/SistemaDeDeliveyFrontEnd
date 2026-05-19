import { Link } from "react-router-dom"
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos"
import type Produto from "../../models/Produto"
import { useState } from "react"
import FormProdutos from "../../components/produtos/formprdutos/FormProdutos"

function Produtos() {

  const [modalProdutoAberto, setModalProdutoAberto] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [recarregarLista, setRecarregarLista] = useState(0)

  function abrirNovoProduto() {
    setProdutoSelecionado(null)
    setModalProdutoAberto(true)
  }

  function abrirEditarProduto(produto: Produto) {
    setProdutoSelecionado(produto)
    setModalProdutoAberto(true)
  }

  function fecharModalProduto() {
    setModalProdutoAberto(false)
    setProdutoSelecionado(null)
    setRecarregarLista((prev) => prev + 1)
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header responsivo */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Produtos
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie os produtos do seu cardápio.
          </p>
        </div>

        {/* Botão adaptável */}
        <button
          type="button"
          onClick={abrirNovoProduto}
          className="
            self-start
            sm:w-auto
            bg-[#D35400] hover:bg-[#b54800]
            text-white font-semibold text-sm
            px-4 py-2 rounded-lg
            inline-flex items-center justify-center gap-2
            transition-colors
          "
        >
          + Novo Produto
        </button>
      </div>

      {/* Wrapper para evitar quebra em tabelas/listas grandes */}
        <ListaProdutos
        onEditarProduto={abrirEditarProduto}
        refreshKey={recarregarLista}
      />

      {modalProdutoAberto && (
        <FormProdutos
          produtoInicial={produtoSelecionado}
          fecharModal={fecharModalProduto}
        />
      )}
    </div>
  )
}
export default Produtos
        
      