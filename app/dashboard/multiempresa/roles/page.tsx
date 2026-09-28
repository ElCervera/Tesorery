"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Shield, Plus, Edit, Trash2, Users, Key } from "lucide-react"
import { useState } from "react"

const roles = [
  {
    id: 1,
    nombre: "Administrador",
    descripcion: "Acceso total al sistema",
    usuarios: 2,
    permisos: ["todos"],
    color: "bg-red-100 text-red-700",
  },
  {
    id: 2,
    nombre: "Gerente de Fondo",
    descripcion: "Gestión completa del fondo de empleados",
    usuarios: 3,
    permisos: ["asociados", "creditos", "ahorros", "reportes", "tesoreria"],
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    nombre: "Analista de Crédito",
    descripcion: "Evaluación y aprobación de créditos",
    usuarios: 5,
    permisos: ["creditos", "asociados.ver", "reportes.cartera"],
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    nombre: "Tesorero",
    descripcion: "Gestión de tesorería y flujo de caja",
    usuarios: 2,
    permisos: ["tesoreria", "reportes.financieros"],
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    nombre: "Consultor",
    descripcion: "Solo lectura de información",
    usuarios: 8,
    permisos: ["reportes.ver"],
    color: "bg-gray-100 text-gray-700",
  },
]

const modulos = [
  {
    nombre: "Asociados",
    permisos: ["Ver", "Crear", "Editar", "Eliminar", "Estados de Cuenta"],
  },
  {
    nombre: "Créditos",
    permisos: ["Ver Cartera", "Crear Solicitud", "Aprobar", "Rechazar", "Parametrizar"],
  },
  {
    nombre: "Ahorros",
    permisos: ["Ver Líneas", "Movimientos", "Certificados", "Parametrizar"],
  },
  {
    nombre: "Reportes",
    permisos: ["Ver Consultas", "Exportar", "Estados de Cuenta", "Cartera"],
  },
  {
    nombre: "Tesorería",
    permisos: ["Flujo de Caja", "Conciliación", "Ingresos/Egresos", "Cuentas Bancarias"],
  },
  {
    nombre: "Configuración",
    permisos: ["General", "Usuarios", "Roles", "Notificaciones"],
  },
]

export default function MultiempresaRolesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Roles y Permisos</h1>
            <p className="text-muted-foreground">Administre los roles y permisos de acceso al sistema</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Rol
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Rol</DialogTitle>
                <DialogDescription>Defina un nuevo rol con sus permisos específicos</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Nombre del Rol</Label>
                  <Input placeholder="Ej: Auxiliar Contable" />
                </div>
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Input placeholder="Descripción breve del rol" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsDialogOpen(false)}>
                  Crear Rol
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{roles.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Roles configurados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Asignados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.reduce((sum, r) => sum + r.usuarios, 0)}</div>
              <p className="text-xs text-muted-foreground mt-1">Con rol asignado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Módulos</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{modulos.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Con permisos configurables</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permisos">Matriz de Permisos</TabsTrigger>
          </TabsList>

          <TabsContent value="roles">
            <Card>
              <CardHeader>
                <CardTitle>Roles del Sistema</CardTitle>
                <CardDescription>Lista de roles disponibles y sus asignaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rol</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead className="text-center">Usuarios</TableHead>
                      <TableHead>Permisos</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((rol) => (
                      <TableRow key={rol.id}>
                        <TableCell>
                          <Badge className={rol.color}>{rol.nombre}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{rol.descripcion}</TableCell>
                        <TableCell className="text-center">
                          <span className="font-medium">{rol.usuarios}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {rol.permisos.length === 1 && rol.permisos[0] === "todos"
                              ? "Acceso completo"
                              : `${rol.permisos.length} permisos`}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permisos">
            <Card>
              <CardHeader>
                <CardTitle>Matriz de Permisos</CardTitle>
                <CardDescription>Configure los permisos detallados para cada módulo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {modulos.map((modulo) => (
                    <div key={modulo.nombre} className="space-y-3">
                      <h4 className="font-semibold text-primary">{modulo.nombre}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {modulo.permisos.map((permiso) => (
                          <div key={permiso} className="flex items-center space-x-2">
                            <Checkbox id={`${modulo.nombre}-${permiso}`} />
                            <Label
                              htmlFor={`${modulo.nombre}-${permiso}`}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {permiso}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">Guardar Permisos</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
    </div>
  )
}