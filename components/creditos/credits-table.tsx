"use client"

import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MoreHorizontal, Eye, FileText, RefreshCw, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/auth-context"

const credits = [
  {
    id: "CRE-2024-001",
    associate: "Juan Carlos Pérez García",
    document: "1.023.456.789",
    type: "Libre Inversión",
    originalAmount: "$10,000,000",
    balance: "$6,800,000",
    paidPercent: 32,
    monthlyPayment: "$520,000",
    rate: "1.2%",
    term: "24 meses",
    remainingTerm: "16 meses",
    nextPayment: "15/01/2025",
    status: "Vigente",
    daysOverdue: 0,
    companyId: "EMP001",
  },
  {
    id: "CRE-2024-002",
    associate: "María Fernanda García López",
    document: "52.789.456",
    type: "Educación",
    originalAmount: "$8,000,000",
    balance: "$5,200,000",
    paidPercent: 35,
    monthlyPayment: "$420,000",
    rate: "0.9%",
    term: "24 meses",
    remainingTerm: "14 meses",
    nextPayment: "20/01/2025",
    status: "Vigente",
    daysOverdue: 0,
    companyId: "EMP001",
  },
  {
    id: "CRE-2023-089",
    associate: "Carlos Alberto Rodríguez Mesa",
    document: "79.456.123",
    type: "Vivienda",
    originalAmount: "$50,000,000",
    balance: "$38,500,000",
    paidPercent: 23,
    monthlyPayment: "$1,250,000",
    rate: "1.0%",
    term: "60 meses",
    remainingTerm: "48 meses",
    nextPayment: "05/01/2025",
    status: "En mora",
    daysOverdue: 15,
    companyId: "EMP002",
  },
  {
    id: "CRE-2024-015",
    associate: "Ana María Martínez Ruiz",
    document: "1.098.765.432",
    type: "Vehículo",
    originalAmount: "$25,000,000",
    balance: "$18,750,000",
    paidPercent: 25,
    monthlyPayment: "$890,000",
    rate: "1.1%",
    term: "36 meses",
    remainingTerm: "27 meses",
    nextPayment: "10/01/2025",
    status: "Vigente",
    daysOverdue: 0,
    companyId: "EMP001",
  },
  {
    id: "CRE-2023-156",
    associate: "Roberto José Hernández Silva",
    document: "80.123.456",
    type: "Calamidad",
    originalAmount: "$5,000,000",
    balance: "$0",
    paidPercent: 100,
    monthlyPayment: "$0",
    rate: "0.8%",
    term: "12 meses",
    remainingTerm: "0 meses",
    nextPayment: "-",
    status: "Cancelado",
    daysOverdue: 0,
    companyId: "EMP002",
  },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Vigente":
      return "default"
    case "En mora":
      return "destructive"
    case "Cancelado":
      return "secondary"
    default:
      return "outline"
  }
}

export function CreditsTable() {
  const { user } = useAuth()
  
  const filteredCredits = credits.filter(credit => {
    if (user?.role === "Empresa") {
      return credit.companyId === user.companyId
    }
    return true
  })
  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID / Asociado</TableHead>
              <TableHead>Línea</TableHead>
              <TableHead>Monto Original</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead>Cuota</TableHead>
              <TableHead>Próx. Pago</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCredits.map((credit) => (
              <TableRow key={credit.id}>
                <TableCell>
                  <div>
                    <p className="font-mono text-sm font-medium">{credit.id}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">{credit.associate}</p>
                  </div>
                </TableCell>
                <TableCell>{credit.type}</TableCell>
                <TableCell className="font-medium">{credit.originalAmount}</TableCell>
                <TableCell className="font-medium">{credit.balance}</TableCell>
                <TableCell>
                  <div className="w-24 space-y-1">
                    <Progress value={credit.paidPercent} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center">{credit.paidPercent}% pagado</p>
                  </div>
                </TableCell>
                <TableCell>{credit.monthlyPayment}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{credit.nextPayment}</p>
                    {credit.daysOverdue > 0 && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {credit.daysOverdue} días
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(credit.status)}>{credit.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/creditos/${credit.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalle
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Plan de pagos
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reestructurar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <p className="text-sm text-muted-foreground">Mostrando 1-5 de 1,234 créditos</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Siguiente
          </Button>
        </div>
      </div>
    </Card>
  )
}
