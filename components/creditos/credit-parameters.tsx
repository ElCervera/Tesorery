"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2 } from "lucide-react"

const creditLines = [
  {
    id: 1,
    name: "Libre Inversión",
    rate: 1.2,
    minAmount: 500000,
    maxAmount: 50000000,
    minTerm: 6,
    maxTerm: 60,
    guarantee: "Ahorros 90%",
    active: true,
  },
  {
    id: 2,
    name: "Vivienda",
    rate: 1.0,
    minAmount: 5000000,
    maxAmount: 200000000,
    minTerm: 12,
    maxTerm: 120,
    guarantee: "Hipoteca",
    active: true,
  },
  {
    id: 3,
    name: "Educación",
    rate: 0.9,
    minAmount: 500000,
    maxAmount: 30000000,
    minTerm: 6,
    maxTerm: 48,
    guarantee: "Ahorros 80%",
    active: true,
  },
  {
    id: 4,
    name: "Vehículo",
    rate: 1.1,
    minAmount: 5000000,
    maxAmount: 80000000,
    minTerm: 12,
    maxTerm: 60,
    guarantee: "Prenda",
    active: true,
  },
  {
    id: 5,
    name: "Calamidad",
    rate: 0.8,
    minAmount: 500000,
    maxAmount: 10000000,
    minTerm: 6,
    maxTerm: 24,
    guarantee: "Pagaré",
    active: true,
  },
  {
    id: 6,
    name: "Vacaciones",
    rate: 1.3,
    minAmount: 500000,
    maxAmount: 15000000,
    minTerm: 6,
    maxTerm: 24,
    guarantee: "Ahorros 80%",
    active: false,
  },
]

export function CreditParameters() {
  const [lines, setLines] = useState(creditLines)

  const toggleLine = (id: number) => {
    setLines((prev) => prev.map((line) => (line.id === id ? { ...line, active: !line.active } : line)))
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Líneas de Crédito</CardTitle>
            <CardDescription>Configure las diferentes líneas de crédito disponibles</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Línea
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nueva Línea de Crédito</DialogTitle>
                <DialogDescription>Configure los parámetros de la nueva línea de crédito</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la línea</Label>
                  <Input id="name" placeholder="Ej: Libre Inversión" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rate">Tasa mensual (%)</Label>
                    <Input id="rate" type="number" step="0.1" placeholder="1.2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guarantee">Garantía</Label>
                    <Input id="guarantee" placeholder="Ahorros 90%" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minAmount">Monto mínimo</Label>
                    <Input id="minAmount" type="number" placeholder="500000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAmount">Monto máximo</Label>
                    <Input id="maxAmount" type="number" placeholder="50000000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minTerm">Plazo mínimo (meses)</Label>
                    <Input id="minTerm" type="number" placeholder="6" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxTerm">Plazo máximo (meses)</Label>
                    <Input id="maxTerm" type="number" placeholder="60" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Línea</TableHead>
                <TableHead className="text-right">Tasa m.v.</TableHead>
                <TableHead className="text-right">Monto Mín.</TableHead>
                <TableHead className="text-right">Monto Máx.</TableHead>
                <TableHead className="text-center">Plazo</TableHead>
                <TableHead>Garantía</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id} className={!line.active ? "opacity-60" : ""}>
                  <TableCell className="font-medium">{line.name}</TableCell>
                  <TableCell className="text-right">{line.rate}%</TableCell>
                  <TableCell className="text-right">{formatCurrency(line.minAmount)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(line.maxAmount)}</TableCell>
                  <TableCell className="text-center">
                    {line.minTerm} - {line.maxTerm} meses
                  </TableCell>
                  <TableCell>{line.guarantee}</TableCell>
                  <TableCell className="text-center">
                    <Switch checked={line.active} onCheckedChange={() => toggleLine(line.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Límites de Endeudamiento</CardTitle>
            <CardDescription>Configure los límites generales de crédito por asociado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Máximo sobre ahorros</p>
                <p className="text-sm text-muted-foreground">Porcentaje máximo del total de ahorros</p>
              </div>
              <Badge variant="secondary">200%</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Máximo sobre salario</p>
                <p className="text-sm text-muted-foreground">Veces el salario mensual</p>
              </div>
              <Badge variant="secondary">4x</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">Capacidad de pago</p>
                <p className="text-sm text-muted-foreground">Máximo de cuota sobre salario</p>
              </div>
              <Badge variant="secondary">50%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Flujo de Aprobación</CardTitle>
            <CardDescription>Niveles de aprobación según monto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">Hasta $5,000,000</p>
                <p className="text-sm text-muted-foreground">Aprobación automática</p>
              </div>
              <Badge>Automático</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">$5,000,001 - $20,000,000</p>
                <p className="text-sm text-muted-foreground">Comité de crédito</p>
              </div>
              <Badge variant="secondary">Nivel 1</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium">Mayor a $20,000,000</p>
                <p className="text-sm text-muted-foreground">Junta directiva</p>
              </div>
              <Badge variant="outline">Nivel 2</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
