import { CreditRequestForm } from "@/components/creditos/credit-request-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SolicitudesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/creditos">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nueva Solicitud de Crédito</h1>
          <p className="text-muted-foreground">Complete la información para procesar una solicitud</p>
        </div>
      </div>

      <CreditRequestForm />
    </div>
  )
}
