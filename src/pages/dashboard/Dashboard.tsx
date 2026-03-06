import { useEffect, useState } from "react"
import { Package, FolderOpen, ShoppingCart } from "lucide-react"
import { CardDashboard } from "../../components/dashboard/cardDashboard/CardDashboard"
import { ProdutosRecentes } from "../../components/dashboard/produtosRecentes/ProdutosRecentes"
import type { Produto } from "../../models/Produto"
import type Categoria from "../../models/Categoria"

export default function Dashboard() {

  const [produtos, setProdutos] = useState<Produto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [pedidos, setPedidos] = useState<number>(0)

  useEffect(() => {

    // depois você conecta na API

  }, [])

  return (

    // LAYOUT PRINCIPAL
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Visão geral do seu cardápio digital
        </p>

      </div>

      {/* GRID RESPONSIVO*/}
      <div className="
        grid
        gap-4
        sm:grid-cols-2
        lg:grid-cols-3
      ">

        {/* CARD DE PRODUTOS*/}
        <CardDashboard
          titulo="Total de Produtos"
          valor={produtos.length}
          descricao="Produtos cadastrados"
          icone={Package}
          rota="/produtos"
        />

        <CardDashboard
          titulo="Total de Categorias"
          valor={categorias.length}
          descricao="Categorias ativas"
          icone={FolderOpen}
          rota="/categorias"
        />

        <CardDashboard
        titulo="Pedidos Realizados"
        valor={pedidos}
        descricao="Pedidos registrados"
        icone={ShoppingCart}
        rota="/pedidos"
        />

      </div>

      <ProdutosRecentes produtos={produtos} />

    </div>
  )
}