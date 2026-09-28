import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Phone, Briefcase, History, CreditCard, PiggyBank } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AssociateDetail() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">JC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">Juan Carlos Pérez García</h2>
                <Badge>Activo</Badge>
              </div>
              <div className="grid gap-1 text-sm text-muted-foreground">
                <p>CC 1.023.456.789 • Empleado</p>
                <p>juan.perez@empresa.com • 300 123 4567</p>
                <p>Acme Corp • Analista de Sistemas</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center md:text-right">
              <div>
                <p className="text-sm text-muted-foreground">Ahorros</p>
                <p className="text-xl font-bold text-primary">$12,500,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Créditos</p>
                <p className="text-xl font-bold">$8,000,000</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info" className="gap-2">
            <User className="h-4 w-4" />
            Información
          </TabsTrigger>
          <TabsTrigger value="credits" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Créditos
          </TabsTrigger>
          <TabsTrigger value="savings" className="gap-2">
            <PiggyBank className="h-4 w-4" />
            Ahorros
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Datos Personales
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombres</p>
                    <p className="font-medium">Juan Carlos</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Apellidos</p>
                    <p className="font-medium">Pérez García</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo de Documento</p>
                    <p className="font-medium">Cédula de Ciudadanía</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Número</p>
                    <p className="font-medium font-mono">1.023.456.789</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                    <p className="font-medium">15/05/1985</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estado Civil</p>
                    <p className="font-medium">Casado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                    <p className="font-medium">juan.perez@empresa.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Celular</p>
                    <p className="font-medium">300 123 4567</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono Fijo</p>
                    <p className="font-medium">601 234 5678</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ciudad</p>
                    <p className="font-medium">Bogotá D.C.</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <p className="font-medium">Calle 123 # 45-67, Apto 101</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Información Laboral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Empresa</p>
                    <p className="font-medium">Acme Corp</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cargo</p>
                    <p className="font-medium">Analista de Sistemas</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Área</p>
                    <p className="font-medium">Tecnología</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha Ingreso al Fondo</p>
                    <p className="font-medium">15/03/2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="credits">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Créditos del Asociado</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto Original</TableHead>
                    <TableHead>Saldo</TableHead>
                    <TableHead>Cuota</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">CRE-2024-001</TableCell>
                    <TableCell>Libre Inversión</TableCell>
                    <TableCell>$10,000,000</TableCell>
                    <TableCell>$6,800,000</TableCell>
                    <TableCell>$520,000</TableCell>
                    <TableCell>
                      <Badge>Al día</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">CRE-2023-045</TableCell>
                    <TableCell>Educación</TableCell>
                    <TableCell>$5,000,000</TableCell>
                    <TableCell>$1,200,000</TableCell>
                    <TableCell>$380,000</TableCell>
                    <TableCell>
                      <Badge>Al día</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ahorros del Asociado</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Línea de Ahorro</TableHead>
                    <TableHead>Saldo Actual</TableHead>
                    <TableHead>Tasa EA</TableHead>
                    <TableHead>Última Actualización</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Ahorro Permanente</TableCell>
                    <TableCell className="font-medium">$8,500,000</TableCell>
                    <TableCell>4.5%</TableCell>
                    <TableCell>01/01/2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ahorro Voluntario</TableCell>
                    <TableCell className="font-medium">$3,200,000</TableCell>
                    <TableCell>5.2%</TableCell>
                    <TableCell>01/01/2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ahorro Programado</TableCell>
                    <TableCell className="font-medium">$800,000</TableCell>
                    <TableCell>6.0%</TableCell>
                    <TableCell>01/01/2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historial de Movimientos</CardTitle>
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
                  <TableRow>
                    <TableCell className="font-mono">28/12/2024</TableCell>
                    <TableCell>Pago cuota crédito CRE-2024-001</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Débito</Badge>
                    </TableCell>
                    <TableCell className="text-right text-red-600">-$520,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">25/12/2024</TableCell>
                    <TableCell>Rendimientos ahorro voluntario</TableCell>
                    <TableCell>
                      <Badge>Crédito</Badge>
                    </TableCell>
                    <TableCell className="text-right text-green-600">+$13,867</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">15/12/2024</TableCell>
                    <TableCell>Aporte ahorro programado</TableCell>
                    <TableCell>
                      <Badge>Crédito</Badge>
                    </TableCell>
                    <TableCell className="text-right text-green-600">+$200,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">01/12/2024</TableCell>
                    <TableCell>Aporte mensual permanente</TableCell>
                    <TableCell>
                      <Badge>Crédito</Badge>
                    </TableCell>
                    <TableCell className="text-right text-green-600">+$175,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
