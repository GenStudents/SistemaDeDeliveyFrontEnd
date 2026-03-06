import { Outlet } from "react-router-dom"
import SidebarRestaurante from "../sidebar/SidebarRestaurante"



export default function LayoutRestaurante() {
  return (
    /* O container pai usa 'flex' para colocar a Sidebar e o Main lado a lado. */
    <div className="flex min-h-screen w-full bg-slate-50">
      
      {/* A barra lateral fixa. Ela geralmente contém os links de navegação do painel. */}
      <SidebarRestaurante />

      {/* O 'main' é a área de conteúdo principal*/}
      <main className="flex-1 lg:pl-[260px] p-6 lg:p-8">
        
        {/* Onde as páginas específicas (ex: Cardápio, Pedidos, Configurações) 
            serão renderizadas dinamicamente pelo React Router. */}
        <Outlet />
        
      </main>
    </div>
  )
}