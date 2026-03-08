import { useEffect, useState } from "react";
import { buscar } from "../service/service";
import { CardProduto } from "../components/cardproduto/CardProduto";
import NavbarCliente from "../components/navbar/NavbarCliente";
import { Sparkles, Trophy } from "lucide-react";
import type Produto from "../models/Produto";

export function calcularScoreSaude(produto: Produto): number {
  let score = 100;
  if (produto.calorias) score -= produto.calorias * 0.1;
  if (produto.gordura) score -= produto.gordura * 2;
  if (produto.acucar) score -= produto.acucar * 1.5;
  if (produto.proteina) score += produto.proteina * 1.2;
  return score;
}

export function Recomendações() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [recomendados, setRecomendados] = useState<Produto[]>([]);

  useEffect(() => {
    buscar('/produtos', setProdutos, {});
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      const todosComScore = produtos.map(p => ({
        ...p,
        score: calcularScoreSaude(p)
      }));

      // Top 3 para o destaque
      const top3 = [...todosComScore]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 3);
      
      setRecomendados(top3);
    }
  }, [produtos]);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <NavbarCliente />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-12">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2E7D32] px-4 py-2 rounded-full font-bold mb-4">
            <Sparkles size={20} />
            Seleção Inteligente FoodFlow
          </div>
          <h2 className="text-4xl font-bold text-slate-800">Escolhas mais Saudáveis</h2>
          <p className="text-slate-500 mt-2">Baseado no equilíbrio de calorias, proteínas e açúcares.</p>
        </header>

        {/* TOP 3 DESTAQUES - Com Grid Fixa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {recomendados.map((p, index) => (
            <div key={p.id} className="relative flex flex-col h-full">
              <div className="absolute -top-4 -left-4 z-10 bg-[#D35400] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white">
                {index === 0 ? <Trophy size={20} /> : index + 1}
              </div>
              <CardProduto produto={p} />
              <div className="mt-2 text-center text-[12px] font-bold text-[#2E7D32] uppercase tracking-wider">
                Score: {calcularScoreSaude(p).toFixed(0)} pts
              </div>
            </div>
          ))}
        </div>

        {/* DEMAIS PRODUTOS ORDENADOS POR SAÚDE */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-700 mb-8 border-b pb-4">
            Outras opções
          </h3>
          {/* Grid de 4 colunas para manter a proporção menor que o destaque */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {produtos
              .filter(p => !recomendados.find(r => r.id === p.id)) // Remove os Top 3
              .map(p => ({ ...p, score: calcularScoreSaude(p) })) // Adiciona score para ordenar
              .sort((a, b) => b.score - a.score) // ORDENAÇÃO: Mais saudável primeiro
              .map(p => (
                <div key={p.id} className="flex flex-col h-full">
                   <CardProduto produto={p} />
                   <div className="mt-2 text-center text-[10px] font-semibold text-slate-400 uppercase">
                     Score: {p.score.toFixed(0)} pts
                   </div>
                </div>
              ))
            }
          </div>
          
          {produtos.length <= 3 && (
            <p className="text-slate-400 italic text-center py-10">
              Explore nosso cardápio completo para mais opções!
            </p>
          )}
        </div>
      </main>
    </div>
  );
}