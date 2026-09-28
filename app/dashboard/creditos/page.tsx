"use client"

import { useAuth } from "@/context/auth-context"
import { CreditsTable } from "@/components/creditos/credits-table"
import { CreditsFilters } from "@/components/creditos/credits-filters"
import { CreditStats } from "@/components/creditos/credit-stats"
import { Button } from "@/components/ui/button"
import { Plus, Download, CreditCard, Calendar, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function AsociadoCreditsView() {
  const { user } = useAuth()
  
  const myCredits = [
    { id: "CRE-001", type: "Crédito de Libranza", amount: "$8,000,000", balance: "$4,250,000", rate: "1.2%", nextPayment: "2024-06-30", status: "Al día" },
    { id: "CRE-002", type: "Crédito Educativo", amount: "$5,000,000", balance: "$3,600,000", rate: "0.8%", nextPayment: "2024-06-30", status: "Al día" },
    { id: "CRE-003", type: "Crédito de Emergencia", amount: "$2,000,000", balance: "$500,000", rate: "1.5%", nextPayment: "2024-06-30", status: "Al día" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mis Créditos</h1>
          <p className="text-muted-foreground">Consulta el estado y plan de pagos de tus créditos en {user?.companyName}</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/creditos/simulador">
            <Plus className="h-4 w-4" />
            Solicitar Crédito
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Deuda Total</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,850,000</div>
            <p className="text-xs text-muted-foreground">Suma de saldos actuales</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próximo Vencimiento</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30 Jun 2024</div>
            <p className="text-xs text-muted-foreground">Fecha de descuento de nómina</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Capacidad Disponible</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,000,000</div>
            <p className="text-xs text-muted-foreground">Para nuevos créditos</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle>Créditos Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo de Crédito</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Monto Inicial</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Saldo Actual</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tasa</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {myCredits.map((credit) => (
                  <tr key={credit.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{credit.type}</td>
                    <td className="p-4 align-middle">{credit.amount}</td>
                    <td className="p-4 align-middle font-bold text-primary">{credit.balance}</td>
                    <td className="p-4 align-middle">{credit.rate}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {credit.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <Button variant="ghost" size="sm">Ver Detalle</Button>
                    </td>
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

export default function CreditosPage() {
  const { user } = useAuth()

  if (user?.role === "Asociado") {
    return <AsociadoCreditsView />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cartera de Créditos</h1>
          <p className="text-muted-foreground">Gestione los créditos otorgados a los asociados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button asChild className="gap-2">
            <Link href="/dashboard/creditos/solicitudes">
              <Plus className="h-4 w-4" />
              Nueva Solicitud
            </Link>
          </Button>
        </div>
      </div>

      <CreditStats />
      <CreditsFilters />
      <CreditsTable />
    </div>
  )
}
