import { Card, CardContent } from "@/components/ui/card"
import { FileBarChart, Users, CreditCard, PiggyBank } from "lucide-react"

const stats = [
  { title: "Reportes generados hoy", value: "12", icon: FileBarChart },
  { title: "Asociados activos", value: "1,234", icon: Users },
  { title: "Créditos vigentes", value: "856", icon: CreditCard },
  { title: "Total captaciones", value: "$890M", icon: PiggyBank },
]

export function QuickStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
