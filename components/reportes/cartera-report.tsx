"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const barData = [
  { name: "Vigente", value: 2100 },
  { name: "1-30 días", value: 120 },
  { name: "31-60 días", value: 45 },
  { name: "61-90 días", value: 25 },
  { name: ">90 días", value: 10 },
]

const pieData = [
  { name: "Libre Inversión", value: 45, color: "oklch(0.38 0.08 145)" },
  { name: "Vivienda", value: 25, color: "oklch(0.55 0.12 145)" },
  { name: "Educación", value: 15, color: "oklch(0.65 0.1 85)" },
  { name: "Vehículo", value: 10, color: "oklch(0.75 0.08 145)" },
  { name: "Otros", value: 5, color: "oklch(0.45 0.06 145)" },
]

const carteraData = [
  { linea: "Libre Inversión", vigente: "$945M", mora1: "$25M", mora2: "$8M", mora3: "$3M", total: "$981M" },
  { linea: "Vivienda", vigente: "$525M", mora1: "$12M", mora2: "$4M", mora3: "$1M", total: "$542M" },
  { linea: "Educación", vigente: "$315M", mora1: "$8M", mora2: "$2M", mora3: "$0", total: "$325M" },
  { linea: "Vehículo", vigente: "$210M", mora1: "$5M", mora2: "$1M", mora3: "$0", total: "$216M" },
  { linea: "Calamidad", vigente: "$105M", mora1: "$2M", mora2: "$0", mora3: "$0", total: "$107M" },
]

export function CarteraReport() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label>Fecha de corte</Label>
              <Input type="date" defaultValue="2025-01-02" />
            </div>
            <div className="space-y-2">
              <Label>Línea de crédito</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las líneas</SelectItem>
                  <SelectItem value="libre">Libre Inversión</SelectItem>
                  <SelectItem value="vivienda">Vivienda</SelectItem>
                  <SelectItem value="educacion">Educación</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="vigente">Vigente</SelectItem>
                  <SelectItem value="mora">En mora</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="tech">TechInnovate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Cartera Total</p>
            <p className="text-2xl font-bold">$2,171M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Cartera Vigente</p>
            <p className="text-2xl font-bold text-green-600">$2,100M</p>
            <Badge variant="secondary" className="mt-1">
              96.7%
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Cartera en Mora</p>
            <p className="text-2xl font-bold text-amber-600">$71M</p>
            <Badge variant="secondary" className="mt-1">
              3.3%
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Créditos Activos</p>
            <p className="text-2xl font-bold">1,234</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cartera por Antigüedad de Mora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "oklch(0.45 0.03 145)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 90)" }}
                  />
                  <YAxis
                    tick={{ fill: "oklch(0.45 0.03 145)", fontSize: 12 }}
                    axisLine={{ stroke: "oklch(0.88 0.02 90)" }}
                    tickFormatter={(value) => `$${value}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.99 0.005 90)",
                      border: "1px solid oklch(0.88 0.02 90)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}M`, "Monto"]}
                  />
                  <Bar dataKey="value" fill="oklch(0.38 0.08 145)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribución por Línea</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.99 0.005 90)",
                      border: "1px solid oklch(0.88 0.02 90)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Detalle por Línea de Crédito</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Línea</TableHead>
                <TableHead className="text-right">Vigente</TableHead>
                <TableHead className="text-right">1-30 días</TableHead>
                <TableHead className="text-right">31-60 días</TableHead>
                <TableHead className="text-right">{">"}60 días</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carteraData.map((row) => (
                <TableRow key={row.linea}>
                  <TableCell className="font-medium">{row.linea}</TableCell>
                  <TableCell className="text-right text-green-600">{row.vigente}</TableCell>
                  <TableCell className="text-right text-amber-600">{row.mora1}</TableCell>
                  <TableCell className="text-right text-orange-600">{row.mora2}</TableCell>
                  <TableCell className="text-right text-red-600">{row.mora3}</TableCell>
                  <TableCell className="text-right font-bold">{row.total}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>TOTAL</TableCell>
                <TableCell className="text-right text-green-600">$2,100M</TableCell>
                <TableCell className="text-right text-amber-600">$52M</TableCell>
                <TableCell className="text-right text-orange-600">$15M</TableCell>
                <TableCell className="text-right text-red-600">$4M</TableCell>
                <TableCell className="text-right">$2,171M</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
