import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contestx/AuthContext"
import type Produto from "../../../models/Produto"
import { buscar, deletar } from "../../../service/service"

function DeletarProduto() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [produto, setProduto] = useState<Produto>();

    const header = {
        headers: {
            Authorization: token
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscar(`/produtos/${id}`, setProduto, header);
        }
    }, [id]);

    async function confirmarDelecao() {
        try {
            await deletar(`/produtos/${id}`, header);
            navigate("/produtos");
        } catch (error) {
            console.error("Erro ao deletar o produto:", error);
        }
    }

    function cancelar() {
        navigate("/produtos");
    }

    return (
        <div>
            <h2>Excluir Produto</h2>

            {produto && (
                <div>
                    <p>Tem certeza que deseja excluir o produto:</p>
                    <h3>{produto.nome}</h3>
                    <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>
                </div>
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