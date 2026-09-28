import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const stats = [
  {
    title: "Cartera Total",
    value: "$2.4B",
    description: "1,234 créditos activos",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Cartera Vigente",
    value: "$2.1B",
    description: "87.5% del total",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Cartera en Mora",
    value: "$180M",
    description: "7.5% - 89 créditos",
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    title: "Solicitudes Pendientes",
    value: "23",
    description: "$450M en revisión",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

export function CreditStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
