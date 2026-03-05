import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import FromProdutos from './components/produtos/fromprdutos/FromProdutos'
import { AuthProvider } from './contestx/AuthContext'
import Cadastro from './pages/cadastro/Cadastro'
import Categorias from './pages/categorias/Categorias'
import Login from './pages/login/Login'
import Produtos from './pages/produtos/Produtos'
import Recomendacoes from './pages/recomendacoes/Recomendacoes'
import Navbar from './components/navbar/Navbar'
import { Footer } from './components/footer/footer'


function App() {
  
  const usuarioLogado = true; // ALTERAR AQUI ÁRA FICAR O NAVBAR CORRETO - ATE CRIAR O LOGIN USUARIO
  //const { usuario } = useContext(AuthContext) → sidebar empurra conteúdo
  //const usuarioLogado = !!usuario → layout cliente + footer

  return (
    <>
      <AuthProvider>
        <ToastContainer/>
          <BrowserRouter>
          <div className={usuarioLogado ? "flex min-h-screen w-full bg-slate-50" : "min-h-screen w-full bg-white"}>
            <Navbar />
            <main className={`
            flex flex-col flex-1 min-h-screen w-full
            ${usuarioLogado ? 'lg:pl-[260px]' : 'pt-20'} 
          `}>
              <div className="flex-1 p-6 lg:p-8">
            <Routes>
              <Route path='/'element={<Login/>}/>
              <Route path='/login'element={<Login/>}/>
              <Route path='/cadastrar'element={<Cadastro/>}/>
              <Route path='/produtos'element={<Produtos/>}/>
              <Route path='/cadastrarproduto'element={<FromProdutos/>}/>
              <Route path='/editarproduto/:id'element={<FromProdutos/>}/>
              <Route path='/categorias'element={<Categorias/>}/>
              <Route path='/recomendacoes'element={<Recomendacoes/>}/>
            </Routes>
          </div>
          {!usuarioLogado && (
              <div className="w-full mt-auto">
                 <Footer />
              </div>
            )}
          </main>
          </div>
          </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
