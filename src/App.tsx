import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import FormProdutos from './components/produtos/formprdutos/FormProdutos'
import { AuthProvider } from './contestx/AuthContext'
import Cadastro from './pages/cadastro/Cadastro'
import Categorias from './pages/categorias/Categorias'
import Login from './pages/login/Login'
import Produtos from './pages/produtos/Produtos'
import Recomendacoes from './pages/recomendacoes/Recomendacoes'
import Dashboard from './pages/dashboard/Dashboard'
import LayoutCliente from './layouts/LayoutCliente'
import LayoutRestaurante from './layouts/LayoutRestaurante'


function App() {
  return (
      <AuthProvider>
        <ToastContainer/>
          <BrowserRouter>
            <Routes>
              {/* AREA CLIENTE */}
            <Route element={<LayoutCliente />}>
              <Route path='/'element={<Login/>}/>
              <Route path='/login'element={<Login/>}/>
              <Route path='/cadastrar'element={<Cadastro/>}/>
              <Route path='/recomendacoes'element={<Recomendacoes/>}/>
              </Route>

              {/* AREA RESTAURANTE */}
              <Route element={<LayoutRestaurante />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/produtos'element={<Produtos/>}/>
              <Route path='/categorias'element={<Categorias/>}/>
              <Route path='/cadastrarproduto'element={<FormProdutos/>}/>
              <Route path='/editarproduto/:id'element={<FormProdutos/>}/>
              </Route>
          </Routes>
          </BrowserRouter>
      </AuthProvider>
  )
}

export default App
