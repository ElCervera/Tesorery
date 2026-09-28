"use client"

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  RefreshCcw,
  Search,
} from "lucide-react"

function ConciliacionContent() {
  const movimientosBanco = [
    {
      id: 1,
      fecha: "2024-01-15",
      descripcion: "Transferencia recibida - ABC Corp",
      monto: 5250000,
      tipo: "credito",
      estado: "conciliado",
    },
    {
      id: 2,
      fecha: "2024-01-15",
      descripcion: "Pago nómina descuentos",
      monto: -3200000,
      tipo: "debito",
      estado: "conciliado",
    },
    {
      id: 3,
      fecha: "2024-01-14",
      descripcion: "Desembolso crédito #1234",
      monto: -8500000,
      tipo: "debito",
      estado: "pendiente",
    },
    {
      id: 4,
      fecha: "2024-01-14",
      descripcion: "Consignación efectivo",
      monto: 1500000,
      tipo: "credito",
      estado: "pendiente",
    },
    {
      id: 5,
      fecha: "2024-01-13",
      descripcion: "Comisión bancaria",
      monto: -45000,
      tipo: "debito",
      estado: "diferencia",
    },
    {
      id: 6,
      fecha: "2024-01-13",
      descripcion: "Intereses ganados",
      monto: 125000,
      tipo: "credito",
      estado: "conciliado",
    },
  ]

  const movimientosLibros = [
    {
      id: 1,
      fecha: "2024-01-15",
      descripcion: "Abono cuotas crédito - Empresa ABC",
      monto: 5250000,
      tipo: "credito",
      conciliado: true,
    },
    {
      id: 2,
      fecha: "2024-01-15",
      descripcion: "Descuento nómina Enero",
      monto: -3200000,
      tipo: "debito",
      conciliado: true,
    },
    {
      id: 3,
      fecha: "2024-01-14",
      descripcion: "Desembolso crédito María García",
      monto: -8500000,
      tipo: "debito",
      conciliado: false,
    },
    {
      id: 4,
      fecha: "2024-01-14",
      descripcion: "Depósito ahorros varios",
      monto: 1500000,
      tipo: "credito",
      conciliado: false,
    },
    { id: 5, fecha: "2024-01-13", descripcion: "Gastos bancarios", monto: -42000, tipo: "debito", conciliado: false },
    {
      id: 6,
      fecha: "2024-01-13",
      descripcion: "Rendimientos financieros",
      monto: 125000,
      tipo: "credito",
      conciliado: true,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conciliación Bancaria</h1>
          <p className="text-muted-foreground">Compare y concilie movimientos bancarios con los registros contables</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Cargar Extracto
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Conciliar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Banco</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$45,250,000</div>
            <p className="text-xs text-muted-foreground mt-1">Según extracto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Libros</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,247,000</div>
            <p className="text-xs text-muted-foreground mt-1">Según contabilidad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diferencia</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">$3,000</div>
            <p className="text-xs text-muted-foreground mt-1">Por conciliar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conciliados</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85%</div>
            <p className="text-xs text-muted-foreground mt-1">4 de 6 movimientos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Parámetros de Conciliación</CardTitle>
              <CardDescription>Seleccione el período y cuenta a conciliar</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Cuenta Bancaria</Label>
              <Select defaultValue="bancolombia">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bancolombia">Bancolombia - 123456789</SelectItem>
                  <SelectItem value="davivienda">Davivienda - 987654321</SelectItem>
                  <SelectItem value="bogota">Banco Bogotá - 456789123</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Fecha Desde</Label>
              <Input type="date" defaultValue="2024-01-01" />
            </div>
            <div className="space-y-2">
              <Label>Fecha Hasta</Label>
              <Input type="date" defaultValue="2024-01-15" />
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full bg-transparent">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="comparacion" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="comparacion">Comparación</TabsTrigger>
          <TabsTrigger value="banco">Extracto Banco</TabsTrigger>
          <TabsTrigger value="libros">Libros Contables</TabsTrigger>
        </TabsList>

        <TabsContent value="comparacion">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Movimientos Banco</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movimientosBanco.map((mov) => (
                      <TableRow key={mov.id}>
                        <TableCell>
                          <Checkbox checked={mov.estado === "conciliado"} />
                        </TableCell>
                        <TableCell className="text-sm">{mov.fecha}</TableCell>
                        <TableCell className="text-sm max-w-[150px] truncate">{mov.descripcion}</TableCell>
                        <TableCell
                          className={`text-right font-medium ${mov.monto > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ${Math.abs(mov.monto).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {mov.estado === "conciliado" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          {mov.estado === "pendiente" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                          {mov.estado === "diferencia" && <XCircle className="h-4 w-4 text-red-500" />}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Movimientos Libros</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movimientosLibros.map((mov) => (
                      <TableRow key={mov.id}>
                        <TableCell>
                          <Checkbox checked={mov.conciliado} />
                        </TableCell>
                        <TableCell className="text-sm">{mov.fecha}</TableCell>
                        <TableCell className="text-sm max-w-[150px] truncate">{mov.descripcion}</TableCell>
                        <TableCell
                          className={`text-right font-medium ${mov.monto > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          ${Math.abs(mov.monto).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {mov.conciliado ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="banco">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Extracto Bancario</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientosBanco.map((mov) => (
                    <TableRow key={mov.id}>
                      <TableCell>{mov.fecha}</TableCell>
                      <TableCell>{mov.descripcion}</TableCell>
                      <TableCell>
                        <Badge variant={mov.tipo === "credito" ? "default" : "secondary"}>
                          {mov.tipo === "credito" ? "Crédito" : "Débito"}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${mov.monto > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        ${Math.abs(mov.monto).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            mov.estado === "conciliado"
                              ? "default"
                              : mov.estado === "pendiente"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {mov.estado === "conciliado"
                            ? "Conciliado"
                            : mov.estado === "pendiente"
                              ? "Pendiente"
                              : "Diferencia"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="libros">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Registros Contables</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                    <TableHead>Conciliado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {movimientosLibros.map((mov) => (
                    <TableRow key={mov.id}>
                      <TableCell>{mov.fecha}</TableCell>
                      <TableCell>{mov.descripcion}</TableCell>
                      <TableCell>
                        <Badge variant={mov.tipo === "credito" ? "default" : "secondary"}>
                          {mov.tipo === "credito" ? "Crédito" : "Débito"}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${mov.monto > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        ${Math.abs(mov.monto).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {mov.conciliado ? (
                          <Badge className="bg-green-100 text-green-700">Sí</Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </TableCell>
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

export default function ConciliacionPage() {
  return (
    <Suspense fallback={null}>
      <ConciliacionContent />
    </Suspense>
  )
}