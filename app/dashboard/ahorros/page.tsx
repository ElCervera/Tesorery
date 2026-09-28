import { SavingsOverviewCards } from "@/components/ahorros/savings-overview-cards"
import { SavingsLinesTable } from "@/components/ahorros/savings-lines-table"
import { SavingsDistributionChart } from "@/components/ahorros/savings-distribution-chart"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

export default function AhorrosPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ahorros</h1>
          <p className="text-muted-foreground">Gestión de líneas de ahorro y captaciones</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent" asChild>
          <Link href="/dashboard/ahorros/configuracion">
            <Settings className="h-4 w-4" />
            Configurar Líneas
          </Link>
        </Button>
      </div>

      <SavingsOverviewCards />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SavingsLinesTable />
        </div>
        <SavingsDistributionChart />
      </div>
    </div>
  )
}
