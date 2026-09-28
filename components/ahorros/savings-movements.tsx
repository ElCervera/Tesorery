"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

type PatronalOption = {
  id: string
  nombre: string
}

type AfiliadoRow = {
  id: string
  nombres: string
  apellidos: string
  documento: string
  salarioNeto: string | null
}

type ConfiguracionAhorro = {
  ahorroObligatorioPct: number
  aportePct: number
}

type AporteDraft = {
  afiliadoId: string
  nombre: string
  documento: string
  salarioNeto: number | null
  monto: string
  incluir: boolean
}

export function SavingsMovements() {
  const [patronales, setPatronales] = useState<PatronalOption[]>([])
  const [patronalId, setPatronalId] = useState("")
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10))
  const [config, setConfig] = useState<ConfiguracionAhorro | null>(null)
  const [afiliados, setAfiliados] = useState<AfiliadoRow[]>([])
  const [aportes, setAportes] = useState<AporteDraft[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetch("/api/patronales")
      .then((res) => res.json())
      .then((data) => setPatronales(data))
  }, [])

  useEffect(() => {
    if (!patronalId) {
      setConfig(null)
      setAfiliados([])
      setAportes([])
      return
    }

    setIsLoading(true)
    Promise.all([
      fetch(`/api/patronales/${patronalId}`).then((res) => res.json()),
      fetch(`/api/afiliados?patronalId=${patronalId}`).then((res) => res.json()),
    ])
      .then(([patronal, afiliadosData]) => {
        setConfig(
          patronal?.configuracionAhorro
            ? {
                ahorroObligatorioPct: Number(patronal.configuracionAhorro.ahorroObligatorioPct),
                aportePct: Number(patronal.configuracionAhorro.aportePct),
              }
            : null
        )
        setAfiliados(afiliadosData || [])
      })
      .finally(() => setIsLoading(false))
  }, [patronalId])

  useEffect(() => {
    setAportes(
      afiliados.map((afiliado) => {
        const salario = afiliado.salarioNeto ? Number(afiliado.salarioNeto) : null
        const sugerido =
          salario && config
            ? (salario * config.ahorroObligatorioPct) / 100
            : 0
        return {
          afiliadoId: afiliado.id,
          nombre: `${afiliado.nombres} ${afiliado.apellidos}`.trim(),
          documento: afiliado.documento,
          salarioNeto: salario,
          monto: sugerido ? String(Math.round(sugerido)) : "",
          incluir: true,
        }
      })
    )
  }, [afiliados, config])

  const totalAportes = useMemo(() => {
    return aportes
      .filter((a) => a.incluir && Number(a.monto))
      .reduce((acc, a) => acc + Number(a.monto), 0)
  }, [aportes])

  const updateAporte = (id: string, value: Partial<AporteDraft>) => {
    setAportes((prev) => prev.map((a) => (a.afiliadoId === id ? { ...a, ...value } : a)))
  }

  const handleSave = async () => {
    if (!patronalId) {
      toast({
        title: "Falta la patronal",
        description: "Selecciona la patronal para registrar aportes.",
        variant: "destructive",
      })
      return
    }

    const seleccionados = aportes.filter((a) => a.incluir && Number(a.monto) > 0)
    if (seleccionados.length === 0) {
      toast({
        title: "Sin aportes",
        description: "Selecciona al menos un afiliado con monto.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    const payload = {
      patronalId,
      fecha,
      aportes: seleccionados.map((a) => ({
        afiliadoId: a.afiliadoId,
        monto: Number(a.monto),
        descripcion: "Aporte por nomina",
      })),
    }

    const res = await fetch("/api/movimientos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      toast({
        title: "No se pudo guardar",
        description: "Revisa los datos e intenta de nuevo.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    toast({ title: "Aportes registrados" })
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Registrar aportes del periodo</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Patronal</label>
            <Select value={patronalId} onValueChange={setPatronalId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent>
                {patronales.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha del periodo</label>
            <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Total aportes</label>
            <Input value={totalAportes.toLocaleString("es-CO")} readOnly />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Afiliados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incluir</TableHead>
                <TableHead>Afiliado</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Salario Neto</TableHead>
                <TableHead>Monto Aporte</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Cargando afiliados...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && aportes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Selecciona una patronal para cargar afiliados.
                  </TableCell>
                </TableRow>
              )}
              {aportes.map((aporte) => (
                <TableRow key={aporte.afiliadoId}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={aporte.incluir}
                      onChange={(e) => updateAporte(aporte.afiliadoId, { incluir: e.target.checked })}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{aporte.nombre}</TableCell>
                  <TableCell className="font-mono text-sm">{aporte.documento}</TableCell>
                  <TableCell>
                    {aporte.salarioNeto ? aporte.salarioNeto.toLocaleString("es-CO") : "-"}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={aporte.monto}
                      onChange={(e) => updateAporte(aporte.afiliadoId, { monto: e.target.value })}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Guardando..." : "Guardar aportes"}
        </Button>
      </div>
    </div>
  )
}
