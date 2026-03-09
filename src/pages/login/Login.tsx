import { UtensilsCrossed } from 'lucide-react';
import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../contestx/AuthContext';
import type LoginUser from '../../models/LoginUser';
   
function Login() {

  const navigate = useNavigate();
  const {usuario,handleLogin,isLoading}= useContext(AuthContext)

  const[loginUser,setLoginUser]=useState<LoginUser>({} as LoginUser)

  useEffect(()=>{
    if(usuario.token !==""){
      navigate("/dashboard")
    }
  },[usuario])

  function atualizarEstado(e:ChangeEvent<HTMLInputElement>){
    setLoginUser({
      ...loginUser,
      [e.target.name]: e.target.value
    })
  }

  function login(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()
    handleLogin(loginUser)
  }

  return (
    <div className=" bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-gray-900">
      
      {/* Cabeçalho / Logo */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="bg-[#d95f18] text-white p-3 rounded-full mb-4 shadow-sm">
          <UtensilsCrossed size={28} strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-bold mb-1">FoodFlow</h1>
        <p className="text-sm text-gray-500">Gerencie o cardapio do seu restaurante</p>
      </div>

      {/* Cartão de Login */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 w-full max-w-[28rem] p-8">
        
        <div className="text-center mb-6">
          <h2 className="text-[1.15rem] font-bold mb-1.5">Entrar na sua conta</h2>
          <p className="text-sm text-gray-500">Insira suas credenciais para acessar o painel</p>
        </div>

        <form className="space-y-4" onSubmit={login}>
          {/* Input E-mail */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" htmlFor="usuario">
              E-mail
            </label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              placeholder="seu@email.com"
              value={loginUser.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d95f18]/50 focus:border-[#d95f18] transition-colors"
            />
          </div>

          {/* Input Senha */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              name="senha"
              value={loginUser.senha}
              placeholder="Sua senha"
              onChange={(e: ChangeEvent<HTMLInputElement>)=> atualizarEstado(e)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d95f18]/50 focus:border-[#d95f18] transition-colors"
            />
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-[#d95f18] hover:bg-[#c25415] text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-2">
            {isLoading ? <ClipLoader color='#ffffff' size={24}/>: <span>Entrar</span>}
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <p className="mt-8 text-sm text-gray-500">
        Nao possui uma conta?{' '}
        <Link to="/cadastrar" className="text-[#d95f18] hover:underline font-medium">
          Criar conta
        </Link>
      </p>

    </div>
  );
};

export default Login;