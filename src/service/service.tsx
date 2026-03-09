import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const cadastroUsuario = async (url: string, dados: object, setDados: Function) => {
  try {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
  } catch (erro) {
    console.error("Erro ao cadastrar usuário:", erro);
    toast.error("Erro ao cadastrar usuário");
  }
}

export const login = async (url: string, dados: object, setDados: Function) => {
  try {
    const resposta = await api.post(url, dados);
    setDados(resposta.data)
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    toast.error("Erro no login, confirme seus dados");
  }
}


// export const buscar = async (url: string, setDados: Function, header: object) => {
//   try {
//     const resposta = await api.get(url, header)
//     setDados(resposta.data)
//   } catch (erro) {
//     console.error("Erro ao buscar dados:", erro);
//     toast.error("Erro ao carregar dados");
//     setDados([]);
//   }
// }

export const buscar = async (url: string, setDados: Function, header: object) => {
  try {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
  } catch (erro: any) {
    if (erro.response && erro.response.status === 401) {
      toast.error(
        <div>
          Sessão expirada.
          <a href="/login" style={{ color: 'blue', fontWeight: 'bold' }}>Faça login aqui</a>
        </div>,
        { toastId: "auth-error" } // Evita que apareçam 4 toasts iguais
      );
    } else {
      console.error("Erro ao buscar dados:", erro);
      toast.error("Erro ao carregar dados");
    }
    setDados([]);
  }
}

export const cadastrar = async (url: string, dados: object, setDados: Function, header: object) => {
  try {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
    toast.success("Cadastro realizado com sucesso!");
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    toast.error("Erro ao cadastrar");
  }
}

export const atualizar = async (url: string, dados: object, setDados: Function, header: object) => {
  try {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
    toast.success("Atualização realizada com sucesso!");
  } catch (erro) {
    console.error("Erro ao atualizar:", erro);
    toast.error("Erro ao atualizar");
  }
}

export const deletar = async (url: string, header: object) => {
  try {
    await api.delete(url, header)
    toast.success("Deletado com sucesso!");
  } catch (erro) {
    console.error("Erro ao deletar:", erro);
    toast.error("Erro ao deletar");
  }
}