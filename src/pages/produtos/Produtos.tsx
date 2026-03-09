import { Link } from "react-router-dom"
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos"

function Produtos() {
  return (
    // Mantivemos o padding geral, mas você pode ajustar se quiser
    <div className="w-full min-h-screen bg-[#F8F9FA] p-4 sm:p-8">
      
      {/* ATUALIZAÇÃO AQUI: 
          mt-8 -> Desce o título e o botão afastando do topo
          mb-8 -> Afasta mais a linha da tabela abaixo dela 
      */}
      <div className="flex justify-between items-center mt-8 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>

        <Link
          to="/cadastrarproduto"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 font-medium transition-colors shadow-sm"
        >
          + Novo Produto
        </Link>
      </div>

      <ListaProdutos />
    </div>
  )
}

export default Produtos