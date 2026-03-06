import { createContext, useState, useEffect, type ReactNode } from "react";
import type LoginUser from "../models/LoginUser";
import { login } from "../service/service";
import { ToastAlerta } from "../utils/ToastAlert";

interface AuthContextProps{
  usuario: LoginUser
  handleLogout(): void
  handleLogin(usuario: LoginUser): Promise<void>
  isLoading : boolean
}

interface AuthProviderProps{
  children:ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({children}:AuthProviderProps){
  
  const [usuario,setUsuario] = useState<LoginUser>({
    id: 0,
    nome:'',
    usuario:'',
    senha:'',
    foto:'',
    token:'',
  })

  const [isLoading,setIsLoading] = useState(false)

  // Restaurar usuário do localStorage ao carregar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario')
    if (usuarioSalvo) {
      try {
        setUsuario(JSON.parse(usuarioSalvo))
      } catch (erro) {
        console.error("Erro ao restaurar usuário:", erro)
      }
    }
  }, [])

  // Salvar usuário no localStorage quando mudar
  useEffect(() => {
    if (usuario.token) {
      localStorage.setItem('usuario', JSON.stringify(usuario))
    }
  }, [usuario])

  async function handleLogin(usuarioLogin:LoginUser){
    setIsLoading(true)

    try{
      await login('/usuarios/logar',usuarioLogin,setUsuario)
      ToastAlerta("Login Realizado com Sucesso","sucesso")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
      ToastAlerta("Erro ao Realizar o login, Confirme suas informações", 'info')
    }
      setIsLoading(false)
    }

    function handleLogout(){
      setUsuario({
        id: 0,
        nome:'',
        usuario:'',
        senha:'',
        foto:'',
        token:'',
      })
      localStorage.removeItem('usuario')
    }
  return(
    <AuthContext.Provider value={{usuario,handleLogin,handleLogout,isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}