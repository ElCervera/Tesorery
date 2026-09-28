"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  Search,
} from "lucide-react"

const movimientos = [
  {
    id: 1,
    fecha: "2024-01-15",
    tipo: "ingreso",
    categoria: "Cuotas Crédito",
    descripcion: "Abono cuotas Empresa ABC",
    monto: 5250000,
    cuenta: "Bancolombia",
    usuario: "Sistema",
  },
  {
    id: 2,
    fecha: "2024-01-15",
    tipo: "ingreso",
    categoria: "Aportes",
    descripcion: "Descuento nómina Enero",
    monto: 3200000,
    cuenta: "Bancolombia",
    usuario: "Sistema",
  },
  {
    id: 3,
    fecha: "2024-01-14",
    tipo: "egreso",
    categoria: "Desembolso Crédito",
    descripcion: "Crédito María García #1234",
    monto: 8500000,
    cuenta: "Bancolombia",
    usuario: "Juan Pérez",
  },
  {
    id: 4,
    fecha: "2024-01-14",
    tipo: "ingreso",
    categoria: "Ahorros",
    descripcion: "Depósito ahorros programados",
    monto: 1500000,
    cuenta: "Davivienda",
    usuario: "Sistema",
  },
  {
    id: 5,
    fecha: "2024-01-13",
    tipo: "egreso",
    categoria: "Gastos Operativos",
    descripcion: "Pago servicios públicos",
    monto: 850000,
    cuenta: "Bancolombia",
    usuario: "Admin",
  },
  {
    id: 6,
    fecha: "2024-01-13",
    tipo: "egreso",
    categoria: "Comisiones",
    descripcion: "Comisión bancaria mensual",
    monto: 45000,
    cuenta: "Bancolombia",
    usuario: "Sistema",
  },
  {
    id: 7,
    fecha: "2024-01-12",
    tipo: "ingreso",
    categoria: "Rendimientos",
    descripcion: "Intereses CDT vencido",
    monto: 125000,
    cuenta: "Davivienda",
    usuario: "Sistema",
  },
  {
    id: 8,
    fecha: "2024-01-12",
    tipo: "egreso",
    categoria: "Retiro Ahorros",
    descripcion: "Retiro Carlos Rodríguez",
    monto: 2000000,
    cuenta: "Bancolombia",
    usuario: "Ana López",
  },
]

const categoriasIngreso = ["Cuotas Crédito", "Aportes", "Ahorros", "Rendimientos", "Otros Ingresos"]
const categoriasEgreso = ["Desembolso Crédito", "Retiro Ahorros", "Gastos Operativos", "Comisiones", "Otros Egresos"]

function MovimientosContent() {
  const [isIngresoDialogOpen, setIsIngresoDialogOpen] = useState(false)
  const [isEgresoDialogOpen, setIsEgresoDialogOpen] = useState(false)

  const totalIngresos = movimientos.filter((m) => m.tipo === "ingreso").reduce((sum, m) => sum + m.monto, 0)
  const totalEgresos = movimientos.filter((m) => m.tipo === "egreso").reduce((sum, m) => sum + m.monto, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ingresos y Egresos</h1>
          <p className="text-muted-foreground">Registro y control de todos los movimientos de efectivo</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isIngresoDialogOpen} onOpenChange={setIsIngresoDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent">
                <ArrowUpCircle className="h-4 w-4 mr-2" />
                Nuevo Ingreso
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-green-600">Registrar Ingreso</DialogTitle>
                <DialogDescription>Registre un nuevo ingreso de efectivo</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label>Monto</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriasIngreso.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase().replace(" ", "-")}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cuenta Bancaria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione cuenta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bancolombia">Bancolombia - 123456789</SelectItem>
                      <SelectItem value="davivienda">Davivienda - 987654321</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Detalle del ingreso" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsIngresoDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsIngresoDialogOpen(false)}>
                  Registrar Ingreso
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isEgresoDialogOpen} onOpenChange={setIsEgresoDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent">
                <ArrowDownCircle className="h-4 w-4 mr-2" />
                Nuevo Egreso
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-red-600">Registrar Egreso</DialogTitle>
                <DialogDescription>Registre un nuevo egreso de efectivo</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Fecha</Label>
                    <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label>Monto</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriasEgreso.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase().replace(" ", "-")}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cuenta Bancaria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione cuenta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bancolombia">Bancolombia - 123456789</SelectItem>
                      <SelectItem value="davivienda">Davivienda - 987654321</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Detalle del egreso" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEgresoDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsEgresoDialogOpen(false)}>
                  Registrar Egreso
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ingresos</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIngresos.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Este período</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Egresos</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalEgresos.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Este período</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance Neto</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${totalIngresos - totalEgresos >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              ${(totalIngresos - totalEgresos).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ingresos - Egresos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Movimientos</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{movimientos.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Registrados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>Filtre los movimientos por fecha, tipo o categoría</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="space-y-2">
              <Label>Fecha Desde</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Fecha Hasta</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
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
              <Label>Cuenta</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="bancolombia">Bancolombia</SelectItem>
                  <SelectItem value="davivienda">Davivienda</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          <TabsTrigger value="egresos">Egresos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Cuenta</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead>Usuario</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientos.map((mov) => (
                    <TableRow key={mov.id}>
                      <TableCell>{mov.fecha}</TableCell>
                      <TableCell>
                        {mov.tipo === "ingreso" ? (
                          <Badge className="bg-green-100 text-green-700">
                            <ArrowUpCircle className="h-3 w-3 mr-1" />
                            Ingreso
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">
                            <ArrowDownCircle className="h-3 w-3 mr-1" />
                            Egreso
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{mov.categoria}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{mov.descripcion}</TableCell>
                      <TableCell>{mov.cuenta}</TableCell>
                      <TableCell
                        className={`text-right font-medium ${mov.tipo === "ingreso" ? "text-green-600" : "text-red-600"}`}
                      >
                        {mov.tipo === "ingreso" ? "+" : "-"}${mov.monto.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{mov.usuario}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ingresos">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Cuenta</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead>Usuario</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientos
                    .filter((m) => m.tipo === "ingreso")
                    .map((mov) => (
                      <TableRow key={mov.id}>
                        <TableCell>{mov.fecha}</TableCell>
                        <TableCell>{mov.categoria}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{mov.descripcion}</TableCell>
                        <TableCell>{mov.cuenta}</TableCell>
                        <TableCell className="text-right font-medium text-green-600">
                          +${mov.monto.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{mov.usuario}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="egresos">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Cuenta</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead>Usuario</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientos
                    .filter((m) => m.tipo === "egreso")
                    .map((mov) => (
                      <TableRow key={mov.id}>
                        <TableCell>{mov.fecha}</TableCell>
                        <TableCell>{mov.categoria}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{mov.descripcion}</TableCell>
                        <TableCell>{mov.cuenta}</TableCell>
                        <TableCell className="text-right font-medium text-red-600">
                          -${mov.monto.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{mov.usuario}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function MovimientosPage() {
  return (
    <Suspense fallback={null}>
      <MovimientosContent />
    </Suspense>
  )
}
