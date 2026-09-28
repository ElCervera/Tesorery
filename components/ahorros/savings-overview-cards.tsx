import { Card, CardContent } from "@/components/ui/card"
import { PiggyBank, TrendingUp, Users, ArrowUpRight } from "lucide-react"

const stats = [
  {
    title: "Captaciones Totales",
    value: "$890M",
    change: "+15.3%",
    description: "Total en todas las líneas",
    icon: PiggyBank,
  },
  {
    title: "Rendimientos del Mes",
    value: "$12.5M",
    change: "+8.2%",
    description: "Liquidados este periodo",
    icon: TrendingUp,
  },
  {
    title: "Asociados Ahorradores",
    value: "1,089",
    change: "+45",
    description: "Con saldo activo",
    icon: Users,
  },
]

export function SavingsOverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">{stat.description}</span>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
