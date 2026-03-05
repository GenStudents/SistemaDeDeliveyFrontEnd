import { UtensilsCrossed } from "lucide-react";

export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-10 text-center">
        <div className="flex items-center gap-2 text-slate-500">
          <UtensilsCrossed size={18} />
          <span className="text-sm font-semibold text-slate-800">FoodFlow</span>
        </div>
        <p className="text-xs text-slate-500">
          Plataforma de delivery de comida saudavel
        </p>
        <p className="text-xs text-slate-400">
          FoodFlow © {anoAtual}
        </p>
      </div>
    </footer>
  );
}

