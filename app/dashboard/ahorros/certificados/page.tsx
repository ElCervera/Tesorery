import { SavingsCertificates } from "@/components/ahorros/savings-certificates"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CertificadosPage() {
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
            <h1 className="text-2xl font-bold tracking-tight">Certificados de Ahorro</h1>
            <p className="text-muted-foreground">Genere y descargue certificados para los asociados</p>
          </div>
        </div>
      </div>

      <SavingsCertificates />
    </div>
  )
}
