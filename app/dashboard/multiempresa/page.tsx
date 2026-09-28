"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building2, Users, CreditCard, PiggyBank, Plus, Settings, ArrowRight, Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

type Patronal = {
  id: string
  nombre: string
  nit: string | null
  email?: string | null
  telefono?: string | null
  direccion?: string | null
  contactoPrincipal?: string | null
  periodicidadNomina: "QUINCENAL" | "MENSUAL"
  estado: "ACTIVA" | "INACTIVA"
}

export default function PatronalesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [patronales, setPatronales] = useState<Patronal[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [query, setQuery] = useState("")
  const [nombre, setNombre] = useState("")
  const [nit, setNit] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")
  const [contactoPrincipal, setContactoPrincipal] = useState("")
  const [periodicidadNomina, setPeriodicidadNomina] = useState<"15" | "30">("30")

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    fetch("/api/patronales")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setPatronales(data)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return patronales
    return patronales.filter((p) => {
      const nombreMatch = p.nombre.toLowerCase().includes(q)
      const nitMatch = (p.nit || "").toLowerCase().includes(q)
      return nombreMatch || nitMatch
    })
  }, [patronales, query])

  const resetForm = () => {
    setNombre("")
    setNit("")
    setEmail("")
    setTelefono("")
    setDireccion("")
    setContactoPrincipal("")
    setPeriodicidadNomina("30")
  }

  const handleCreate = async () => {
    if (!nombre.trim()) {
      toast({
        title: "Falta el nombre",
        description: "Ingresa el nombre de la patronal para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    const payload = {
      nombre: nombre.trim(),
      nit: nit || null,
      email: email || null,
      telefono: telefono || null,
      direccion: direccion || null,
      contactoPrincipal: contactoPrincipal || null,
      periodicidadNomina,
    }
    const res = await fetch("/api/patronales", {
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

    const created = await res.json()
    setPatronales((prev) => [created, ...prev])
    setIsDialogOpen(false)
    resetForm()
    toast({
      title: "Patronal creada",
      description: "La patronal se guardo correctamente.",
    })
    setIsSaving(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Patronales</h1>
          <p className="text-muted-foreground">Gestione multiples patronales desde un solo lugar</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o NIT"
              className="pl-9 w-full sm:w-64"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Patronal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agregar Nueva Patronal</DialogTitle>
                <DialogDescription>Registre una nueva patronal para administrar su fondo</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nombre de la Patronal</Label>
                  <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>NIT</Label>
                    <Input value={nit} onChange={(e) => setNit(e.target.value)} placeholder="000.000.000-0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Periodicidad Nomina</Label>
                    <Input
                      type="number"
                      min="15"
                      max="30"
                      value={periodicidadNomina}
                      onChange={(e) => setPeriodicidadNomina(e.target.value === "15" ? "15" : "30")}
                      placeholder="30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contacto@empresa.com" />
                </div>
                <div className="space-y-2">
                  <Label>Telefono</Label>
                  <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+57 000 000 0000" />
                </div>
                <div className="space-y-2">
                  <Label>Direccion</Label>
                  <Input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Direccion de la patronal" />
                </div>
                <div className="space-y-2">
                  <Label>Contacto Principal</Label>
                  <Input
                    value={contactoPrincipal}
                    onChange={(e) => setContactoPrincipal(e.target.value)}
                    placeholder="Nombre del contacto"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreate} disabled={isSaving}>{isSaving ? "Guardando..." : "Guardar Patronal"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && (
          <Card className="col-span-full">
            <CardContent className="py-10 text-center text-muted-foreground">Cargando patronales...</CardContent>
          </Card>
        )}
        {!isLoading && filtered.length == 0 && (
          <Card className="col-span-full">
            <CardContent className="py-10 text-center text-muted-foreground">No hay resultados</CardContent>
          </Card>
        )}
        {filtered.map((patronal) => (
          <Card key={patronal.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="bg-muted/30 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                  {patronal.nombre.slice(0, 2).toUpperCase()}
                </div>
                <Badge variant={patronal.estado == "ACTIVA" ? "default" : "secondary"}>
                  {patronal.estado == "ACTIVA" ? "Activa" : "Inactiva"}
                </Badge>
              </div>
              <CardTitle className="mt-4">{patronal.nombre}</CardTitle>
              <CardDescription>{patronal.nit || "Sin NIT"}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1" /> Asociados
                  </p>
                  <p className="font-medium">0</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground flex items-center">
                    <CreditCard className="h-3.5 w-3.5 mr-1" /> Creditos
                  </p>
                  <p className="font-medium">0</p>
                </div>
                <div className="col-span-2 space-y-1 pt-2 border-t">
                  <p className="text-muted-foreground flex items-center">
                    <PiggyBank className="h-3.5 w-3.5 mr-1" /> Saldo Ahorros
                  </p>
                  <p className="font-medium text-lg">$0</p>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/dashboard/multiempresa/configuracion?patronalId=${patronal.id}`}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Link>
                </Button>
                <Button size="sm" className="flex-1">
                  Gestionar <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
