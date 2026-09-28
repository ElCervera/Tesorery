"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Download, Filter, ArrowDownLeft, ArrowUpRight } from "lucide-react"

const movements = [
  {
    id: 1,
    fecha: "15/12/2025",
    tipo: "Ingreso",
    categoria: "Nómina",
    concepto: "Descuentos nómina Diciembre",
    cuenta: "Bancolombia",
    monto: 245000000,
    estado: "Aplicado",
  },
  {
    id: 2,
    fecha: "14/12/2025",
    tipo: "Egreso",
    categoria: "Créditos",
    concepto: "Desembolso crédito #4521 - Carlos Martínez",
    cuenta: "Davivienda",
    monto: 35000000,
    estado: "Aplicado",
  },
  {
    id: 3,
    fecha: "14/12/2025",
    tipo: "Ingreso",
    categoria: "Créditos",
    concepto: "Abono crédito #3892 - María López",
    cuenta: "Bancolombia",
    monto: 1500000,
    estado: "Aplicado",
  },
  {
    id: 4,
    fecha: "13/12/2025",
    tipo: "Egreso",
    categoria: "Ahorros",
    concepto: "Retiro ahorro permanente - Juan Pérez",
    cuenta: "Bancolombia",
    monto: 8000000,
    estado: "Aplicado",
  },
  {
    id: 5,
    fecha: "12/12/2025",
    tipo: "Ingreso",
    categoria: "Rendimientos",
    concepto: "Rendimientos CDT Banco Bogotá",
    cuenta: "Banco de Bogotá",
    monto: 12500000,
    estado: "Aplicado",
  },
  {
    id: 6,
    fecha: "11/12/2025",
    tipo: "Egreso",
    categoria: "Gastos",
    concepto: "Pago servicios administrativos",
    cuenta: "Bancolombia",
    monto: 3200000,
    estado: "Aplicado",
  },
  {
    id: 7,
    fecha: "10/12/2025",
    tipo: "Ingreso",
    categoria: "Aportes",
    concepto: "Aportes extraordinarios asociados",
    cuenta: "Davivienda",
    monto: 15800000,
    estado: "Pendiente",
  },
]

export function CashFlow() {
  const [showFilters, setShowFilters] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Flujo de Caja</CardTitle>
              <CardDescription>Registro de todos los movimientos de tesorería</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Movimiento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Registrar Movimiento</DialogTitle>
                    <DialogDescription>Ingrese los datos del nuevo movimiento de tesorería</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ingreso">Ingreso</SelectItem>
                            <SelectItem value="egreso">Egreso</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Categoría</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nomina">Nómina</SelectItem>
                            <SelectItem value="creditos">Créditos</SelectItem>
                            <SelectItem value="ahorros">Ahorros</SelectItem>
                            <SelectItem value="rendimientos">Rendimientos</SelectItem>
                            <SelectItem value="gastos">Gastos</SelectItem>
                            <SelectItem value="aportes">Aportes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Cuenta Bancaria</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cuenta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bancolombia">Bancolombia - Ahorros</SelectItem>
                          <SelectItem value="davivienda">Davivienda - Corriente</SelectItem>
                          <SelectItem value="bogota">Banco de Bogotá - CDT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Monto</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Concepto</Label>
                      <Textarea placeholder="Descripción del movimiento" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(false)}>
                      Registrar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showFilters && (
            <div className="grid gap-4 p-4 rounded-lg bg-secondary/50 md:grid-cols-4">
              <div className="space-y-2">
                <Label className="text-xs">Fecha Desde</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Fecha Hasta</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="ingreso">Ingresos</SelectItem>
                    <SelectItem value="egreso">Egresos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="nomina">Nómina</SelectItem>
                    <SelectItem value="creditos">Créditos</SelectItem>
                    <SelectItem value="ahorros">Ahorros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((mov) => (
                  <TableRow key={mov.id}>
                    <TableCell className="font-medium">{mov.fecha}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {mov.tipo === "Ingreso" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                        <span className={mov.tipo === "Ingreso" ? "text-green-600" : "text-red-600"}>{mov.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{mov.categoria}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{mov.concepto}</TableCell>
                    <TableCell>{mov.cuenta}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${mov.tipo === "Ingreso" ? "text-green-600" : "text-red-600"}`}
                    >
                      {mov.tipo === "Ingreso" ? "+" : "-"}${(mov.monto / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={mov.estado === "Aplicado" ? "default" : "secondary"}
                        className={mov.estado === "Aplicado" ? "bg-primary" : ""}
                      >
                        {mov.estado}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
