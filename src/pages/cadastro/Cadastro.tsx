import { UtensilsCrossed } from "lucide-react"
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import type Usuario from "../../models/Usuario"
import { cadastroUsuario } from "../../service/service"
import { ToastAlerta } from "../../utils/ToastAlert"

function Cadastro(){

  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const[confirmarSenha, setConfirmarSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

   function retornar(){
    navigate('/')
  }
  
  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario])


  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true)

      try{
        await cadastroUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        ToastAlerta('Usuário cadastrado com sucesso!','sucesso')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }catch(error){
        ToastAlerta('Erro ao cadastrar o usuário!','erro')
      }
    }else{
      ToastAlerta('Dados do usuário inconsistentes! Verifique as informações do cadastro.','info')
      setUsuario({...usuario, senha: ''})
      setConfirmarSenha('')
    }
    setIsLoading(false)
  }

  return(
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
          <h2 className="text-[1.15rem] font-bold mb-1.5">Crie sua conta</h2>
          <p className="text-sm text-gray-500">Preencha os dados abaixo para começar</p>
        </div>

        <form className="space-y-4" onSubmit={cadastrarNovoUsuario}>
          {/* Input E-mail */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="nome"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>)=>atualizarEstado(e)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d95f18]/50 focus:border-[#d95f18] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" htmlFor="usuario">
              E-mail
            </label>
            <input
              id="usuario"
              type="text"
              name="usuario"
              placeholder="seu@email.com" 
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>)=>atualizarEstado(e)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d95f18]/50 focus:border-[#d95f18] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" htmlFor="foto">
             Foto
            </label>
            <input
              id="foto"
              type="text"
              name="foto"
              placeholder="foto"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>)=>atualizarEstado(e)}
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
              placeholder="Sua senha"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>)=>atualizarEstado(e)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d95f18]/50 focus:border-[#d95f18] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5" htmlFor="confirmarSenha">
              Confirmar Senha
            </label>
            <input
              id="confirmarSenha"
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>)=>handleConfirmarSenha(e)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d95f18]/50 focus:border-[#d95f18] transition-colors"
            />
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-[#d95f18] hover:bg-[#c254f15] text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-2"
          >
             { isLoading ? 
                  <ClipLoader 
                    color="#ffffff" 
                    size={24}
                  /> : 
                  <span>Cadastrar</span>
                }
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <p className="mt-8 text-sm text-gray-500">
        Já possui uma conta?{' '}
        <Link to='/login' className="text-[#d95f18] hover:underline font-medium">
          login
        </Link>
      </p>

    </div>
  )
}
export default Cadastro