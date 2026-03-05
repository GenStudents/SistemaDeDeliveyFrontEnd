import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

import type Categoria from "../../../models/Categoria";
import { deletar } from "../../../service/service";

interface DeletarCategoriaProps {
  categoria: Categoria;
  fecharModal: () => void;
  atualizarLista: () => void;
  header: object;
}

function DeletarCategoria({ categoria, fecharModal, atualizarLista, header }: DeletarCategoriaProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function deletarCategoria() {
    if (!categoria?.id) return;

    setIsLoading(true);

    try {
      await deletar(`/categorias/${categoria.id}`, header);
      atualizarLista();
      fecharModal();
    } catch (error) {
      console.error("Erro ao deletar categoria", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#FFFFFF] rounded-[12px] shadow-lg p-6 w-full max-w-md relative">
        
        <button
          onClick={fecharModal}
          className="absolute right-4 top-4 text-[#6C757D] hover:text-[#000000]"
          type="button"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center mb-4">
          <div className="bg-[#FFEBEE] p-4 rounded-full">
            <AlertTriangle className="text-[#C62828]" size={28} />
          </div>
        </div>

        <h1 className="text-[20px] font-bold text-center text-[#000000] mb-2">
          Excluir Categoria
        </h1>

        <p className="text-center text-[#495057] text-[14px] mb-6">
          Tem certeza que deseja excluir a categoria{" "}
          <span className="font-bold text-[#000000]">"{categoria?.descricao}"</span>?
          <br />
          Esta ação não pode ser desfeita.
        </p>

        <div className="flex gap-3">
          <button
            onClick={fecharModal}
            type="button"
            className="w-full py-2 rounded-[8px] bg-gray-100 text-[#495057] hover:bg-gray-200 font-medium transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={deletarCategoria}
            type="button"
            disabled={isLoading}
            className="w-full py-2 rounded-[8px] bg-[#C62828] hover:bg-[#a02020] text-white font-semibold flex justify-center items-center transition-colors disabled:opacity-70"
          >
            {isLoading ? <ClipLoader color="#fff" size={20} /> : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;