"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Plus, Shield, Users, Edit, Trash2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const roles = [
  {
    id: 1,
    nombre: "Administrador",
    descripcion: "Acceso total al sistema",
    usuarios: 1,
    permisos: {
      asociados: ["ver", "crear", "editar", "eliminar"],
      creditos: ["ver", "crear", "editar", "eliminar"],
      ahorros: ["ver", "crear", "editar", "eliminar"],
      tesoreria: ["ver", "crear", "editar", "eliminar"],
      reportes: ["ver", "exportar"],
      configuracion: ["ver", "editar"],
    },
  },
  {
    id: 2,
    nombre: "Tesorero",
    descripcion: "Gestión de tesorería y flujo de caja",
    usuarios: 1,
    permisos: {
      asociados: ["ver"],
      creditos: ["ver", "crear"],
      ahorros: ["ver", "crear", "editar"],
      tesoreria: ["ver", "crear", "editar"],
      reportes: ["ver", "exportar"],
      configuracion: [],
    },
  },
  {
    id: 3,
    nombre: "Analista",
    descripcion: "Gestión de asociados y créditos",
    usuarios: 1,
    permisos: {
      asociados: ["ver", "crear", "editar"],
      creditos: ["ver", "crear", "editar"],
      ahorros: ["ver"],
      tesoreria: [],
      reportes: ["ver"],
      configuracion: [],
    },
  },
  {
    id: 4,
    nombre: "Consulta",
    descripcion: "Solo lectura en todos los módulos",
    usuarios: 1,
    permisos: {
      asociados: ["ver"],
      creditos: ["ver"],
      ahorros: ["ver"],
      tesoreria: ["ver"],
      reportes: ["ver"],
      configuracion: [],
    },
  },
]

const modules = [
  { key: "asociados", label: "Asociados", permissions: ["ver", "crear", "editar", "eliminar"] },
  { key: "creditos", label: "Créditos", permissions: ["ver", "crear", "editar", "eliminar", "aprobar"] },
  { key: "ahorros", label: "Ahorros", permissions: ["ver", "crear", "editar", "eliminar"] },
  { key: "tesoreria", label: "Tesorería", permissions: ["ver", "crear", "editar", "conciliar"] },
  { key: "reportes", label: "Reportes", permissions: ["ver", "exportar"] },
  { key: "configuracion", label: "Configuración", permissions: ["ver", "editar"] },
]

export function RolesSettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Roles y Permisos</CardTitle>
              <CardDescription>Configure los niveles de acceso al sistema</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Rol
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Rol</DialogTitle>
                  <DialogDescription>Define los permisos para el nuevo rol</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nombre del Rol</Label>
                      <Input placeholder="Ej: Supervisor" />
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Input placeholder="Descripción del rol" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Permisos por Módulo</Label>
                    {modules.map((module) => (
                      <div key={module.key} className="p-3 rounded-lg bg-secondary/50">
                        <p className="font-medium mb-2">{module.label}</p>
                        <div className="flex flex-wrap gap-4">
                          {module.permissions.map((perm) => (
                            <div key={perm} className="flex items-center gap-2">
                              <Checkbox id={`${module.key}-${perm}`} />
                              <label htmlFor={`${module.key}-${perm}`} className="text-sm capitalize">
                                {perm}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((rol) => (
              <Card key={rol.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{rol.nombre}</h4>
                        <p className="text-sm text-muted-foreground">{rol.descripcion}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {rol.usuarios}
                    </Badge>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="permisos" className="border-none">
                      <AccordionTrigger className="text-sm py-2 hover:no-underline">Ver permisos</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          {Object.entries(rol.permisos).map(([modulo, perms]) => (
                            <div key={modulo} className="flex items-center justify-between text-sm">
                              <span className="capitalize text-muted-foreground">{modulo}</span>
                              <div className="flex gap-1">
                                {(perms as string[]).length > 0 ? (
                                  (perms as string[]).map((p) => (
                                    <Badge key={p} variant="secondary" className="text-xs capitalize">
                                      {p}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-xs text-muted-foreground">Sin acceso</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex gap-2 mt-3 pt-3 border-t">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    {rol.nombre !== "Administrador" && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
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
