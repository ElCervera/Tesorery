import { AssociateDetail } from "@/components/asociados/associate-detail"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, FileText } from "lucide-react"
import Link from "next/link"

export default async function AssociateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/asociados">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Detalle del Asociado</h1>
            <p className="text-muted-foreground">ID: {id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent" asChild>
            <Link href={`/dashboard/asociados/estados?id=${id}`}>
              <FileText className="h-4 w-4" />
              Estado de Cuenta
            </Link>
          </Button>
          <Button className="gap-2" asChild>
            <Link href={`/dashboard/asociados/${id}/editar`}>
              <Edit className="h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <AssociateDetail />
    </div>
  )
}
