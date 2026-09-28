"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Save, User, Briefcase, Phone, FileText } from "lucide-react"
import { toast } from "@/hooks/use-toast"


type PatronalOption = {
  id: string
  nombre: string
}

export function NewAssociateForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [patronales, setPatronales] = useState<PatronalOption[]>([])
  const [formData, setFormData] = useState({
    // Personal info
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    // Contact info
    email: "",
    phone: "",
    cellphone: "",
    address: "",
    city: "",
    department: "",
    // Work info
    company: "",
    position: "",
    department_work: "",
    salary: "",
    startDate: "",
    associateType: "",
    // Documents
    notes: "",
  })

  useEffect(() => {
    let isMounted = true
    fetch("/api/patronales")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return
        setPatronales(data)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const patronalId = formData.company
    if (!patronalId) {
      toast({
        title: "Falta la patronal",
        description: "Selecciona la patronal del asociado para continuar.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const payload = {
      patronalId,
      nombres: formData.firstName,
      apellidos: formData.lastName,
      documento: formData.documentNumber,
      tipoDocumento: formData.documentType,
      email: formData.email,
      telefono: formData.cellphone || formData.phone,
      salarioNeto: formData.salary,
      fechaIngreso: formData.startDate,
    }

    const res = await fetch("/api/afiliados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      toast({ title: "Afiliado creado" })
      router.push("/dashboard/asociados")
    } else {
      toast({
        title: "No se pudo guardar",
        description: "Revisa los datos e intenta de nuevo.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="personal" className="gap-2">
            <User className="h-4 w-4 hidden sm:block" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Phone className="h-4 w-4 hidden sm:block" />
            Contacto
          </TabsTrigger>
          <TabsTrigger value="work" className="gap-2">
            <Briefcase className="h-4 w-4 hidden sm:block" />
            Laboral
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="h-4 w-4 hidden sm:block" />
            Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Datos básicos de identificación del asociado</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombres</Label>
                <Input
                  id="firstName"
                  placeholder="Juan Carlos"
                  value={formData.firstName}
                  onChange={(e) => updateForm("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  id="lastName"
                  placeholder="Pérez García"
                  value={formData.lastName}
                  onChange={(e) => updateForm("lastName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentType">Tipo de documento</Label>
                <Select value={formData.documentType} onValueChange={(v) => updateForm("documentType", v)}>
                  <SelectTrigger id="documentType">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                    <SelectItem value="passport">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentNumber">Número de documento</Label>
                <Input
                  id="documentNumber"
                  placeholder="1.023.456.789"
                  value={formData.documentNumber}
                  onChange={(e) => updateForm("documentNumber", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateForm("birthDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Género</Label>
                <Select value={formData.gender} onValueChange={(v) => updateForm("gender", v)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Masculino</SelectItem>
                    <SelectItem value="f">Femenino</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Estado civil</Label>
                <Select value={formData.maritalStatus} onValueChange={(v) => updateForm("maritalStatus", v)}>
                  <SelectTrigger id="maritalStatus">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Soltero/a</SelectItem>
                    <SelectItem value="married">Casado/a</SelectItem>
                    <SelectItem value="divorced">Divorciado/a</SelectItem>
                    <SelectItem value="widowed">Viudo/a</SelectItem>
                    <SelectItem value="union">Unión libre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Datos para comunicación con el asociado</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan.perez@empresa.com"
                  value={formData.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cellphone">Celular</Label>
                <Input
                  id="cellphone"
                  type="tel"
                  placeholder="300 123 4567"
                  value={formData.cellphone}
                  onChange={(e) => updateForm("cellphone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono fijo</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="601 123 4567"
                  value={formData.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  placeholder="Bogotá"
                  value={formData.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select value={formData.department} onValueChange={(v) => updateForm("department", v)}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bogota">Bogotá D.C.</SelectItem>
                    <SelectItem value="antioquia">Antioquia</SelectItem>
                    <SelectItem value="valle">Valle del Cauca</SelectItem>
                    <SelectItem value="atlantico">Atlántico</SelectItem>
                    <SelectItem value="santander">Santander</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  placeholder="Calle 123 # 45-67, Apto 101"
                  value={formData.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work">
          <Card>
            <CardHeader>
              <CardTitle>Información Laboral</CardTitle>
              <CardDescription>Datos relacionados con el empleo del asociado</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Patronal</Label>
                <Select value={formData.company} onValueChange={(v) => updateForm("company", v)}>
                  <SelectTrigger id="company">
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
                <Label htmlFor="associateType">Tipo de asociado</Label>
                <Select value={formData.associateType} onValueChange={(v) => updateForm("associateType", v)}>
                  <SelectTrigger id="associateType">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Empleado</SelectItem>
                    <SelectItem value="pensioner">Pensionado</SelectItem>
                    <SelectItem value="beneficiary">Beneficiario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input
                  id="position"
                  placeholder="Analista de Sistemas"
                  value={formData.position}
                  onChange={(e) => updateForm("position", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department_work">Área / Departamento</Label>
                <Input
                  id="department_work"
                  placeholder="Tecnología"
                  value={formData.department_work}
                  onChange={(e) => updateForm("department_work", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salario base</Label>
                <Input
                  id="salary"
                  type="number"
                  placeholder="3,500,000"
                  value={formData.salary}
                  onChange={(e) => updateForm("salary", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha de ingreso</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateForm("startDate", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentación</CardTitle>
              <CardDescription>Documentos y notas adicionales del asociado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium mb-1">Arrastra archivos aquí o haz clic para seleccionar</p>
                <p className="text-xs text-muted-foreground mb-4">PDF, JPG o PNG hasta 10MB</p>
                <Button variant="outline" size="sm">
                  Seleccionar archivos
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas adicionales</Label>
                <Textarea
                  id="notes"
                  placeholder="Información adicional relevante sobre el asociado..."
                  value={formData.notes}
                  onChange={(e) => updateForm("notes", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Guardar Asociado
              </>
            )}
          </Button>
        </div>
      </Tabs>
    </form>
  )
}
