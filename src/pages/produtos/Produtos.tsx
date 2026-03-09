import { Link } from "react-router-dom"
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos"

function Produtos() {
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
        <Link
          to="/cadastrarproduto"
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
        </Link>
      </div>

      {/* Wrapper para evitar quebra em tabelas/listas grandes */}
        <ListaProdutos />
      </div>
  )
}

export default Produtos