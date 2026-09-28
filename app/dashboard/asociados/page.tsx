"use client"

import { useEffect, useState } from "react"
import { AssociatesTable } from "@/components/asociados/associates-table"
import { AssociatesFilters } from "@/components/asociados/associates-filters"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

type PatronalOption = {
  id: string
  nombre: string
}

type AfiliadoRow = {
  id: string
  nombres: string
  apellidos: string
  documento: string
  email: string | null
  telefono: string | null
  estado: "ACTIVO" | "INACTIVO"
}

export default function AsociadosPage() {
  const { user } = useAuth()
  const isEmpresa = user?.role === "Empresa"

  const [query, setQuery] = useState("")
  const [estado, setEstado] = useState("todos")
  const [patronalId, setPatronalId] = useState("todas")
  const [patronales, setPatronales] = useState<PatronalOption[]>([])
  const [afiliados, setAfiliados] = useState<AfiliadoRow[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch("/api/patronales")
      .then((res) => res.json())
      .then((data) => setPatronales(data))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query.trim()) params.set("query", query.trim())
    if (estado !== "todos") params.set("estado", estado)
    if (patronalId !== "todas") params.set("patronalId", patronalId)

    setIsLoading(true)
    fetch(`/api/afiliados?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setAfiliados(data))
      .finally(() => setIsLoading(false))
  }, [query, estado, patronalId])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isEmpresa ? `Asociados de ${user?.companyName}` : "Asociados"}
          </h1>
          <p className="text-muted-foreground">
            {isEmpresa ? `Listado de empleados afiliados de ${user?.companyName}` : "Gestione la informacion de los asociados al fondo"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          {!isEmpresa && (
            <Button asChild className="gap-2">
              <Link href="/dashboard/asociados/nuevo">
                <Plus className="h-4 w-4" />
                Nuevo Asociado
              </Link>
            </Button>
          )}
        </div>
      </div>

      <AssociatesFilters
        query={query}
        estado={estado}
        patronalId={patronalId}
        patronales={patronales}
        onQueryChange={setQuery}
        onEstadoChange={setEstado}
        onPatronalChange={setPatronalId}
      />
      <AssociatesTable data={afiliados} isLoading={isLoading} />
    </div>
  )
}
