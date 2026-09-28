"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Loader2, Calculator, User, FileCheck } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export function CreditRequestForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    associateId: "",
    creditLine: "",
    amount: "",
    term: "",
    purpose: "",
    guaranteeType: "",
    guaranteeDescription: "",
    comments: "",
  })

  // Simulated calculation
  const calculateQuote = () => {
    const amount = Number.parseFloat(formData.amount) || 0
    const term = Number.parseInt(formData.term) || 1
    const rate = 0.012 // 1.2% monthly
    const monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
    return {
      monthlyPayment: monthlyPayment.toLocaleString("es-CO", { style: "currency", currency: "COP" }),
      totalInterest: (monthlyPayment * term - amount).toLocaleString("es-CO", { style: "currency", currency: "COP" }),
      totalPayment: (monthlyPayment * term).toLocaleString("es-CO", { style: "currency", currency: "COP" }),
    }
  }

  const calculation = calculateQuote()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/dashboard/creditos")
  }

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Associate Selection */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  1
                </div>
                <div>
                  <CardTitle className="text-base">Selección del Asociado</CardTitle>
                  <CardDescription>Identifique al asociado solicitante</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="associateId">Buscar asociado</Label>
                <div className="flex gap-2">
                  <Input
                    id="associateId"
                    placeholder="Nombre o número de documento..."
                    value={formData.associateId}
                    onChange={(e) => updateForm("associateId", e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.associateId && (
                <Alert>
                  <User className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Juan Carlos Pérez García</p>
                        <p className="text-sm text-muted-foreground">CC 1.023.456.789 • Empleado activo</p>
                        <p className="text-sm text-muted-foreground">Capacidad disponible: $15,000,000</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard/asociados/ASO-001">Ver perfil</Link>
                      </Button>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Credit Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  2
                </div>
                <div>
                  <CardTitle className="text-base">Detalles del Crédito</CardTitle>
                  <CardDescription>Configure los parámetros del crédito</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="creditLine">Línea de crédito</Label>
                <Select value={formData.creditLine} onValueChange={(v) => updateForm("creditLine", v)}>
                  <SelectTrigger id="creditLine">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="libre">Libre Inversión (1.2% m.v.)</SelectItem>
                    <SelectItem value="vivienda">Vivienda (1.0% m.v.)</SelectItem>
                    <SelectItem value="educacion">Educación (0.9% m.v.)</SelectItem>
                    <SelectItem value="vehiculo">Vehículo (1.1% m.v.)</SelectItem>
                    <SelectItem value="calamidad">Calamidad (0.8% m.v.)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Monto solicitado</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="10,000,000"
                  value={formData.amount}
                  onChange={(e) => updateForm("amount", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Plazo (meses)</Label>
                <Select value={formData.term} onValueChange={(v) => updateForm("term", v)}>
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 meses</SelectItem>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="18">18 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                    <SelectItem value="48">48 meses</SelectItem>
                    <SelectItem value="60">60 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Destino del crédito</Label>
                <Input
                  id="purpose"
                  placeholder="Ej: Remodelación vivienda"
                  value={formData.purpose}
                  onChange={(e) => updateForm("purpose", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Guarantees */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  3
                </div>
                <div>
                  <CardTitle className="text-base">Garantías</CardTitle>
                  <CardDescription>Defina las garantías del crédito</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guaranteeType">Tipo de garantía</Label>
                <Select value={formData.guaranteeType} onValueChange={(v) => updateForm("guaranteeType", v)}>
                  <SelectTrigger id="guaranteeType">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ahorros">Ahorros (hasta 90%)</SelectItem>
                    <SelectItem value="codeudor">Codeudor</SelectItem>
                    <SelectItem value="pagare">Pagaré</SelectItem>
                    <SelectItem value="hipoteca">Hipoteca</SelectItem>
                    <SelectItem value="prenda">Prenda</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Observaciones</Label>
                <Textarea
                  id="comments"
                  placeholder="Información adicional sobre la solicitud..."
                  value={formData.comments}
                  onChange={(e) => updateForm("comments", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Calculation Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Resumen de Simulación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monto solicitado</span>
                  <span className="font-medium">
                    {formData.amount
                      ? Number.parseFloat(formData.amount).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })
                      : "$0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Plazo</span>
                  <span className="font-medium">{formData.term || 0} meses</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tasa mensual</span>
                  <span className="font-medium">1.2% m.v.</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cuota mensual</span>
                  <span className="font-bold text-primary text-lg">
                    {formData.amount && formData.term ? calculation.monthlyPayment : "$0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total intereses</span>
                  <span className="font-medium">
                    {formData.amount && formData.term ? calculation.totalInterest : "$0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total a pagar</span>
                  <span className="font-medium">
                    {formData.amount && formData.term ? calculation.totalPayment : "$0"}
                  </span>
                </div>
              </div>

              <Separator />

              <Button asChild variant="outline" className="w-full gap-2 bg-transparent">
                <Link href="/dashboard/creditos/simulador">
                  <Calculator className="h-4 w-4" />
                  Simulador completo
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <FileCheck className="h-4 w-4" />
                  Enviar Solicitud
                </>
              )}
            </Button>
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
