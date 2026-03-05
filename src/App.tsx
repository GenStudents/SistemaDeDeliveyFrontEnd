import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import FromCategoria from './components/categorias/formcategoria/FromCategoria'
import FromProdutos from './components/produtos/fromprdutos/FromProdutos'
import { AuthProvider } from './contestx/AuthContext'
import Cadastro from './pages/cadastro/Cadastro'
import Categorias from './pages/categorias/Categorias'
import Login from './pages/login/Login'
import Produtos from './pages/produtos/Produtos'
import Recomendacoes from './pages/recomendacoes/Recomendacoes'


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer/>
          <BrowserRouter>
          <div className='min-h-[80vh]'>
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
          </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
