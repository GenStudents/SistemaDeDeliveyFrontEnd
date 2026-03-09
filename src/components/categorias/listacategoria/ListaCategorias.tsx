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

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        {/* HEADER DA PÁGINA */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Categorias</h1>
            <p className="text-sm text-gray-500 mt-1">
              Organize seus produtos por categorias
            </p>
          </div>

          <button
            type="button"
            onClick={abrirModalNovaCategoria}
            className="
              self-start
              sm:w-auto
              bg-[#D35400] hover:bg-[#b54800]
              text-white font-semibold text-sm
              px-4 py-2 rounded-lg
              flex items-center justify-center gap-2 transition-colors
            "
          >
            <Plus size={18} />
            Nova Categoria
          </button>
        </div>

        {/* Card principal da lista */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {/* CONTAINER DA TABELA */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-900">
            <Folder size={20} />
            <h2 className="text-lg font-semibold">
              Lista de Categorias
              </h2>
          </div>
          </div>

           {/* Área com scroll interno */}
          <div className="max-h-[500px] overflow-y-auto">
          {!isLoading && categorias.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              Nenhuma categoria encontrada.
            </div>
          )}


          {/* ATULIZAÇÃO REALIZADA AQUI: versão mobile em cards */}
          <div className="md:hidden p-4 space-y-3">
              {categorias.map((categoria) => (
                <div
                  key={categoria.id}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Descrição
                      </p>

                      <p className="mt-2 text-sm font-normal text-gray-600">
                        {categoria.descricao}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => abrirEditar(categoria)}
                        title="Editar"
                        className="rounded-lg p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => abrirDeletar(categoria)}
                        title="Deletar"
                        className="rounded-lg p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

           {categorias.length > 0 && (
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                        Descrição
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right w-24">
                        Ações
                      </th>
                    </tr>
                  </thead>

                <tbody className="divide-y divide-gray-100">
                  {Array.isArray(categorias) && categorias.map((categoria) => (
                    <tr 
                    key={categoria.id} 
                    className="hover:bg-gray-50 transition-colors">

                      <td className="px-6 py-5 text-sm text-gray-500 mt-1">
                        {categoria.descricao}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-3">
                        <button 
                        onClick={() => abrirEditar(categoria)}
                        title="Editar"
                              className="text-gray-400 hover:text-orange-500 transition-colors"
                        >
                          <Pencil size={18} />
                        </button>

                        <button onClick={() => abrirDeletar(categoria)}
                          title="Deletar"
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                          <Trash2 size={18} />
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
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