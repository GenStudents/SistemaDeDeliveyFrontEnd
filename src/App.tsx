import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import FromCategoria from './components/categorias/formcategoria/FromCategoria'
import FromProdutos from './components/produtos/fromprdutos/FromProdutos'
import Cadastro from './pages/cadastro/Cadastro'
import Categorias from './pages/categorias/Categorias'
import Login from './pages/login/Login'
import Produtos from './pages/produtos/Produtos'
import Recomendacoes from './pages/recomendacoes/Recomendacoes'
import Navbar from './components/navbar/Navbar'
import { Footer } from './components/footer/footer'


function App() {
  
  const isRestaurante = window.location.pathname.includes('produtos') || 
                        window.location.pathname.includes('categorias') ||
                        window.location.pathname.includes('cadastrarproduto');

  return (
    <>
    
    <ToastContainer/>
    <BrowserRouter>
    <div className='flex flex-col min-h-screen w-full'>
    <Navbar />
    <div className='flex-1 pt-20 w-full'>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/cadastrar'element={<Cadastro/>}/>
        <Route path='/produtos'element={<Produtos/>}/>
        <Route path='/cadastrarproduto'element={<FromProdutos/>}/>
        <Route path='/editarproduto/:id'element={<FromProdutos/>}/>
        <Route path='/categorias'element={<Categorias/>}/>
        <Route path='/cadastrarcategorias'element={<FromCategoria/>}/>
        <Route path='/editarcategorias/:id'element={<FromCategoria/>}/>
        <Route path='/recomendacoes'element={<Recomendacoes/>}/>
      </Routes>
      </div>
       {!isRestaurante && <Footer />}
        </div>
    </BrowserRouter>
    </>
  )
}

export default App
