import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { Footer } from './components/footer/footer'
import Navbar from './components/navbar/Navbar'
import FromProdutos from './components/produtos/fromprdutos/FromProdutos'
import { AuthProvider } from './contestx/AuthContext'
import Cadastro from './pages/cadastro/Cadastro'
import Categorias from './pages/categorias/Categorias'
import Login from './pages/login/Login'
import Produtos from './pages/produtos/Produtos'
import Recomendacoes from './pages/recomendacoes/Recomendacoes'


function App() {
  
  const usuarioLogado = false;

  return (
    <>
      <AuthProvider>
        <ToastContainer/>
          <BrowserRouter>
          <div className='flex flex-col min-h-screen w-full'>
            <Navbar />
            <div className='flex-1 w-full pt-20'>
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
          {!usuarioLogado && <Footer />}
          </div>
          </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
