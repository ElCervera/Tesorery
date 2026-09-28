"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, TrendingUp } from "lucide-react"
import Link from "next/link"

const savingsLines = [
  {
    id: 1,
    name: "Ahorro Permanente",
    totalBalance: "$450,000,000",
    associatesCount: 1089,
    rate: "4.5%",
    monthlyGrowth: "+$25M",
    status: "active",
  },
  {
    id: 2,
    name: "Ahorro Voluntario",
    totalBalance: "$280,000,000",
    associatesCount: 756,
    rate: "5.2%",
    monthlyGrowth: "+$18M",
    status: "active",
  },
  {
    id: 3,
    name: "Ahorro Programado",
    totalBalance: "$95,000,000",
    associatesCount: 324,
    rate: "6.0%",
    monthlyGrowth: "+$8M",
    status: "active",
  },
  {
    id: 4,
    name: "CDAT",
    totalBalance: "$65,000,000",
    associatesCount: 89,
    rate: "7.5%",
    monthlyGrowth: "+$4M",
    status: "active",
  },
]

export function SavingsLinesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Líneas de Ahorro</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Línea</TableHead>
              <TableHead className="text-right">Saldo Total</TableHead>
              <TableHead className="text-center">Asociados</TableHead>
              <TableHead className="text-right">Tasa EA</TableHead>
              <TableHead className="text-right">Crecimiento</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savingsLines.map((line) => (
              <TableRow key={line.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-medium">{line.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold">{line.totalBalance}</TableCell>
                <TableCell className="text-center">{line.associatesCount}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">{line.rate}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-green-600 flex items-center justify-end gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {line.monthlyGrowth}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/dashboard/ahorros/linea/${line.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
