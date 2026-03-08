import { Link } from "react-router-dom"
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos"

function Produtos() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <Link
          to="/cadastrarproduto"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          + Novo Produto
        </Link>
      </div>

      <ListaProdutos />
    </div>
  )
}

export default Produtos