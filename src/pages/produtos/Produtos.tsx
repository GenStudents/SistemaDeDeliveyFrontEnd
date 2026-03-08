import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Link } from "react-router-dom"
import ListaProdutos from "../../components/produtos/listaprodutos/ListaProdutos"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{padding:20}}>Teste: React está rendendo</div>
  </StrictMode>,
)

function Produtos() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>

        <Link
          to="/cadastrarproduto"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Cadastrar Produto
        </Link>
      </div>

      <ListaProdutos />

    </div>
  )
}

export default Produtos