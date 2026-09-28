"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

type PatronalOption = {
  id: string
  nombre: string
}

type PatronalDetalle = {
  id: string
  nombre: string
  nit: string | null
  email: string | null
  telefono: string | null
  direccion: string | null
  contactoPrincipal: string | null
  periodicidadNomina: "QUINCENAL" | "MENSUAL"
  estado: "ACTIVA" | "INACTIVA"
}

export default function PatronalConfiguracionPage() {
  const searchParams = useSearchParams()
  const patronalIdFromQuery = searchParams.get("patronalId") ?? ""

  const [patronales, setPatronales] = useState<PatronalOption[]>([])
  const [patronalId, setPatronalId] = useState(patronalIdFromQuery)
  const [form, setForm] = useState<PatronalDetalle | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let active = true
    fetch("/api/patronales")
      .then((res) => res.json())
      .then((data) => {
        if (active) setPatronales(data)
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!patronalId) {
      setForm(null)
      return
    }

    let active = true
    setIsLoading(true)
    fetch(`/api/patronales/${patronalId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return
        setForm(data)
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [patronalId])

  const patronalNombre = useMemo(() => {
    return patronales.find((p) => p.id === patronalId)?.nombre ?? ""
  }, [patronales, patronalId])

  const updateField = (field: keyof PatronalDetalle, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  const handleSave = async () => {
    if (!form) return
    if (!form.nombre.trim()) {
      toast({
        title: "Falta el nombre",
        description: "El nombre de la patronal es obligatorio.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    const payload = {
      nombre: form.nombre.trim(),
      nit: form.nit || null,
      email: form.email || null,
      telefono: form.telefono || null,
      direccion: form.direccion || null,
      contactoPrincipal: form.contactoPrincipal || null,
      periodicidadNomina: form.periodicidadNomina === "QUINCENAL" ? "15" : "30",
      estado: form.estado,
    }

    const res = await fetch(`/api/patronales/${form.id}`, {
      method: "PUT",
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

    const saved = await res.json()
    setForm(saved)
    toast({ title: "Cambios guardados" })
    setIsSaving(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Configuracion de Patronal</h1>
        <p className="text-muted-foreground">Actualice los datos administrativos y de contacto de cada patronal.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Patronal</CardTitle>
          <CardDescription>Elija la patronal que desea configurar.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-xl">
          <Select value={patronalId} onValueChange={setPatronalId}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una patronal" />
            </SelectTrigger>
            <SelectContent>
              {patronales.map((patronal) => (
                <SelectItem key={patronal.id} value={patronal.id}>
                  {patronal.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Cargando patronal...</CardContent>
        </Card>
      )}

      {!isLoading && patronalId && form && (
        <Card>
          <CardHeader>
            <CardTitle>{patronalNombre || "Datos de Patronal"}</CardTitle>
            <CardDescription>Edite los datos principales y de contacto.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={form.nombre} onChange={(e) => updateField("nombre", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>NIT</Label>
              <Input value={form.nit ?? ""} onChange={(e) => updateField("nit", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={form.email ?? ""} onChange={(e) => updateField("email", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Telefono</Label>
              <Input value={form.telefono ?? ""} onChange={(e) => updateField("telefono", e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Direccion</Label>
              <Input value={form.direccion ?? ""} onChange={(e) => updateField("direccion", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Contacto Principal</Label>
              <Input
                value={form.contactoPrincipal ?? ""}
                onChange={(e) => updateField("contactoPrincipal", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Periodicidad de Nomina</Label>
              <Select
                value={form.periodicidadNomina}
                onValueChange={(value) =>
                  updateField("periodicidadNomina", value as PatronalDetalle["periodicidadNomina"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="QUINCENAL">Quincenal (15 dias)</SelectItem>
                  <SelectItem value="MENSUAL">Mensual (30 dias)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select
                value={form.estado}
                onValueChange={(value) => updateField("estado", value as PatronalDetalle["estado"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVA">Activa</SelectItem>
                  <SelectItem value="INACTIVA">Inactiva</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
