"use client"

import Link from "next/link"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

type Patronal = {
  id: string
  nombre: string
  periodicidadNomina: "QUINCENAL" | "MENSUAL"
  configuracionAhorro?: {
    ahorroObligatorioPct: string
    aportePct: string
    ahorroVoluntarioHabilitado: boolean
    ahorroVoluntarioPctMax: string | null
    tipoCuota: "PORCENTAJE" | "FIJA"
    cuotaFija: string | null
  } | null
}

type LineaAhorro = {
  id: string
  nombre: string
  reglas: {
    minimo?: number
    maximo?: number
    permiteRetiro?: boolean
  } | null
}

export default function AhorrosConfiguracionPage() {
  const searchParams = useSearchParams()
  const patronalFromQuery = searchParams.get("patronalId")

  const [patronales, setPatronales] = useState<Patronal[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(patronalFromQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [ahorroObligatorioPct, setAhorroObligatorioPct] = useState("")
  const [aportePct, setAportePct] = useState("")
  const [periodicidadNomina, setPeriodicidadNomina] = useState<"15" | "30">("30")
  const [tipoCuota, setTipoCuota] = useState<"porcentaje" | "fija">("porcentaje")
  const [cuotaFija, setCuotaFija] = useState("")
  const [ahorroVoluntarioHabilitado, setAhorroVoluntarioHabilitado] = useState(false)
  const [ahorroVoluntarioPctMax, setAhorroVoluntarioPctMax] = useState("")

  const [lineas, setLineas] = useState<LineaAhorro[]>([])
  const [lineaNombre, setLineaNombre] = useState("")
  const [lineaMinimo, setLineaMinimo] = useState("")
  const [lineaMaximo, setLineaMaximo] = useState("")
  const [lineaPermiteRetiro, setLineaPermiteRetiro] = useState(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    fetch("/api/patronales")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        setPatronales(data)
        if (!selectedId && data.length > 0) {
          setSelectedId(data[0].id)
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!selectedId) return
    let isMounted = true
    fetch(`/api/patronales/${selectedId}`)
      .then((res) => res.json())
      .then((data: Patronal) => {
        if (!isMounted) return
        setPeriodicidadNomina(data.periodicidadNomina === "QUINCENAL" ? "15" : "30")
        if (data.configuracionAhorro) {
          setAhorroObligatorioPct(String(data.configuracionAhorro.ahorroObligatorioPct ?? ""))
          setAportePct(String(data.configuracionAhorro.aportePct ?? ""))
          setAhorroVoluntarioHabilitado(Boolean(data.configuracionAhorro.ahorroVoluntarioHabilitado))
          setAhorroVoluntarioPctMax(
            data.configuracionAhorro.ahorroVoluntarioPctMax
              ? String(data.configuracionAhorro.ahorroVoluntarioPctMax)
              : ""
          )
          setTipoCuota(data.configuracionAhorro.tipoCuota === "FIJA" ? "fija" : "porcentaje")
          setCuotaFija(data.configuracionAhorro.cuotaFija ? String(data.configuracionAhorro.cuotaFija) : "")
        } else {
          setAhorroObligatorioPct("")
          setAportePct("")
          setAhorroVoluntarioHabilitado(false)
          setAhorroVoluntarioPctMax("")
          setTipoCuota("porcentaje")
          setCuotaFija("")
        }
      })

    fetch(`/api/patronales/${selectedId}/lineas-ahorro`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        setLineas(data)
      })

    return () => {
      isMounted = false
    }
  }, [selectedId])

  const selectedLabel = useMemo(() => {
    return patronales.find((p) => p.id === selectedId)?.nombre ?? ""
  }, [patronales, selectedId])

  const handleSave = async () => {
    if (!selectedId) return

    if (!ahorroObligatorioPct || !aportePct) {
      toast({
        title: "Faltan valores",
        description: "Completa ahorro obligatorio y aportes para guardar.",
        variant: "destructive",
      })
      return
    }

    if (Number(aportePct) > Number(ahorroObligatorioPct)) {
      toast({
        title: "Aporte invalido",
        description: "El aporte no puede ser mayor al ahorro obligatorio.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    const configPayload = {
      ahorroObligatorioPct: Number(ahorroObligatorioPct),
      aportePct: Number(aportePct),
      ahorroVoluntarioHabilitado,
      ahorroVoluntarioPctMax: ahorroVoluntarioPctMax ? Number(ahorroVoluntarioPctMax) : null,
      tipoCuota,
      cuotaFija: cuotaFija ? Number(cuotaFija) : null,
    }

    const resConfig = await fetch(`/api/patronales/${selectedId}/configuracion-ahorro`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(configPayload),
    })

    const resPatronal = await fetch(`/api/patronales/${selectedId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ periodicidadNomina }),
    })

    if (!resConfig.ok || !resPatronal.ok) {
      toast({
        title: "No se pudo guardar",
        description: "Revisa los datos e intenta de nuevo.",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    toast({
      title: "Configuracion guardada",
      description: "Los parametros fueron actualizados correctamente.",
    })

    setIsSaving(false)
  }

  const handleAddLinea = async () => {
    if (!selectedId) return
    if (!lineaNombre.trim()) {
      toast({
        title: "Falta el nombre",
        description: "Ingresa el nombre de la linea de ahorro.",
        variant: "destructive",
      })
      return
    }
    const reglas = {
      minimo: lineaMinimo ? Number(lineaMinimo) : undefined,
      maximo: lineaMaximo ? Number(lineaMaximo) : undefined,
      permiteRetiro: lineaPermiteRetiro,
    }
    const res = await fetch(`/api/patronales/${selectedId}/lineas-ahorro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: lineaNombre.trim(), reglas }),
    })

    if (res.ok) {
      const created = await res.json()
      setLineas((prev) => [created, ...prev])
      setLineaNombre("")
      setLineaMinimo("")
      setLineaMaximo("")
      setLineaPermiteRetiro(true)
      toast({ title: "Linea creada" })
    } else {
      toast({
        title: "No se pudo crear",
        description: "Revisa los datos e intenta de nuevo.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveLinea = async (lineaId: string) => {
    if (!selectedId) return
    const res = await fetch(`/api/patronales/${selectedId}/lineas-ahorro/${lineaId}`, { method: "DELETE" })
    if (res.ok) {
      setLineas((prev) => prev.filter((l) => l.id !== lineaId))
      toast({ title: "Linea eliminada" })
    } else {
      toast({
        title: "No se pudo eliminar",
        description: "Intenta de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/ahorros">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Configuracion de Ahorros</h1>
            <p className="text-muted-foreground">
              Parametrice ahorro obligatorio, aportes y ahorro voluntario por patronal
            </p>
          </div>
        </div>
        <Button className="gap-2" onClick={handleSave} disabled={!selectedId || isSaving}>
          <Save className="h-4 w-4" />
          {isSaving ? "Guardando..." : "Guardar"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patronal</CardTitle>
          <CardDescription>Seleccione la patronal a configurar</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedId ?? ""} onValueChange={(value) => setSelectedId(value)}>
            <SelectTrigger>
              <SelectValue placeholder={isLoading ? "Cargando..." : "Seleccione"}>
                {selectedLabel}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {patronales.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ahorro Obligatorio</CardTitle>
            <CardDescription>Porcentaje aplicado sobre salario neto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Porcentaje de ahorro obligatorio</Label>
              <Input
                type="number"
                value={ahorroObligatorioPct}
                onChange={(e) => setAhorroObligatorioPct(e.target.value)}
                placeholder="Ej: 5"
              />
            </div>
            <div className="space-y-2">
              <Label>Periodicidad de nomina</Label>
              <Select value={periodicidadNomina} onValueChange={(value) => setPeriodicidadNomina(value as "15" | "30")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aportes</CardTitle>
            <CardDescription>Sub-porcentaje dentro del ahorro obligatorio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Porcentaje de aportes</Label>
              <Input
                type="number"
                value={aportePct}
                onChange={(e) => setAportePct(e.target.value)}
                placeholder="Ej: 3"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo de cuota</Label>
              <Select value={tipoCuota} onValueChange={(value) => setTipoCuota(value as "porcentaje" | "fija")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="porcentaje">Porcentaje</SelectItem>
                  <SelectItem value="fija">Cuota fija</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Cuota fija (si aplica)</Label>
              <Input
                type="number"
                value={cuotaFija}
                onChange={(e) => setCuotaFija(e.target.value)}
                placeholder="Ej: 20000"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ahorro Voluntario</CardTitle>
          <CardDescription>Habilite y defina limites para el ahorro voluntario</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Habilitar ahorro voluntario</Label>
              <p className="text-sm text-muted-foreground">Permite aportes adicionales del afiliado</p>
            </div>
            <Switch checked={ahorroVoluntarioHabilitado} onCheckedChange={setAhorroVoluntarioHabilitado} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Porcentaje maximo</Label>
              <Input
                type="number"
                value={ahorroVoluntarioPctMax}
                onChange={(e) => setAhorroVoluntarioPctMax(e.target.value)}
                placeholder="Ej: 10"
              />
            </div>
            <div className="space-y-2">
              <Label>Limite por movimiento</Label>
              <Input type="number" placeholder="Ej: 500000" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lineas de Ahorro</CardTitle>
          <CardDescription>Defina lineas y reglas basicas (minimos, maximos, retiros)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Nombre de la linea</Label>
              <Input value={lineaNombre} onChange={(e) => setLineaNombre(e.target.value)} placeholder="Ej: Ahorro Programado" />
            </div>
            <div className="space-y-2">
              <Label>Minimo</Label>
              <Input type="number" value={lineaMinimo} onChange={(e) => setLineaMinimo(e.target.value)} placeholder="Ej: 10000" />
            </div>
            <div className="space-y-2">
              <Label>Maximo</Label>
              <Input type="number" value={lineaMaximo} onChange={(e) => setLineaMaximo(e.target.value)} placeholder="Ej: 500000" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch checked={lineaPermiteRetiro} onCheckedChange={setLineaPermiteRetiro} />
              <span className="text-sm">Permite retiro</span>
            </div>
            <Button variant="outline" onClick={handleAddLinea} disabled={!selectedId || !lineaNombre.trim()}>
              Agregar linea
            </Button>
          </div>

          {lineas.length === 0 && (
            <div className="text-sm text-muted-foreground">No hay lineas configuradas</div>
          )}

          {lineas.map((linea) => (
            <div key={linea.id} className="flex items-center justify-between border rounded-md px-3 py-2">
              <div>
                <div className="font-medium">{linea.nombre}</div>
                <div className="text-xs text-muted-foreground">
                  Min: {linea.reglas?.minimo ?? "-"} | Max: {linea.reglas?.maximo ?? "-"} | Retiro: {linea.reglas?.permiteRetiro ? "Si" : "No"}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleRemoveLinea(linea.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
