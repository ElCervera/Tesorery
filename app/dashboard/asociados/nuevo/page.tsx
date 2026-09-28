import { NewAssociateForm } from "@/components/asociados/new-associate-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NuevoAsociadoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/asociados">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nuevo Asociado</h1>
          <p className="text-muted-foreground">Complete la información para registrar un nuevo asociado</p>
        </div>
      </div>

      <NewAssociateForm />
    </div>
  )
}
