"use client"

import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CreditCard, 
  PiggyBank, 
  Calendar, 
  ArrowUpRight, 
  FileText,
  Clock,
  CheckCircle2
} from "lucide-react"

export function AsociadoDashboard() {
  const { user } = useAuth()

  // Simulación de datos diferentes por empresa
  const isAcme = user?.companyId === "1"
  
  const misStats = [
    {
      title: "Mis Ahorros",
      value: isAcme ? "$4,520,000" : "$2,150,000",
      icon: PiggyBank,
      color: "text-blue-600",
      bg: "bg-blue-100",
      description: "Total acumulado"
    },
    {
      title: "Saldo de Créditos",
      value: isAcme ? "$12,850,000" : "$5,400,000",
      icon: CreditCard,
      color: "text-purple-600",
      bg: "bg-purple-100",
      description: isAcme ? "3 créditos activos" : "1 crédito activo"
    },
    {
      title: "Próximo Pago",
      value: isAcme ? "$450,000" : "$180,000",
      icon: Calendar,
      color: "text-orange-600",
      bg: "bg-orange-100",
      description: "Vence en 12 días"
    },
    {
      title: "Cupo Disponible",
      value: isAcme ? "$8,000,000" : "$12,000,000",
      icon: ArrowUpRight,
      color: "text-green-600",
      bg: "bg-green-100",
      description: "Para nuevos créditos"
    }
  ]

  const misCreditos = [
    {
      id: "CR-001",
      linea: "Crédito de Consumo",
      monto: "$15,000,000",
      saldo: "$8,500,000",
      cuota: "$350,000",
      progreso: 45,
      proximoPago: "30/01/2026",
      estado: "Al día"
    },
    {
      id: "CR-002",
      linea: "Crédito Educativo",
      monto: "$5,000,000",
      saldo: "$4,350,000",
      cuota: "$100,000",
      progreso: 15,
      proximoPago: "30/01/2026",
      estado: "Al día"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">¡Hola, {user?.name.split(" ")[0]}!</h1>
        <p className="text-muted-foreground">
          Este es el resumen de tus productos en <span className="font-semibold text-primary">{user?.companyName}</span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {misStats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{stat.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Créditos Activos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mis Créditos Activos</CardTitle>
                <CardDescription>Resumen de tus obligaciones vigentes</CardDescription>
              </div>
              <Button variant="outline" size="sm">Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {misCreditos.map((credito) => (
              <div key={credito.id} className="p-4 rounded-lg border bg-muted/30 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{credito.linea}</p>
                    <p className="text-xs text-muted-foreground">{credito.id}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                    {credito.estado}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Saldo pendiente</p>
                    <p className="font-medium">{credito.saldo}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Valor cuota</p>
                    <p className="font-medium">{credito.cuota}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span>Progreso de pago</span>
                    <span>{credito.progreso}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all" 
                      style={{ width: `${credito.progreso}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Próximo pago: {credito.proximoPago}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Últimos Movimientos de Ahorro */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Últimos Movimientos</CardTitle>
                <CardDescription>Ahorros y descuentos de nómina</CardDescription>
              </div>
              <Button variant="outline" size="sm">Ver extracto</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { type: "Ahorro", desc: "Ahorro Obligatorio - Nómina", date: "15 Ene 2026", amount: "+$150,000", status: "Procesado" },
                { type: "Crédito", desc: "Pago Cuota Crédito Consumo", date: "30 Dic 2025", amount: "-$350,000", status: "Procesado" },
                { type: "Ahorro", desc: "Ahorro Voluntario - Nómina", date: "15 Dic 2025", amount: "+$50,000", status: "Procesado" },
                { type: "Ahorro", desc: "Ahorro Obligatorio - Nómina", date: "15 Dic 2025", amount: "+$150,000", status: "Procesado" },
              ].map((mov, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${mov.type === "Ahorro" ? "bg-green-50" : "bg-red-50"}`}>
                      {mov.type === "Ahorro" ? (
                        <ArrowUpRight className={`h-4 w-4 ${mov.type === "Ahorro" ? "text-green-600" : "text-red-600"}`} />
                      ) : (
                        <FileText className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{mov.desc}</p>
                      <p className="text-xs text-muted-foreground">{mov.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${mov.amount.startsWith("+") ? "text-green-600" : "text-foreground"}`}>
                      {mov.amount}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{mov.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">Información Importante</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tus aportes de nómina se ven reflejados en el sistema los días 15 y 30 de cada mes, 
                según el reporte de <span className="font-medium text-foreground">{user?.companyName}</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
