import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UtensilsCrossed, LayoutDashboard, List, ClipboardList, LogOut, Menu, X, Package } from "lucide-react"
import { toast } from "react-toastify"

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ")

function SidebarRestaurante() {

  const location = useLocation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false) // controla abertura do menu mobile
  const isActive = (path: string) => location.pathname.startsWith(path) // verifica rota ativa

  // função de logout
  const handleLogout = () => {
    toast.success("Você foi desconectado!", {
      position: "top-right",
      autoClose: 2000
    })

    navigate("/")

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <>
      {/* HEADER MOBILE */}
      <header className="lg:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50">

        {/* LOGO */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-[#D35400] p-2 rounded-xl text-white">
            <UtensilsCrossed size={20} />
          </div>

          <span className="font-bold text-lg text-slate-900">
            FoodFlow
          </span>
        </Link>

        {/* BOTÃO MENU */}
        <button
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="p-2 rounded-lg hover:bg-orange-50"
        >
          {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>

      </header>


      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] bg-[#1A120B] text-white flex-col z-40">

        {/* LOGO */}
        <div className="p-6 border-b border-white/10">

          <Link to="/dashboard" className="flex items-center gap-3">

            <div className="bg-[#D35400] p-2 rounded-lg">
              <UtensilsCrossed size={20}/>
            </div>

            <span className="text-xl font-bold">
              FoodFlow
            </span>

          </Link>

        </div>


        {/* LINKS */}
        <nav className="flex-1 px-4 py-8 space-y-2">

          <p className="text-xs text-gray-400 uppercase tracking-widest px-4 mb-4">
            Menu
          </p>

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition",
              isActive("/dashboard")
                ? "bg-white/10 border-l-4 border-[#D35400]"
                : "text-gray-400 hover:bg-white/5"
            )}
          >
            <LayoutDashboard size={20}/>
            Dashboard
          </Link>

          {/* Produtos */}
          <Link
            to="/produtos"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition",
              isActive("/produtos")
                ? "bg-white/10 border-l-4 border-[#D35400]"
                : "text-gray-400 hover:bg-white/5"
            )}
          >
            <Package size={20}/>
            Produtos
          </Link>


          {/* Categorias */}
          <Link
            to="/categorias"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition",
              isActive("/categorias")
                ? "bg-white/10 border-l-4 border-[#D35400]"
                : "text-gray-400 hover:bg-white/5"
            )}
          >
            <List size={20}/>
            Categorias
          </Link>
          
          </nav>

          {/* LOGOUT */}
          <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 transition"
          >
            <LogOut size={20}/>
            <span className="font-medium">Sair</span>
          </button>

        </div>

      </aside>


      {/* MENU MOBILE */}
      {isMenuOpen && (

        <div className="lg:hidden fixed top-16 left-0 w-full bg-white border-b border-gray-200 z-40">

          <nav className="flex flex-col p-4 gap-2">

            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
            >
              <LayoutDashboard size={20}/>
              Dashboard
            </Link>

            <Link
              to="/pedidos"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
            >
              <ClipboardList size={20}/>
              Pedidos
            </Link>

            <Link
              to="/produtos"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
            >
              <Package size={20}/>
              Produtos
            </Link>

            <Link
              to="/categorias"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
            >
              <List size={20}/>
              Categorias
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl"
            >
              <LogOut size={20}/>
              Sair
            </button>

          </nav>

        </div>

      )}

    </>
  )
}

export default SidebarRestaurante