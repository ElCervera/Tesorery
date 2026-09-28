"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"

const creditLines = [
  { id: "libre", name: "Libre Inversión", rate: 1.2, maxTerm: 60, maxAmount: 50000000 },
  { id: "vivienda", name: "Vivienda", rate: 1.0, maxTerm: 120, maxAmount: 200000000 },
  { id: "educacion", name: "Educación", rate: 0.9, maxTerm: 48, maxAmount: 30000000 },
  { id: "vehiculo", name: "Vehículo", rate: 1.1, maxTerm: 60, maxAmount: 80000000 },
  { id: "calamidad", name: "Calamidad", rate: 0.8, maxTerm: 24, maxAmount: 10000000 },
]

export function CreditSimulator() {
  const [amount, setAmount] = useState(10000000)
  const [term, setTerm] = useState(24)
  const [selectedLine, setSelectedLine] = useState("libre")

  const currentLine = creditLines.find((l) => l.id === selectedLine) || creditLines[0]

  const calculatePayment = (principal: number, monthlyRate: number, months: number) => {
    const rate = monthlyRate / 100
    return (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
  }

  const generateAmortization = () => {
    const rows = []
    let balance = amount
    const monthlyPayment = calculatePayment(amount, currentLine.rate, term)

    for (let i = 1; i <= term; i++) {
      const interest = balance * (currentLine.rate / 100)
      const principal = monthlyPayment - interest
      balance -= principal

      rows.push({
        month: i,
        payment: monthlyPayment,
        principal,
        interest,
        balance: Math.max(0, balance),
      })
    }
    return rows
  }

  const amortization = generateAmortization()
  const monthlyPayment = calculatePayment(amount, currentLine.rate, term)
  const totalPayment = monthlyPayment * term
  const totalInterest = totalPayment - amount

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Input Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Parámetros del Crédito</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="creditLine">Línea de crédito</Label>
            <Select value={selectedLine} onValueChange={setSelectedLine}>
              <SelectTrigger id="creditLine">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {creditLines.map((line) => (
                  <SelectItem key={line.id} value={line.id}>
                    {line.name} ({line.rate}% m.v.)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Monto</Label>
              <span className="text-sm font-medium">
                {amount.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
              </span>
            </div>
            <Slider
              value={[amount]}
              onValueChange={([v]) => setAmount(v)}
              min={1000000}
              max={currentLine.maxAmount}
              step={500000}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$1M</span>
              <span>${(currentLine.maxAmount / 1000000).toFixed(0)}M</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Plazo</Label>
              <span className="text-sm font-medium">{term} meses</span>
            </div>
            <Slider value={[term]} onValueChange={([v]) => setTerm(v)} min={6} max={currentLine.maxTerm} step={6} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>6 meses</span>
              <span>{currentLine.maxTerm} meses</span>
            </div>
          </div>

          <div className="pt-4 space-y-3 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tasa mensual</span>
              <span className="font-medium">{currentLine.rate}% m.v.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tasa E.A.</span>
              <span className="font-medium">{((Math.pow(1 + currentLine.rate / 100, 12) - 1) * 100).toFixed(2)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Cuota Mensual</p>
              <p className="text-2xl font-bold text-primary">
                {monthlyPayment.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Total Intereses</p>
              <p className="text-2xl font-bold">
                {totalInterest.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  maximumFractionDigits: 0,
                })}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">Total a Pagar</p>
              <p className="text-2xl font-bold">
                {totalPayment.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Amortization Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Tabla de Amortización</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Printer className="h-4 w-4" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[400px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Cuota</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead className="text-right">Capital</TableHead>
                    <TableHead className="text-right">Interés</TableHead>
                    <TableHead className="text-right">Saldo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortization.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell className="text-center font-mono">{row.month}</TableCell>
                      <TableCell className="text-right">
                        {row.payment.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {row.principal.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {row.interest.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {row.balance.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Line Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Comparación de Líneas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Línea</TableHead>
                  <TableHead className="text-right">Tasa</TableHead>
                  <TableHead className="text-right">Cuota</TableHead>
                  <TableHead className="text-right">Total Intereses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditLines.map((line) => {
                  const payment = calculatePayment(amount, line.rate, Math.min(term, line.maxTerm))
                  const total = payment * Math.min(term, line.maxTerm)
                  return (
                    <TableRow key={line.id} className={line.id === selectedLine ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">{line.name}</TableCell>
                      <TableCell className="text-right">{line.rate}% m.v.</TableCell>
                      <TableCell className="text-right">
                        {payment.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(total - amount).toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        })}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
