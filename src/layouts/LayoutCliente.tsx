import { Outlet } from "react-router-dom"
import NavbarCliente from "../components/navbar/NavbarCliente"
import { Footer } from "../components/footer/footer"

export default function LayoutCliente() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* O cabeçalho fixo que aparecerá em todas as páginas do cliente */}
      <NavbarCliente />

      {/* O 'main' define a área de conteúdo principal. */}
      <main className="flex-1 pt-20">
        
        {/* vai injetar o componente da página específica que o usuário está acessando (ex: Home, Perfil, Pedidos). */}
        <Outlet />
        
      </main>
      <Footer />
      </div>
  )
}