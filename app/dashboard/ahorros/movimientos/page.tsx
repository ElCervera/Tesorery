"use client"

import { useAuth } from "@/context/auth-context"
import { SavingsMovements } from "@/components/ahorros/savings-movements"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, PiggyBank, TrendingUp, Wallet } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function AsociadoSavingsView() {
  const { user } = useAuth()
  
  const myMovements = [
    { id: "MOV-001", date: "2024-05-30", description: "Ahorro Voluntario - Nómina", amount: "+$200,000", balance: "$4,520,000", type: "Ahorro" },
    { id: "MOV-002", date: "2024-05-30", description: "Ahorro Obligatorio - Nómina", amount: "+$150,000", balance: "$4,320,000", type: "Ahorro" },
    { id: "MOV-003", date: "2024-05-15", description: "Retiro Parcial - Emergencia", amount: "-$500,000", balance: "$4,170,000", type: "Retiro" },
    { id: "MOV-004", date: "2024-04-30", description: "Ahorro Voluntario - Nómina", amount: "+$200,000", balance: "$4,670,000", type: "Ahorro" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mis Ahorros</h1>
            <p className="text-muted-foreground">Consulta tus aportes y rendimientos en {user?.companyName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar Extracto
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ahorro Extraordinario
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,520,000</div>
            <p className="text-xs text-muted-foreground">Ahorros obligatorios + voluntarios</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ahorro Mensual</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$350,000</div>
            <p className="text-xs text-muted-foreground">Descuento promedio por nómina</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rendimientos (2024)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,400</div>
            <p className="text-xs text-muted-foreground">+3.2% efectivo anual proyectado</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Últimos Movimientos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Descripción</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Valor</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Saldo</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {myMovements.map((mov) => (
                  <tr key={mov.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">{mov.date}</td>
                    <td className="p-4 align-middle font-medium">{mov.description}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline" className={mov.type === "Ahorro" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-orange-50 text-orange-700 border-orange-200"}>
                        {mov.type}
                      </Badge>
                    </td>
                    <td className={`p-4 align-middle text-right font-bold ${mov.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {mov.amount}
                    </td>
                    <td className="p-4 align-middle text-right font-medium">{mov.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MovimientosPage() {
  const { user } = useAuth()

  if (user?.role === "Asociado") {
    return <AsociadoSavingsView />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/ahorros">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Aportes por Periodo</h1>
            <p className="text-muted-foreground">Registre y controle los aportes obligatorios de cada patronal</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <SavingsMovements />
    </div>
  )
}
