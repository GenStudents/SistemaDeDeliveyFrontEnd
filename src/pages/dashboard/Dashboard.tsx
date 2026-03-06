import { useEffect, useState } from "react"
import { Package, FolderOpen, TrendingUp } from "lucide-react"
import type { Produto } from "../../models/Produto"
import type Categoria from "../../models/Categoria"
import { CardDashboard } from "../../components/dashboard/cardDashboard/CardDashboard"
import { ProdutosRecentes } from "../../components/dashboard/produtosRecentes/ProdutosRecentes"
import { buscar } from "../../service/service"


export default function Dashboard() {

  const [produtos, setProdutos] = useState<Produto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const header = {
    headers: {
      Authorization: "seu_token_aqui"
    }
  }

  useEffect(() => {

    async function carregarDados() {
        await buscar("/produtos", setProdutos, header)
      await buscar("/categorias", setCategorias, header)

      setLoading(false)
    }

    carregarDados()

  }, [])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <p className="text-gray-500 text-sm">
          Visão geral do seu cardápio digital
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <CardDashboard
          title="Total de Produtos"
          value={produtos.length}
          description="Produtos cadastrados"
          icon={Package}
        />

        <CardDashboard
          title="Total de Categorias"
          value={categorias.length}
          description="Categorias ativas"
          icon={FolderOpen}
        />

        <CardDashboard
          title="Produtos Recentes"
          value={produtos.slice(-5).length}
          description="Adicionados recentemente"
          icon={TrendingUp}
        />

      </div>

      <div className="bg-white rounded-xl border p-6">

        <h2 className="font-semibold mb-4">
          Produtos Recentes
        </h2>

        <ProdutosRecentes produtos={produtos} />

      </div>

    </div>
  )
}