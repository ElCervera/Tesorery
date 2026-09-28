"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, TrendingUp, Wallet, Building2 } from "lucide-react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  CartesianGrid,
} from "recharts"

const monthlyData = [
  { mes: "Jul", ingresos: 450000000, egresos: 380000000 },
  { mes: "Ago", ingresos: 480000000, egresos: 420000000 },
  { mes: "Sep", ingresos: 520000000, egresos: 450000000 },
  { mes: "Oct", ingresos: 490000000, egresos: 410000000 },
  { mes: "Nov", ingresos: 550000000, egresos: 480000000 },
  { mes: "Dic", ingresos: 580000000, egresos: 520000000 },
]

const balanceData = [
  { mes: "Jul", saldo: 1200000000 },
  { mes: "Ago", saldo: 1260000000 },
  { mes: "Sep", saldo: 1330000000 },
  { mes: "Oct", saldo: 1410000000 },
  { mes: "Nov", saldo: 1480000000 },
  { mes: "Dic", saldo: 1540000000 },
]

export function TreasuryOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$1,540,000,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+4.1%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$580,000,000</div>
            <p className="text-xs text-muted-foreground mt-1">Aportes, abonos créditos, rendimientos</p>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Egresos del Mes</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$520,000,000</div>
            <p className="text-xs text-muted-foreground mt-1">Desembolsos, retiros, gastos operativos</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cuentas Bancarias</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4</div>
            <p className="text-xs text-muted-foreground mt-1">Todas conciliadas al día</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos vs Egresos</CardTitle>
            <CardDescription>Comparativo mensual del semestre</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                <Tooltip
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(0)}M`, ""]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e5e5e5" }}
                />
                <Legend />
                <Bar dataKey="ingresos" name="Ingresos" fill="#16a34a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="egresos" name="Egresos" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolución del Saldo</CardTitle>
            <CardDescription>Crecimiento del patrimonio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={balanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000000).toFixed(1)}B`} />
                <Tooltip
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(0)}M`, "Saldo"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e5e5e5" }}
                />
                <Line
                  type="monotone"
                  dataKey="saldo"
                  stroke="#2D5A3D"
                  strokeWidth={3}
                  dot={{ fill: "#2D5A3D", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movimientos Recientes</CardTitle>
          <CardDescription>Últimas transacciones registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                tipo: "ingreso",
                concepto: "Descuentos nómina Diciembre",
                monto: 245000000,
                fecha: "15/12/2025",
                cuenta: "Bancolombia",
              },
              {
                tipo: "egreso",
                concepto: "Desembolso crédito #4521",
                monto: 35000000,
                fecha: "14/12/2025",
                cuenta: "Davivienda",
              },
              {
                tipo: "ingreso",
                concepto: "Abono crédito María López",
                monto: 1500000,
                fecha: "14/12/2025",
                cuenta: "Bancolombia",
              },
              {
                tipo: "egreso",
                concepto: "Retiro ahorro Juan Pérez",
                monto: 8000000,
                fecha: "13/12/2025",
                cuenta: "Bancolombia",
              },
              {
                tipo: "ingreso",
                concepto: "Rendimientos CDT",
                monto: 12500000,
                fecha: "12/12/2025",
                cuenta: "Banco de Bogotá",
              },
            ].map((mov, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${mov.tipo === "ingreso" ? "bg-green-100" : "bg-red-100"}`}>
                    {mov.tipo === "ingreso" ? (
                      <ArrowDownLeft className={`h-4 w-4 text-green-600`} />
                    ) : (
                      <ArrowUpRight className={`h-4 w-4 text-red-600`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{mov.concepto}</p>
                    <p className="text-xs text-muted-foreground">
                      {mov.cuenta} • {mov.fecha}
                    </p>
                  </div>
                </div>
                <span className={`font-semibold ${mov.tipo === "ingreso" ? "text-green-600" : "text-red-600"}`}>
                  {mov.tipo === "ingreso" ? "+" : "-"}${(mov.monto / 1000000).toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
