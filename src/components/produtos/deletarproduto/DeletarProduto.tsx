import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contestx/AuthContext"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../service/service"
import { ToastAlerta } from "../../../utils/ToastAlert"

function DeletarProduto() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [produto, setProduto] = useState<Produto>();
    const [isLoading, setIsLoading] = useState(true);

    const header = {
        headers: {
            Authorization: token
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado para acessar essa página!", "erro");
            navigate("/login");
            return;
        }

        if (id !== undefined) {
            setIsLoading(true);
            buscar(`/produtos/${id}`, setProduto, header)
                .finally(() => setIsLoading(false));
        }
    }, [id, token]);

    async function confirmarDelecao() {
        setIsLoading(true);
        try {
            await deletar(`/produtos/${id}`, header);
            ToastAlerta("Produto excluído com sucesso!", "sucesso");
            navigate("/produtos");
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
            ToastAlerta("Erro ao excluir o produto. Tente novamente.", "erro");
        } finally {
            setIsLoading(false);
        }
    }

    function cancelar() {
        navigate("/produtos");
    }

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h2>Excluir Produto</h2>
            {produto ? (
                <div>
                    <p>Tem certeza que deseja excluir o produto:</p>
                    <h3>{produto.nome}</h3>
                    <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>
                </div>
            ) : (
                <p>Produto não encontrado.</p>
            )}
            <button onClick={confirmarDelecao}>
                Confirmar
            </button>
            <button onClick={cancelar}>
                Cancelar
            </button>
        </div>
    )
}

export default DeletarProduto;