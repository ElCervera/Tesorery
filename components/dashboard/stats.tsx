"use client"

import { Users, CreditCard, PiggyBank, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"

export function DashboardStats() {
  const { user } = useAuth()
  
  // Simulación de datos filtrados por empresa
  const isAcme = user?.companyId === "1"
  const isGlobal = !user?.companyId || user?.companyId === "all"

  const stats = [
    {
      title: "Total Asociados",
      value: isGlobal ? "1,234" : (isAcme ? "450" : "120"),
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "vs. mes anterior",
    },
    {
      title: "Cartera Activa",
      value: isGlobal ? "$2.4B" : (isAcme ? "$850M" : "$210M"),
      change: "+8.2%",
      trend: "up",
      icon: CreditCard,
      description: "en créditos vigentes",
    },
    {
      title: "Ahorros Totales",
      value: isGlobal ? "$890M" : (isAcme ? "$320M" : "$85M"),
      change: "+15.3%",
      trend: "up",
      icon: PiggyBank,
      description: "captaciones del mes",
    },
    {
      title: "Índice de Mora",
      value: isGlobal ? "2.4%" : (isAcme ? "1.8%" : "3.1%"),
      change: "-0.5%",
      trend: "down",
      icon: TrendingDown,
      description: "mejor que meta",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className="flex items-center gap-1 text-xs">
                  {stat.trend === "up" ? (
                    <span className="text-green-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.change}
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center">
                      <ArrowDownRight className="h-3 w-3" />
                      {stat.change}
                    </span>
                  )}
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
