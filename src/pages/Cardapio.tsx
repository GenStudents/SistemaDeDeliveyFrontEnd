import { useEffect, useState } from "react";
import { buscar } from "../service/service";
import { CardProduto } from "../components/cardproduto/CardProduto";
import NavbarCliente from "../components/navbar/NavbarCliente";
import type Produto from "../models/Produto";

export function Cardapio() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    // Busca os produtos da sua API no Render
    buscar('/produtos', setProdutos, {});
  }, []);

  // --- LÓGICA DE AGRUPAMENTO ---
  // Reduzimos o array de produtos em um objeto organizado por categoria
  const produtosPorCategoria = produtos.reduce((acc, produto) => {
    const nomeCategoria = produto.categoria?.descricao || "Outros";
    if (!acc[nomeCategoria]) {
      acc[nomeCategoria] = [];
    }
    acc[nomeCategoria].push(produto);
    return acc;
  }, {} as Record<string, Produto[]>);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <NavbarCliente />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-10">Nosso Cardápio</h2>

        {/* Renderizamos cada categoria separadamente */}
        {Object.entries(produtosPorCategoria).map(([categoria, lista]) => (
          <section key={categoria} className="mb-12">
            {/* Título da Categoria com barra laranja lateral (Guia de Estilo) */}
            <div className="flex items-center gap-3 mb-6 border-l-4 border-[#D35400] pl-4">
              <h3 className="text-2xl font-bold text-slate-700 capitalize">
                {categoria}
              </h3>
              <span className="text-sm text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded">
                {lista.length} {lista.length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            {/* Grid de produtos desta categoria específica */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {lista.map((p) => (
                <CardProduto key={p.id} produto={p} />
              ))}
            </div>
          </section>
        ))}

        {produtos.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            Carregando pratos deliciosos...
          </div>
        )}
      </main>
    </div>
  );
}