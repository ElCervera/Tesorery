import { ReportsGrid } from "@/components/reportes/reports-grid"
import { QuickStats } from "@/components/reportes/quick-stats"

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Consultas y Reportes</h1>
        <p className="text-muted-foreground">Genere y exporte reportes del fondo de empleados</p>
      </div>

      <QuickStats />
      <ReportsGrid />
    </div>
  )
}
