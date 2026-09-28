"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PatronalOption = {
  id: string
  nombre: string
}

type AfiliadoRow = {
  id: string
  nombres: string
  apellidos: string
  documento: string
  patronalId: string
}

export default function EditarAsociadoListadoPage() {
  const [patronales, setPatronales] = useState<PatronalOption[]>([])
  const [patronalId, setPatronalId] = useState("todas")
  const [documento, setDocumento] = useState("")
  const [afiliados, setAfiliados] = useState<AfiliadoRow[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch("/api/patronales")
      .then((res) => res.json())
      .then((data) => setPatronales(data))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (documento.trim()) params.set("query", documento.trim())
    if (patronalId !== "todas") params.set("patronalId", patronalId)

    setIsLoading(true)
    fetch(`/api/afiliados?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setAfiliados(data))
      .finally(() => setIsLoading(false))
  }, [documento, patronalId])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Editar Asociado</h1>
        <p className="text-muted-foreground">Filtre por documento y patronal para editar.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Encuentre el asociado que desea editar.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Documento</label>
            <Input
              placeholder="Numero de documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Patronal</label>
            <Select value={patronalId} onValueChange={setPatronalId}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                {patronales.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading && <p className="text-sm text-muted-foreground">Cargando...</p>}
          {!isLoading && afiliados.length === 0 && (
            <p className="text-sm text-muted-foreground">No hay resultados.</p>
          )}
          {afiliados.map((a) => (
            <div key={a.id} className="flex items-center justify-between border rounded-md px-4 py-3">
              <div>
                <p className="font-medium">{a.nombres} {a.apellidos}</p>
                <p className="text-sm text-muted-foreground">Documento: {a.documento}</p>
              </div>
              <Button asChild>
                <Link href={`/dashboard/asociados/${a.id}/editar`}>Editar</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
