import type { Icon } from "@phosphor-icons/react"


interface Props {
  title: string
  value: number
  description: string
  icon: Icon
}

export function CardDashboard({ title, value, description, icon: Icon }: Props) {
  return (
    <div className="bg-white rounded-xl border p-6 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="text-3xl font-bold">{value}</h2>

        <p className="text-xs text-gray-400">{description}</p>
      </div>

      <div className="bg-orange-100 p-3 rounded-lg">
        <Icon size={20} className="text-orange-500" />
      </div>
    </div>
  )
}