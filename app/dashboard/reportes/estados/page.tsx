import { EstadoCuentaReport } from "@/components/reportes/estado-cuenta-report"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EstadosReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/reportes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Estados de Cuenta</h1>
          <p className="text-muted-foreground">Genere estados de cuenta individuales o masivos</p>
        </div>
      </div>

      <EstadoCuentaReport />
    </div>
  )
}
