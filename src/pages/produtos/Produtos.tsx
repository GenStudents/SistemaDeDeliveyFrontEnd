import { Link } from "react-router-dom"
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos"

function Produtos() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      {/* Header responsivo */}
      <div className="mt-4 sm:mt-8 mb-6 sm:mb-8 flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
            Produtos
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Gerencie os produtos do seu cardápio.
          </p>
        </div>

        {/* Botão adaptável */}
        <Link
          to="/cadastrarproduto"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-orange-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium shadow-sm hover:bg-orange-600 transition-colors"
        >
          + Novo Produto
        </Link>
      </div>

      {/* Wrapper para evitar quebra em tabelas/listas grandes */}
      <div className="w-full">
        <ListaProdutos />
      </div>
    </div>
  )
}

export default Produtos