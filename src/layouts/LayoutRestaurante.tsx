import { Outlet } from "react-router-dom"
import SidebarRestaurante from "../components/sidebar/SidebarRestaurante"



export default function LayoutRestaurante() {
  return (
    /* O container pai usa 'flex' para colocar a Sidebar e o Main lado a lado. */
    <div className="flex min-h-screen bg-[#F8F9FA]">
      
      {/* A barra lateral fixa */}
      <SidebarRestaurante />

      {/* O 'main' é a área de conteúdo principal*/}
      <main className="flex-1 pt-24 px-4 pb-6 sm:px-6 lg:pt-8 lg:px-8 lg:pb-8 lg:pl-[292px]">
        
        {/* Onde as páginas específicas (ex: Cardápio, Pedidos, Configurações) 
            serão renderizadas dinamicamente pelo React Router. */}
        <Outlet />
        
      </main>
    </div>
  )
}