"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Search, FileText, Printer } from "lucide-react"

export function SavingsCertificates() {
  const [selectedAssociate, setSelectedAssociate] = useState("")

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Search & Generate */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generar Certificado</CardTitle>
          <CardDescription>Busque un asociado y genere su certificado de ahorros</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Buscar asociado</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Nombre o cédula..." className="pl-9" />
              </div>
              <Button variant="outline">Buscar</Button>
            </div>
          </div>

          {/* Simulated found associate */}
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Juan Carlos Pérez García</p>
                <p className="text-sm text-muted-foreground">CC 1.023.456.789</p>
                <p className="text-sm text-muted-foreground">Asociado desde: 15/03/2020</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Ahorros</p>
                <p className="text-xl font-bold text-primary">$12,500,000</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de certificado</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consolidado">Consolidado de Ahorros</SelectItem>
                  <SelectItem value="permanente">Ahorro Permanente</SelectItem>
                  <SelectItem value="voluntario">Ahorro Voluntario</SelectItem>
                  <SelectItem value="programado">Ahorro Programado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fecha de corte</Label>
              <Input type="date" defaultValue="2025-01-01" />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-2">
                <FileText className="h-4 w-4" />
                Generar PDF
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vista Previa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-card space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-primary">CREAFONDOS</h3>
              <p className="text-sm text-muted-foreground">Fondo de Empleados</p>
              <p className="text-xs text-muted-foreground">NIT: 900.123.456-7</p>
            </div>

            <div className="text-center">
              <h4 className="font-bold">CERTIFICADO DE AHORROS</h4>
              <p className="text-sm text-muted-foreground">Fecha de expedición: 02/01/2025</p>
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <p>
                <span className="text-muted-foreground">Asociado:</span>{" "}
                <span className="font-medium">Juan Carlos Pérez García</span>
              </p>
              <p>
                <span className="text-muted-foreground">Documento:</span>{" "}
                <span className="font-medium">CC 1.023.456.789</span>
              </p>
              <p>
                <span className="text-muted-foreground">Fecha de corte:</span>{" "}
                <span className="font-medium">01/01/2025</span>
              </p>
            </div>

            <div className="border rounded p-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ahorro Permanente</span>
                <span className="font-medium">$8,500,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ahorro Voluntario</span>
                <span className="font-medium">$3,200,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Ahorro Programado</span>
                <span className="font-medium">$800,000</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>TOTAL AHORROS</span>
                <span className="text-primary">$12,500,000</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Este certificado tiene validez de 30 días a partir de la fecha de expedición.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
