import { Plus, Leaf, Info, Flame, Target, Droplets, Candy } from 'lucide-react';
import type Produto from '../../models/Produto';
import { useCarrinho } from '../../contestx/CarrinhoContext';

export function CardProduto({ produto }: { produto: Produto }) {
  // Hook do carrinho para adicionar produtos
  const { adicionarProduto } = useCarrinho(); 
  
  // Lógica de categoria e estilo visual
  const cat = produto.categoria?.descricao || 'Geral';
  const isSaudavel = cat === 'Saudável';

  return (
    /* h-[480px]: Mantém a proporção idêntica em todos os cards.
       flex-col: Permite usar mt-auto para empurrar o preço para o rodapé.
    */
    <div className="bg-white rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.05)] p-4 flex flex-col h-[480px] border border-[#E9ECEF] hover:shadow-md transition-all">
      
      {/* 1. Badge de Categoria */}
      <div className="flex h-6 mb-1">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1
          ${isSaudavel ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FFF3E0] text-[#EF6C00]'}`}>
          {isSaudavel ? <Leaf size={12} /> : <Info size={12} />}
          {cat}
        </span>
      </div>

      {/* 2. Área da Imagem (Dinâmica) */}
      <div className="aspect-video bg-[#F8F9FA] rounded-md overflow-hidden mb-3">
        {produto.foto ? (
          <img 
            src={produto.foto} 
            alt={produto.nome} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            🍴
          </div>
        )}
      </div>

      {/* 3. Título e Descrição (Travados em h-24 para alinhamento) */}
      <div className="h-24 overflow-hidden mb-2">
        <h3 className="text-[17px] font-bold text-black leading-tight line-clamp-1">
          {produto.nome}
        </h3>
        <p className="text-[13px] text-[#495057] line-clamp-3 leading-tight mt-1">
          {produto.descricao}
        </p>
      </div>

      {/* 4. Quadro Nutricional (Grid de 2 colunas) */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 p-3 bg-slate-50 rounded-lg border border-slate-100 h-20 content-center">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <Flame size={12} className="text-orange-500" />
          <span>{produto.calorias ?? 0} kcal</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <Target size={12} className="text-blue-500" />
          <span>Prot: {produto.proteina ?? 0}g</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <Droplets size={12} className="text-yellow-600" />
          <span>Gord: {produto.gordura ?? 0}g</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
          <Candy size={12} className="text-purple-500" />
          <span>Açúcar: {produto.acucar ?? 0}g</span>
        </div>
      </div>

      {/* 5. Preço e Ação (Sempre na base do card) */}
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-50">
        <span className="text-[18px] font-bold text-black">
          R$ {Number(produto.preco).toFixed(2).replace('.', ',')}
        </span>
        
        <button 
          onClick={() => adicionarProduto(produto)}
          className="bg-[#D35400] text-white p-2 rounded-[8px] hover:brightness-95 active:scale-95 transition-all shadow-sm"
          title="Adicionar ao carrinho"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}