import type { LucideIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"


interface Props {
  titulo: string
  valor: number
  descricao: string
  icone: LucideIcon
  rota: string
}

export function CardDashboard({
  titulo,
  valor,
  descricao,
  icone: Icon,
  rota
}: Props) {

  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(rota)}
      className="
      bg-white
      rounded-xl
      border border-gray-200
      p-6
      flex items-center justify-between
      shadow-sm
      hover:shadow-md
      transition
      cursor-pointer
      "
    >
      <div className="flex flex-col gap-1">

        <span className="text-sm text-gray-500">
          {titulo}
        </span>

        <span className="text-3xl font-bold text-gray-900">
          {valor}
        </span>

        <span className="text-xs text-gray-400">
          {descricao}
        </span>

      </div>

      <div className="bg-orange-100 p-3 rounded-xl">
        <Icon size={22} className="text-orange-600"/>
      </div>

    </div>
  )
}