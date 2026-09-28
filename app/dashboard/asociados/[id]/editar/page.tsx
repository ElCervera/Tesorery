"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

type PatronalOption = {
  id: string
  nombre: string
}

type AfiliadoForm = {
  patronalId: string
  nombres: string
  apellidos: string
  tipoDocumento: string
  documento: string
  email: string
  telefono: string
  salarioNeto: string
  estado: "ACTIVO" | "INACTIVO"
  fechaIngreso: string
}

const emptyForm: AfiliadoForm = {
  patronalId: "",
  nombres: "",
  apellidos: "",
  tipoDocumento: "",
  documento: "",
  email: "",
  telefono: "",
  salarioNeto: "",
  estado: "ACTIVO",
  fechaIngreso: "",
}

export default function EditAssociatePage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const afiliadoId = params?.id

  const [patronales, setPatronales] = useState<PatronalOption[]>([])
  const [form, setForm] = useState<AfiliadoForm>(emptyForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetch("/api/patronales")
      .then((res) => res.json())
      .then((data) => setPatronales(data))
  }, [])

  useEffect(() => {
    if (!afiliadoId) return
    let active = true
    setIsLoading(true)
    fetch(`/api/afiliados/${afiliadoId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!active) return
        setForm({
          patronalId: data.patronalId ?? "",
          nombres: data.nombres ?? "",
          apellidos: data.apellidos ?? "",
          tipoDocumento: data.tipoDocumento ?? "",
          documento: data.documento ?? "",
          email: data.email ?? "",
          telefono: data.telefono ?? "",
          salarioNeto: data.salarioNeto ? String(data.salarioNeto) : "",
          estado: data.estado ?? "ACTIVO",
          fechaIngreso: data.fechaIngreso ? String(data.fechaIngreso).slice(0, 10) : "",
        })
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [afiliadoId])

  const updateField = (field: keyof AfiliadoForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!form.nombres.trim() || !form.apellidos.trim()) {
      toast({
        title: "Faltan datos",
        description: "Completa nombres y apellidos.",
        variant: "destructive",
      })
      return
    }
    if (!form.documento.trim() || !form.tipoDocumento) {
      toast({
        title: "Faltan datos",
        description: "Completa tipo y numero de documento.",
        variant: "destructive",
      })
      return
    }
    if (!form.patronalId) {
      toast({
        title: "Falta la patronal",
        description: "Selecciona la patronal del asociado.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    const payload = {
      patronalId: form.patronalId,
      nombres: form.nombres.trim(),
      apellidos: form.apellidos.trim(),
      tipoDocumento: form.tipoDocumento,
      documento: form.documento.trim(),
      email: form.email || null,
      telefono: form.telefono || null,
      salarioNeto: form.salarioNeto ? Number(form.salarioNeto) : null,
      estado: form.estado,
      fechaIngreso: form.fechaIngreso || null,
    }

    const res = await fetch(`/api/afiliados/${afiliadoId}`, {
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

    toast({ title: "Afiliado actualizado" })
    setIsSaving(false)
    router.push(`/dashboard/asociados/${afiliadoId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Editar Asociado</h1>
        <p className="text-muted-foreground">Actualice los datos principales del asociado.</p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Cargando asociado...</CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Datos del Asociado</CardTitle>
            <CardDescription>Campos basicos para gestion de afiliados.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Patronal</Label>
              <Select value={form.patronalId} onValueChange={(v) => updateField("patronalId", v)}>
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
              <Label>Estado</Label>
              <Select value={form.estado} onValueChange={(v) => updateField("estado", v as AfiliadoForm["estado"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVO">Activo</SelectItem>
                  <SelectItem value="INACTIVO">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nombres</Label>
              <Input value={form.nombres} onChange={(e) => updateField("nombres", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Apellidos</Label>
              <Input value={form.apellidos} onChange={(e) => updateField("apellidos", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Select value={form.tipoDocumento} onValueChange={(v) => updateField("tipoDocumento", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CC">Cedula de Ciudadania</SelectItem>
                  <SelectItem value="CE">Cedula de Extranjeria</SelectItem>
                  <SelectItem value="PASAPORTE">Pasaporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Documento</Label>
              <Input value={form.documento} onChange={(e) => updateField("documento", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={form.email} onChange={(e) => updateField("email", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Telefono</Label>
              <Input value={form.telefono} onChange={(e) => updateField("telefono", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Salario Neto</Label>
              <Input
                type="number"
                value={form.salarioNeto}
                onChange={(e) => updateField("salarioNeto", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha de Ingreso</Label>
              <Input
                type="date"
                value={form.fechaIngreso}
                onChange={(e) => updateField("fechaIngreso", e.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
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
