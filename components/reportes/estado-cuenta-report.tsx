"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, FileText, Mail, Download, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function EstadoCuentaReport() {
  return (
    <Tabs defaultValue="individual" className="space-y-6">
      <TabsList>
        <TabsTrigger value="individual" className="gap-2">
          <FileText className="h-4 w-4" />
          Individual
        </TabsTrigger>
        <TabsTrigger value="masivo" className="gap-2">
          <Users className="h-4 w-4" />
          Masivo
        </TabsTrigger>
      </TabsList>

      <TabsContent value="individual">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Generar Estado de Cuenta</CardTitle>
              <CardDescription>Busque un asociado y genere su estado de cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Buscar asociado</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Nombre o cédula..." className="pl-9" />
                  </div>
                  <Button variant="outline">Buscar</Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-muted/30">
                <p className="font-medium">Juan Carlos Pérez García</p>
                <p className="text-sm text-muted-foreground">CC 1.023.456.789 • Activo</p>
              </div>

              <div className="space-y-2">
                <Label>Fecha de corte</Label>
                <Input type="date" defaultValue="2025-01-02" />
              </div>

              <div className="space-y-3">
                <Label>Incluir en el reporte</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="ahorros" defaultChecked />
                    <label htmlFor="ahorros" className="text-sm">
                      Resumen de ahorros
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="creditos" defaultChecked />
                    <label htmlFor="creditos" className="text-sm">
                      Créditos vigentes
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="movimientos" defaultChecked />
                    <label htmlFor="movimientos" className="text-sm">
                      Últimos movimientos
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="proyeccion" />
                    <label htmlFor="proyeccion" className="text-sm">
                      Proyección de pagos
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Mail className="h-4 w-4" />
                  Enviar por email
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Vista Previa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-card text-sm space-y-4">
                <div className="text-center pb-4 border-b">
                  <h3 className="font-bold text-primary">CREAFONDOS</h3>
                  <p className="text-xs text-muted-foreground">Estado de Cuenta</p>
                  <p className="text-xs text-muted-foreground">Corte: 02/01/2025</p>
                </div>

                <div>
                  <p className="font-medium">Juan Carlos Pérez García</p>
                  <p className="text-xs text-muted-foreground">CC 1.023.456.789</p>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-xs uppercase text-muted-foreground">Ahorros</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Permanente</span>
                      <span>$8,500,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Voluntario</span>
                      <span>$3,200,000</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total</span>
                      <span>$11,700,000</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-xs uppercase text-muted-foreground">Créditos</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>CRE-2024-001</span>
                      <span>$6,800,000</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total</span>
                      <span>$6,800,000</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Saldo Neto</span>
                    <span className="text-primary">$4,900,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="masivo">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generación Masiva de Estados de Cuenta</CardTitle>
            <CardDescription>Genere estados de cuenta para múltiples asociados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Fecha de corte</Label>
                <Input type="date" defaultValue="2025-01-02" />
              </div>
              <div className="space-y-2">
                <Label>Empresa</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las empresas</SelectItem>
                    <SelectItem value="acme">Acme Corp</SelectItem>
                    <SelectItem value="tech">TechInnovate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Estado del asociado</Label>
                <Select defaultValue="activo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="activo">Activos</SelectItem>
                    <SelectItem value="inactivo">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-muted/30">
              <p className="text-center text-muted-foreground">
                Se generarán estados de cuenta para <strong className="text-foreground">1,089</strong> asociados
              </p>
            </div>

            <div className="flex gap-2">
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Generar ZIP con PDFs
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Mail className="h-4 w-4" />
                Enviar por email a todos
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
