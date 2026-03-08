import { useCarrinho } from '../contestx/CarrinhoContext';
import { Trash2, MessageCircle } from 'lucide-react';
import NavbarCliente from '../components/navbar/NavbarCliente';

export function PaginaCarrinho() {
  const { itens, removerProduto, valorTotal, finalizarPedidoWhatsApp } = useCarrinho();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <NavbarCliente />
      
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-12">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">Seu Carrinho</h2>

        {itens.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[12px] shadow-sm border border-slate-100">
            <p className="text-slate-400">Seu carrinho está vazio. Que tal escolher algo gostoso?</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Lista de Itens Selecionados */}
            <div className="bg-white rounded-[12px] shadow-sm overflow-hidden border border-slate-100">
              {itens.map((item, index) => {
                const quantidade = item.quantidade || 1;
                const subtotalItem = Number(item.preco) * quantidade;

                return (
                  <div 
                    key={`${item.id}-${index}`} 
                    className="flex justify-between items-center p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* Badge de Quantidade */}
                      <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-sm border border-slate-200">
                        {quantidade}x
                      </span>
                      
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{item.nome}</h4>
                        <p className="text-sm text-slate-500">
                          Unitário: R$ {Number(item.preco).toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Valor Multiplicado */}
                      <span className="font-bold text-[#D35400] text-lg">
                        R$ {subtotalItem.toFixed(2).replace('.', ',')}
                      </span>

                      <button 
                        onClick={() => removerProduto(item.id!)} 
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all"
                        title="Remover item"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resumo Financeiro */}
            <div className="bg-white p-6 rounded-[12px] shadow-md flex flex-col gap-4 border border-slate-100">
              <div className="flex justify-between items-center text-2xl font-bold border-b pb-4 border-slate-100">
                <span className="text-slate-600">Total do Pedido:</span>
                <span className="text-[#D35400]">
                  R$ {valorTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <button 
                onClick={finalizarPedidoWhatsApp}
                className="w-full bg-[#25D366] text-white py-4 rounded-[8px] font-bold flex items-center justify-center gap-3 hover:bg-[#20bd5a] active:scale-95 transition-all text-xl shadow-lg"
              >
                <MessageCircle size={26} />
                Enviar pedido via WhatsApp
              </button>
              
              <p className="text-center text-xs text-slate-400 italic">
                Ao clicar, você enviará uma mensagem com as quantidades detalhadas para o restaurante.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}