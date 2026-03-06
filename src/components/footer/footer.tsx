import { useLocation } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";

export function Footer() {
  
  const location = useLocation();
  const anoAtual = new Date().getFullYear();

  // Lista de caminhos que pertencem ao painel do restaurante
  const rotasRestaurante = [
    '/produtos', 
    '/categorias', 
    '/cadastrarcategorias', 
    '/cadastrarproduto',
    '/editarproduto',
    '/editarcategorias',
    '/pedidos',  
    '/dashboard'   
  ];

  // Verifica se a URL atual condiz com o restaurante
  const eRestaurante = rotasRestaurante.some(rota => location.pathname.startsWith(rota));

  // Se for restaurante, não renderiza nada
  if (eRestaurante) {
    return null; 
  }

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center lg:px-6">
        
        {/* Ícone + Nome do sistema */}
        <div className="flex items-center gap-2 text-slate-500">
          <UtensilsCrossed className="size-4" />
          <span className="text-sm font-semibold text-slate-800">FoodFlow</span>
        </div>

        {/* Slogan/Descrição */}
        <p className="text-xs text-slate-500">
          Plataforma de delivery de comida saudável
        </p>
        <p className="text-xs text-slate-400">
          FoodFlow © {anoAtual}
        </p>
      </div>
    </footer>
  );
}
