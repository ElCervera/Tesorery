import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, PiggyBank, Calendar } from "lucide-react"

const associateData = {
  name: "Juan Carlos Pérez García",
  document: "1.023.456.789",
  email: "juan.perez@empresa.com",
  phone: "300 123 4567",
  company: "Acme Corp",
  type: "Empleado",
  status: "Activo",
  joinDate: "15/03/2020",
}

const savingsData = [
  { type: "Ahorro Permanente", balance: "$8,500,000", rate: "4.5%", lastUpdate: "01/01/2025" },
  { type: "Ahorro Voluntario", balance: "$3,200,000", rate: "5.2%", lastUpdate: "01/01/2025" },
  { type: "Ahorro Programado", balance: "$800,000", rate: "6.0%", lastUpdate: "01/01/2025" },
]

const creditsData = [
  {
    id: "CRE-2024-001",
    type: "Libre Inversión",
    originalAmount: "$10,000,000",
    balance: "$6,800,000",
    monthlyPayment: "$520,000",
    rate: "1.2%",
    nextPayment: "15/01/2025",
    status: "Al día",
  },
  {
    id: "CRE-2023-045",
    type: "Educación",
    originalAmount: "$5,000,000",
    balance: "$1,200,000",
    monthlyPayment: "$380,000",
    rate: "0.9%",
    nextPayment: "15/01/2025",
    status: "Al día",
  },
]

const recentMovements = [
  { date: "28/12/2024", description: "Pago cuota crédito CRE-2024-001", type: "Débito", amount: "-$520,000" },
  { date: "28/12/2024", description: "Pago cuota crédito CRE-2023-045", type: "Débito", amount: "-$380,000" },
  { date: "25/12/2024", description: "Rendimientos ahorro voluntario", type: "Crédito", amount: "+$13,867" },
  { date: "15/12/2024", description: "Aporte ahorro programado", type: "Crédito", amount: "+$200,000" },
  { date: "01/12/2024", description: "Aporte mensual permanente", type: "Crédito", amount: "+$175,000" },
]

export function AccountStatement() {
  const totalSavings = "$12,500,000"
  const totalCredits = "$8,000,000"
  const netBalance = "$4,500,000"

  return (
    <div className="space-y-6">
      {/* Associate Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">JC</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">{associateData.name}</h2>
                <Badge>{associateData.status}</Badge>
              </div>
              <p className="text-muted-foreground">
                CC {associateData.document} • {associateData.type}
              </p>
              <p className="text-sm text-muted-foreground">
                {associateData.email} • {associateData.phone}
              </p>
              <p className="text-sm text-muted-foreground">
                {associateData.company} • Asociado desde {associateData.joinDate}
              </p>
            </div>
            <Separator orientation="vertical" className="hidden md:block h-20" />
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{totalSavings}</p>
                <p className="text-xs text-muted-foreground">Total Ahorros</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{totalCredits}</p>
                <p className="text-xs text-muted-foreground">Total Créditos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">{netBalance}</p>
                <p className="text-xs text-muted-foreground">Saldo Neto</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Savings Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <PiggyBank className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Ahorros</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Línea</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                  <TableHead className="text-right">Tasa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savingsData.map((saving) => (
                  <TableRow key={saving.type}>
                    <TableCell className="font-medium">{saving.type}</TableCell>
                    <TableCell className="text-right">{saving.balance}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{saving.rate}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">{totalSavings}</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Credits Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Créditos Vigentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                  <TableHead className="text-right">Cuota</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditsData.map((credit) => (
                  <TableRow key={credit.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{credit.type}</p>
                        <p className="text-xs text-muted-foreground">{credit.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{credit.balance}</TableCell>
                    <TableCell className="text-right">{credit.monthlyPayment}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">{totalCredits}</TableCell>
                  <TableCell className="text-right font-bold">$900,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Movements */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Movimientos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMovements.map((movement, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{movement.date}</TableCell>
                  <TableCell>{movement.description}</TableCell>
                  <TableCell>
                    <Badge variant={movement.type === "Crédito" ? "default" : "secondary"}>{movement.type}</Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${movement.type === "Crédito" ? "text-green-600" : "text-red-600"}`}
                  >
                    {movement.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
