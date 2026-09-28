import { useEffect, useState } from "react"
import Link from "next/link"
import { AccountStatement } from "@/components/asociados/account-statement"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Printer } from "lucide-react"

type PatronalOption = {
  id: string
  nombre: string
}

type AfiliadoRow = {
  id: string
  nombres: string
  apellidos: string
  documento: string
}

export default function EstadosCuentaPage() {
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/asociados">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Estado de Cuenta</h1>
            <p className="text-muted-foreground">Resumen consolidado del asociado</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Descargar PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      <div className="space-y-2">
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
            <Button asChild variant="outline">
              <Link href={`/dashboard/asociados/estados?id=${a.id}`}>Ver estado</Link>
            </Button>
          </div>
        ))}
      </div>

      <AccountStatement />
    </div>
  )
}
