"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, FileSpreadsheet, CheckCircle2, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const payrollHistory = [
  {
    id: 1,
    periodo: "Diciembre 2025",
    empresa: "Empresa ABC S.A.S",
    asociados: 245,
    total: 245000000,
    estado: "Aplicado",
    fecha: "15/12/2025",
  },
  {
    id: 2,
    periodo: "Noviembre 2025",
    empresa: "Empresa ABC S.A.S",
    asociados: 243,
    total: 238500000,
    estado: "Aplicado",
    fecha: "15/11/2025",
  },
  {
    id: 3,
    periodo: "Octubre 2025",
    empresa: "Empresa ABC S.A.S",
    asociados: 240,
    total: 235000000,
    estado: "Aplicado",
    fecha: "15/10/2025",
  },
  {
    id: 4,
    periodo: "Diciembre 2025",
    empresa: "Comercial XYZ",
    asociados: 89,
    total: 78500000,
    estado: "Pendiente",
    fecha: "Pendiente",
  },
]

const discountDetail = [
  {
    cedula: "1.234.567",
    nombre: "Carlos Martínez",
    ahorroPermanente: 450000,
    ahorroVoluntario: 200000,
    cuotaCredito: 850000,
    total: 1500000,
  },
  {
    cedula: "2.345.678",
    nombre: "María López",
    ahorroPermanente: 380000,
    ahorroVoluntario: 0,
    cuotaCredito: 1200000,
    total: 1580000,
  },
  {
    cedula: "3.456.789",
    nombre: "Juan Pérez",
    ahorroPermanente: 520000,
    ahorroVoluntario: 350000,
    cuotaCredito: 0,
    total: 870000,
  },
  {
    cedula: "4.567.890",
    nombre: "Ana García",
    ahorroPermanente: 400000,
    ahorroVoluntario: 150000,
    cuotaCredito: 650000,
    total: 1200000,
  },
  {
    cedula: "5.678.901",
    nombre: "Luis Rodríguez",
    ahorroPermanente: 480000,
    ahorroVoluntario: 0,
    cuotaCredito: 920000,
    total: 1400000,
  },
]

export function PayrollDiscounts() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Descuentos del Mes</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$323.5M</div>
            <p className="text-xs text-muted-foreground mt-1">334 asociados afectados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nóminas Procesadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-xs text-muted-foreground mt-1">De 2 empresas este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">1</div>
            <p className="text-xs text-muted-foreground mt-1">Comercial XYZ pendiente</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="upload">Cargar Nómina</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="detail">Detalle Actual</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Cargar Archivo de Nómina</CardTitle>
              <CardDescription>Suba el archivo de descuentos de nómina en formato Excel o CSV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar empresa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abc">Empresa ABC S.A.S</SelectItem>
                      <SelectItem value="xyz">Comercial XYZ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Período</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dic2025">Diciembre 2025</SelectItem>
                      <SelectItem value="ene2026">Enero 2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center bg-primary/5">
                <Upload className="h-12 w-12 mx-auto text-primary/50 mb-4" />
                <h4 className="font-semibold mb-2">Arrastre el archivo aquí</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  o haga clic para seleccionar un archivo Excel (.xlsx) o CSV
                </p>
                <Button variant="outline" onClick={handleUpload}>
                  Seleccionar Archivo
                </Button>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Procesando archivo...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {uploadProgress === 100 && !isUploading && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Archivo cargado exitosamente</p>
                    <p className="text-sm text-green-600">245 registros procesados correctamente</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Plantilla
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90" disabled={uploadProgress !== 100}>
                  Aplicar Descuentos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Nóminas</CardTitle>
              <CardDescription>Registro de todas las nóminas procesadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Período</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead className="text-center">Asociados</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Aplicación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.periodo}</TableCell>
                        <TableCell>{item.empresa}</TableCell>
                        <TableCell className="text-center">{item.asociados}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ${(item.total / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={item.estado === "Aplicado" ? "default" : "secondary"}
                            className={item.estado === "Aplicado" ? "bg-green-600" : "bg-amber-500"}
                          >
                            {item.estado}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.fecha}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Detalle de Descuentos - Diciembre 2025</CardTitle>
                  <CardDescription>Empresa ABC S.A.S • 245 asociados</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cédula</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead className="text-right">Ahorro Perm.</TableHead>
                      <TableHead className="text-right">Ahorro Vol.</TableHead>
                      <TableHead className="text-right">Cuota Crédito</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discountDetail.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.cedula}</TableCell>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell className="text-right">${(item.ahorroPermanente / 1000).toFixed(0)}K</TableCell>
                        <TableCell className="text-right">${(item.ahorroVoluntario / 1000).toFixed(0)}K</TableCell>
                        <TableCell className="text-right">${(item.cuotaCredito / 1000).toFixed(0)}K</TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          ${(item.total / 1000).toFixed(0)}K
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
