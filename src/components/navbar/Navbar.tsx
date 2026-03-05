import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Leaf, ShoppingBag, Menu, X, LayoutDashboard, Pizza, List, ClipboardList, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  // Mude para 'true' para ver o Restaurante, 'false' para ver o Cliente --- renover a pois fazer o Login
  const usuarioLogado = true; 

  const isActive = (path: string) => location.pathname === path;
  
  // Fecha o menu mobile quando muda de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

    useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Alerta de desconectado
  const handleLogout = () => {
    toast.success("Você foi desconectado!", {position: "top-right", autoClose: 2000,});
    navigate('/');
    setTimeout(() => { window.location.reload();}, 1000);
  };

  // Componente de Links Compartilhado para evitar repetição
  const NavLinks = () => (
    <>
      <Link to="/dashboard" className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition-all", isActive('/dashboard') ? 'bg-orange-50 text-[#D35400] md:bg-white/10 md:border-l-4 md:border-[#D35400]' : 'text-gray-400 hover:bg-gray-50 md:hover:bg-white/5 md:hover:text-white')}>
        <LayoutDashboard size={20} /> <span className="font-medium">Dashboard</span>
      </Link>
      <Link to="/pedidos" className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition-all", isActive('/pedidos') ? 'bg-orange-50 text-[#D35400] md:bg-white/10 md:border-l-4 md:border-[#D35400]' : 'text-gray-400 hover:bg-gray-50 md:hover:bg-white/5 md:hover:text-white')}>
        <ClipboardList size={20} /> <span className="font-medium">Pedidos</span>
      </Link>
      <Link to="/produtos" className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition-all", isActive('/produtos') ? 'bg-orange-50 text-[#D35400] md:bg-white/10 md:border-l-4 md:border-[#D35400]' : 'text-gray-400 hover:bg-white/5 md:hover:text-white')}>
        <Pizza size={20} /> <span className="font-medium">Produtos</span>
      </Link>
      <Link to="/categorias" className={cn("flex items-center gap-3 px-4 py-3 rounded-xl transition-all", isActive('/categorias') ? 'bg-orange-50 text-[#D35400] md:bg-white/10 md:border-l-4 md:border-[#D35400]' : 'text-gray-400 hover:bg-gray-50 md:hover:bg-white/5 md:hover:text-white')}>
        <List size={20} /> <span className="font-medium">Categorias</span>
      </Link>
    </>
  );

  // ==========================================
  //           NAVBAR (RESTAURANTE)
  // ==========================================
  if (usuarioLogado) {
    return (
        <>
        {/* HEADER MOBILE - RESTAURANTE */}
        <header className="md:hidden fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="bg-[#D35400] p-2 rounded-xl text-white"><UtensilsCrossed size={20} /></div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              FoodFlow</span>
          </Link>
          {/* BOTÃO DE MENU */}
          <button onClick={() => setIsMenuOpen(true)} 
          className=" p-3 bg-transparent hover:bg-orange-50 text-slate-800 rounded-2xl active:scale-90 transition-all">
            <Menu size={24} />
            </button>
        </header>

        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-[#1A120B] text-white flex-col z-50 shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="bg-[#D35400] p-1.5 rounded-lg"><UtensilsCrossed size={20} /></div>
              <span className="text-xl font-bold tracking-tight">FoodFlow</span>
            </Link>
          </div>

          {/* CONTAINER DE LINKS DESKTOP */}
          <nav className="flex-1 px-4 py-8 space-y-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 px-4">Menu</p>
            <NavLinks />
            <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 transition-all cursor-pointer mt-4 border-t border-white/5 pt-6">
              <LogOut size={20} /> 
              <span className="font-medium">Sair</span>
            </button>
          </nav>
        </aside>

        {/* MENU MOBILE OVERLAY */}
        <div className={cn("fixed inset-0 bg-white z-[100] transition-all duration-300 p-6 flex flex-col md:hidden", 
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none")}>
          
          <div className="flex justify-between items-center px-6 h-16 border-b border-gray-50">
            
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <div className="bg-[#D35400] p-1.5 rounded-lg text-white">
                <UtensilsCrossed size={18} />
                </div>
              <span className="font-bold text-lg text-slate-900">FoodFlow</span>
            </Link>

            {/* BOTÃO X */}
            <button onClick={() => setIsMenuOpen(false)} className="text-slate-800 p-1">
              <X size={28} />
              </button>
          </div>

          {/* LINKS COM ESTILO DE FUNDO SUAVE PARA O ATIVO */}
          <nav className="flex flex-col gap-1 p-4">
            <NavLinks />
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-3 px-4 py-3 text-gray-500 font-medium transition-all active:text-red-600 active:bg-red-50 rounded-xl"
            >
              <LogOut size={20} /> 
              <span>Sair</span>
            </button>
          </nav>
        </div>
      </>
    );
  }

  // ==========================================
  //          NAVBAR (CLIENTE)
  // ==========================================
  
  // COMPONENTE AUXILIAR PARA OS LINKS DO CLIENTE
  const NavLinksCliente = () => (
    <>
      <Link to="/cardapio" className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
        isActive('/cardapio') ? "bg-orange-50 text-[#D35400]" : "text-slate-600 hover:bg-gray-50"
      )}>
        <Pizza size={20} /> <span className="font-medium">Cardápio</span>
      </Link>
      <Link to="/recomendacoes" className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
        isActive('/recomendacoes') ? "bg-orange-50 text-[#D35400]" : "text-slate-600 hover:bg-gray-50"
      )}>
        <Leaf size={20} /> <span className="font-medium">Saudáveis</span>
      </Link>
    </>
  );

  return (
    <>
    <nav className={cn("fixed top-0 left-0 w-full z-50 transition-all duration-300", isScrolled ? 'bg-white/70 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4')}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#D35400] p-1.5 rounded-lg group-hover:scale-110 transition-transform"><UtensilsCrossed className="text-white w-5 h-5" /></div>
          <span className="text-xl font-bold text-slate-800">Food<span className="text-[#D35400]">Flow</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/cardapio" className="text-slate-600 hover:text-[#D35400] font-medium">Cardápio</Link>
          <Link to="/recomendacoes" className="flex items-center gap-2 text-[#2E7D32] bg-[#E8F5E9] px-4 py-1.5 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:[#E8F5E9] hover:brightness-95 active:scale-95"><Leaf size={16} /> 
          Saudáveis</Link>
          <div className="flex items-center gap-5 border-l border-slate-200 pl-8">
          <Link to="/carrinho" className="relative p-1 text-slate-400 hover:text-[#D35400] transition-all duration-300 group">
          <ShoppingBag size={24} />
          <span className="absolute -top-1 -right-1 size-5 bg-[#D35400] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white transition-transform group-hover:scale-110">
      2
    </span>
  </Link>
            <Link to="/login" className="bg-[#D35400] text-white px-6 py-2 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:shadow-orange-200 hover:brightness-95 active:scale-95">
            Entrar</Link>
          </div>
        </div>

        <button 
          className="md:hidden p-3 bg-transparent hover:bg-orange-50 text-slate-800 rounded-2xl active:scale-90 transition-all" 
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* MOBILE MENU CLIENTE (Overlay) */}
      <div className={cn(
        "fixed inset-0 bg-white z-[100] transition-all duration-300 p-6 flex flex-col md:hidden", 
        isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="flex justify-between items-center mb-10">
          
          {/* LOGO ENVOLVIDA EM UM LINK PARA VOLTAR À HOME */}
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
            <div className="bg-[#D35400] p-1.5 rounded-lg text-white">
              <UtensilsCrossed size={18} />
            </div>
            <span className="font-bold text-xl text-slate-800">
              Food<span className='text-[#D35400]'>Flow</span>
            </span>
          </Link>
          <button onClick={() => setIsMenuOpen(false)} className="text-slate-800">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          <NavLinksCliente />

          <Link 
            to="/login" 
            className="flex items-center justify-center gap-3 w-full bg-[#D35400] text-white p-4 rounded-2xl font-bold shadow-md hover:brightness-95 active:scale-95 transition-all mt-4"
          >
            <LogOut size={20} className="rotate-180" /> Entrar
          </Link>
        </nav>
      </div>
    </nav>
    </>
  );
}

export default Navbar;