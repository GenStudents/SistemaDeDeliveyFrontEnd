import { createContext, useContext, useState, type ReactNode } from 'react';
import type Produto from '../models/Produto';

interface CarrinhoContextType {
  itens: Produto[];
  adicionarProduto: (produto: Produto) => void;
  removerProduto: (id: number) => void;
  limparCarrinho: () => void;
  valorTotal: number;
  finalizarPedidoWhatsApp: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<Produto[]>([]);

  // Lógica atualizada para agrupar produtos repetidos
  const adicionarProduto = (produto: Produto) => {
    setItens((prev) => {
      // Verifica se o produto já existe no carrinho pelo ID
      const itemExistente = prev.find((item) => item.id === produto.id);

      if (itemExistente) {
        // Se existir, mapeia o array e aumenta a quantidade apenas daquele item
        return prev.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: (item.quantidade || 1) + 1 }
            : item
        );
      }

      // Se for novo, adiciona ao array com quantidade inicial de 1
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  // Remove o item completamente do carrinho
  const removerProduto = (id: number) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => setItens([]);

  // Cálculo do total considerando o preço unitário * quantidade
  const valorTotal = itens.reduce((acc, item) => {
    const preco = Number(item.preco);
    const qtd = item.quantidade || 1;
    return acc + (preco * qtd);
  }, 0);

  const finalizarPedidoWhatsApp = () => {
    if (itens.length === 0) return;

    const telefone = "5511999999999"; 
    
    // Atualizado para mostrar a quantidade na mensagem do WhatsApp também
    const listaItens = itens.map(item => {
      const qtd = item.quantidade || 1;
      return `• *${item.nome}* x${qtd} (R$ ${(Number(item.preco) * qtd).toFixed(2)})`;
    }).join('\n');
    
    const mensagem = encodeURIComponent(
      `*Novo Pedido - FoodFlow*\n\n` +
      `Olá! Gostaria de pedir:\n\n${listaItens}\n\n` +
      `*Total: R$ ${valorTotal.toFixed(2)}*\n\n` +
      `Pode confirmar o pedido?`
    );

    window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
  };

  return (
    <CarrinhoContext.Provider value={{ 
      itens, 
      adicionarProduto, 
      removerProduto, 
      limparCarrinho,
      valorTotal, 
      finalizarPedidoWhatsApp 
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  return context;
};