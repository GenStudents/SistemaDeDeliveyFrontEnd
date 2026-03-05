import { X } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { ClipLoader } from "react-spinners";

import type Categoria from "../../../models/Categoria";
import { atualizar, cadastrar } from "../../../service/service";

interface FormCategoriaProps {
  categoriaInicial?: Categoria | null;
  fecharModal: () => void;
  header: object;
}

function FormCategoria({ categoriaInicial, fecharModal, header }: FormCategoriaProps) {
  const [categoria, setCategoria] = useState<Categoria>(
    categoriaInicial ?? { id: 0, descricao: "" }
  );

  const [isLoading, setIsLoading] = useState(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function salvarCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (categoria.id && categoria.id !== 0) {
        await atualizar("/categorias", categoria, () => {}, header);
      } else {
        await cadastrar("/categorias", categoria, () => {}, header);
      }
    } catch (error) {
      console.error("Erro ao salvar categoria", error);
    }

    setIsLoading(false);
    fecharModal();
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#FFFFFF] rounded-[12px] p-6 w-full max-w-md relative shadow-lg">
        
        <button
          onClick={fecharModal}
          className="absolute right-4 top-4 text-[#6C757D] hover:text-[#000000]"
          type="button"
        >
          <X size={20} />
        </button>

        <h1 className="text-[24px] font-bold text-[#000000] text-center mb-6">
          {categoria.id && categoria.id !== 0 ? "Editar Categoria" : "Nova Categoria"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={salvarCategoria}>
          <div className="flex flex-col gap-2">
            <label className="text-[#495057] text-[14px] font-medium">
              Descrição
            </label>
            <input
              type="text"
              name="descricao"
              className="border border-[#E9ECEF] bg-white text-[#495057] text-[14px] rounded-[8px] p-3 focus:outline-none focus:border-[#D35400]"
              value={categoria.descricao}
              onChange={atualizarEstado}
              placeholder="Ex: Lanches, Bebidas..."
              required
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={fecharModal}
              className="w-full py-2 rounded-[8px] bg-gray-100 text-[#495057] hover:bg-gray-200 font-medium transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-[8px] bg-[#D35400] hover:bg-[#b54800] text-white font-semibold flex justify-center items-center transition-colors disabled:opacity-70"
            >
              {isLoading ? <ClipLoader color="#fff" size={20} /> : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCategoria;