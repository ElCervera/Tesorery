"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Plus, Building2, CreditCard, TrendingUp, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const accounts = [
  {
    id: 1,
    banco: "Bancolombia",
    tipo: "Ahorros",
    numero: "****4521",
    saldo: 850000000,
    estado: "Activa",
    ultimaConciliacion: "15/12/2025",
    color: "#FDDA24",
  },
  {
    id: 2,
    banco: "Davivienda",
    tipo: "Corriente",
    numero: "****7832",
    saldo: 320000000,
    estado: "Activa",
    ultimaConciliacion: "14/12/2025",
    color: "#E31837",
  },
  {
    id: 3,
    banco: "Banco de Bogotá",
    tipo: "CDT",
    numero: "****2156",
    saldo: 250000000,
    estado: "Activa",
    ultimaConciliacion: "10/12/2025",
    color: "#003399",
  },
  {
    id: 4,
    banco: "BBVA",
    tipo: "Ahorros",
    numero: "****9087",
    saldo: 120000000,
    estado: "Activa",
    ultimaConciliacion: "12/12/2025",
    color: "#004481",
  },
]

export function BankAccounts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const totalSaldo = accounts.reduce((sum, acc) => sum + acc.saldo, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${(totalSaldo / 1000000000).toFixed(2)}B</div>
            <p className="text-xs text-muted-foreground mt-1">En {accounts.length} cuentas activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cuentas Activas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accounts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Todas conciliadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimientos CDT</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8.5% EA</div>
            <p className="text-xs text-muted-foreground mt-1">Tasa promedio actual</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Cuentas Bancarias</CardTitle>
              <CardDescription>Administración de cuentas del fondo</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Cuenta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Agregar Cuenta Bancaria</DialogTitle>
                  <DialogDescription>Registre una nueva cuenta bancaria para el fondo</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Banco</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar banco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bancolombia">Bancolombia</SelectItem>
                        <SelectItem value="davivienda">Davivienda</SelectItem>
                        <SelectItem value="bogota">Banco de Bogotá</SelectItem>
                        <SelectItem value="bbva">BBVA</SelectItem>
                        <SelectItem value="popular">Banco Popular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tipo de Cuenta</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ahorros">Ahorros</SelectItem>
                          <SelectItem value="corriente">Corriente</SelectItem>
                          <SelectItem value="cdt">CDT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Número de Cuenta</Label>
                      <Input placeholder="Número completo" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Saldo Inicial</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(false)}>
                    Agregar Cuenta
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {accounts.map((account) => (
              <Card key={account.id} className="border-l-4" style={{ borderLeftColor: account.color }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: account.color }}
                      >
                        {account.banco.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold">{account.banco}</h4>
                        <p className="text-sm text-muted-foreground">
                          {account.tipo} • {account.numero}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver movimientos</DropdownMenuItem>
                        <DropdownMenuItem>Conciliar</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">${(account.saldo / 1000000).toFixed(0)}M</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Última conciliación: {account.ultimaConciliacion}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {account.estado}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
