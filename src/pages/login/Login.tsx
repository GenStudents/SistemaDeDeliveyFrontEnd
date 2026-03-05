import { UtensilsCrossed } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-gray-900">
      
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

        <form className="space-y-4">
          {/* Input E-mail */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d95f18]/50 focus:border-[#d95f18] transition-colors"
            />
          </div>

          {/* Input Senha */}
          <div>
            <label className="block text-sm font-semibold mb-1.5" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Sua senha"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d95f18]/50 focus:border-[#d95f18] transition-colors"
            />
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-[#d95f18] hover:bg-[#c25415] text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-2"
          >
            Entrar
          </button>
        </form>
      </div>

      {/* Rodapé */}
      <p className="mt-8 text-sm text-gray-500">
        Nao possui uma conta?{' '}
        <a href="#" className="text-[#d95f18] hover:underline font-medium">
          Criar conta
        </a>
      </p>

    </div>
  );
};

export default Login;