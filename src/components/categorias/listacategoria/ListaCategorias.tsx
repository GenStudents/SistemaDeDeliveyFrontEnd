import { Folder, Pencil, Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contestx/AuthContext";
import type Categoria from "../../../models/Categoria";
import { buscar } from "../../../service/service";
import DeletarCategoria from "../deletarcategoria/DeletarCategoria";
import FormCategoria from "../formcategoria/FormCategoria";

function ListaCategoria() {
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);

  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);
    const token = usuario.token;
    const header = { 
      headers: { Authorization: token }
    };

  async function buscarCategorias() {
    try {
      setIsLoading(true);
      await buscar("/categorias", setCategorias, header);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setIsLoading(false);
    }
  }

useEffect(() => {
    if (!token || token === "") {
      toast.info("Você precisa estar logado para acessar este recurso.", {
        toastId: "auth-info"
      });
      navigate("/login");
      return;
    }

async function carregarDados() {
      try {
        setIsLoading(true);
        await buscar("/categorias", setCategorias, header);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setIsLoading(false);
      }
    }

    carregarDados();

  }, [token, navigate]);


  function abrirModalNovaCategoria() {
    setCategoriaSelecionada(null);
    setModalEditar(true);
  }

  function abrirEditar(categoria: Categoria) {
    setCategoriaSelecionada(categoria);
    setModalEditar(true);
  }

  function abrirDeletar(categoria: Categoria) {
    setCategoriaSelecionada(categoria);
    setModalDeletar(true);
  }

  function fecharModais() {
    setModalEditar(false);
    setModalDeletar(false);
    setCategoriaSelecionada(null);
    buscarCategorias();
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#D35400" size={12} />
        </div>
      )}

      <div className="flex flex-col w-full max-w-5xl mx-auto my-4">
        {/* HEADER DA PÁGINA */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[24px] font-bold text-[#000000]">Categorias</h1>
            <p className="text-[#6C757D] text-[14px] mt-1">
              Organize seus produtos por categorias
            </p>
          </div>

          <button
            type="button"
            onClick={abrirModalNovaCategoria}
            className="
              bg-[#D35400] hover:bg-[#b54800]
              text-white font-semibold text-[14px]
              px-4 py-2 rounded-[8px]
              flex items-center gap-2 transition-colors
            "
          >
            <Plus size={18} />
            Nova Categoria
          </button>
        </div>

        {/* CONTAINER DA TABELA */}
        <div className="bg-[#FFFFFF] border border-[#E9ECEF] rounded-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.05)] p-6">
          <div className="flex items-center gap-2 mb-6 text-[#000000]">
            <Folder size={20} />
            <h2 className="text-[18px] font-bold">Lista de Categorias</h2>
          </div>

          {!isLoading && categorias.length === 0 && (
            <div className="text-center py-8 text-[#6C757D]">
              Nenhuma categoria encontrada.
            </div>
          )}

          {categorias.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E9ECEF] text-[#000000]">
                    <th className="pb-3 text-[14px] font-bold">Descrição</th>
                    <th className="pb-3 text-[14px] font-bold text-right w-24">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(categorias) && categorias.map((categoria) => (
                    <tr key={categoria.id} className="border-b border-[#E9ECEF] last:border-0 hover:bg-[#F8F9FA] transition-colors">
                      <td className="py-4 text-[#495057] text-[14px]">
                        {categoria.descricao}
                      </td>
                      <td className="py-4 flex justify-end gap-4">
                        <button onClick={() => abrirEditar(categoria)}>
                          <Pencil size={18} className="text-[#495057] hover:text-[#D35400] transition-colors" />
                        </button>
                        <button onClick={() => abrirDeletar(categoria)}>
                          <Trash2 size={18} className="text-[#C62828] hover:text-red-800 transition-colors" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {modalEditar && (
      <FormCategoria
        categoriaInicial={categoriaSelecionada}
        fecharModal={fecharModais}
        header={header}
      />
      )}

      {modalDeletar && categoriaSelecionada && (
        <DeletarCategoria
          categoria={categoriaSelecionada}
          fecharModal={fecharModais}
          atualizarLista={buscarCategorias}
          header={header}
        />
      )}
    </>
  );
}

export default ListaCategoria;