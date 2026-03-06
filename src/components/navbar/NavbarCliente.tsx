import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { UtensilsCrossed, Leaf, ShoppingBag, Menu, X } from "lucide-react"

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ")

function NavbarCliente() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Controla se o menu mobile está aberto
  const [isScrolled, setIsScrolled] = useState(false) // Detecta se o usuário rolou a página
  const isActive = (path: string) => location.pathname.startsWith(path) // verifica se a rota atual está ativa

// fecha o menu ao trocar de página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // efeito que detecta scroll da página
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll) // Limpeza ao desmontar
  }, [])

  return (
    <>
      {/* NAVEGAÇÃO PRINCIPAL */}
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-white py-4" // Estilo quando rolado (transparente com desfoque)
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* LOGO DO SITE */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-[#D35400] p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              Food<span className="text-[#D35400]">Flow</span>
            </span>
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            
            {/* link cardápio */}
            <Link
              to="/cardapio"
              className="font-medium transition-colors text-[#D35400] text-slate-600 hover:text-[#D35400]"
            >
              Cardápio
            </Link>

            {/* link saudáveis */}
            <Link
              to="/recomendacoes"
              className="flex items-center gap-2 text-[#2E7D32] bg-[#E8F5E9] px-4 py-1.5 rounded-full font-bold hover:brightness-95 transition"
            >
              <Leaf size={16} />
              Recomendações
            </Link>

            {/* Divisor vertical */}
            <div className="flex items-center gap-6 border-l border-slate-200 pl-8">

              {/* Carrinho */}
              <Link
                to="/carrinho"
                className="relative text-slate-400 hover:text-[#D35400] transition"
              >
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 size-5 bg-[#D35400] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  2
                </span>
              </Link>

              {/* botão restaurante */}
              <Link
                to="/login"
                className="bg-[#D35400] text-white px-6 py-2 rounded-full font-semibold hover:brightness-95 transition"
              >
                Área do restaurante
              </Link>
            </div>
          </div>

          {/*  MOBILE */}
           <button
            className="md:hidden p-3 rounded-xl hover:bg-orange-50"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >

            {/* troca ícone menu por X */}
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}

          </button>

        </div>

        {/* MENU MOBILE ABAIXO DA NAVBAR */}
        {isMenuOpen && (

          <div className="md:hidden border-t border-slate-200 bg-white">

            <div className="flex flex-col gap-4 px-6 py-6">

              {/* cardápio */}
              <Link
                to="/cardapio"
                className="flex items-center justify-center text-slate-600 font-medium hover:text-[#D35400]"
              >
                Cardápio
              </Link>

              {/* recomendações */}
              <Link
                to="/recomendacoes"
                className=" flex items-center justify-center flex items-center gap-2 text-[#2E7D32] font-semibold"
              >
                <Leaf size={18} />
                Recomendações
              </Link>

              {/* restaurante */}
              <Link
                to="/login"
                className="bg-[#D35400] text-white text-center py-3 rounded-xl font-semibold mt-2"
              >
                Área do restaurante
              </Link>

            </div>

          </div>

        )}

      </nav>
    </>
  )
}

export default NavbarCliente