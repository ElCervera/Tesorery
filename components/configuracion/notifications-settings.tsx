"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail, MessageSquare, Save } from "lucide-react"
import { monto } from "@/utils/variables" // Declare the variable here

export function NotificationsSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Administre las alertas y comunicaciones del sistema</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="space-y-4">
            <TabsList className="bg-secondary">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                SMS
              </TabsTrigger>
              <TabsTrigger value="push" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Push
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Servidor SMTP</Label>
                  <Input defaultValue="smtp.creafondos.com" />
                </div>
                <div className="space-y-2">
                  <Label>Puerto</Label>
                  <Input defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label>Usuario</Label>
                  <Input defaultValue="notificaciones@creafondos.com" />
                </div>
                <div className="space-y-2">
                  <Label>Contraseña</Label>
                  <Input type="password" defaultValue="••••••••" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notificaciones por Email</h4>
                <div className="space-y-4">
                  {[
                    { label: "Recordatorio de cuota próxima a vencer", desc: "3 días antes del vencimiento" },
                    { label: "Cuota vencida", desc: "Envío diario hasta el pago" },
                    { label: "Crédito aprobado", desc: "Notificación inmediata" },
                    { label: "Solicitud de crédito recibida", desc: "Confirmación de recepción" },
                    { label: "Estado de cuenta mensual", desc: "Primer día de cada mes" },
                    { label: "Bienvenida nuevo asociado", desc: "Al momento del registro" },
                  ].map((notif, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium text-sm">{notif.label}</p>
                        <p className="text-xs text-muted-foreground">{notif.desc}</p>
                      </div>
                      <Switch defaultChecked={index < 4} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sms" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Proveedor SMS</Label>
                  <Input defaultValue="Twilio" />
                </div>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input type="password" defaultValue="••••••••" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notificaciones por SMS</h4>
                <div className="space-y-4">
                  {[
                    { label: "Cuota vencida crítica", desc: "Más de 30 días en mora" },
                    { label: "Desembolso realizado", desc: "Confirmación de transferencia" },
                    { label: "OTP para transacciones", desc: "Código de verificación" },
                  ].map((notif, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium text-sm">{notif.label}</p>
                        <p className="text-xs text-muted-foreground">{notif.desc}</p>
                      </div>
                      <Switch defaultChecked={index === 2} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="push" className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notificaciones Push (Web)</h4>
                <div className="space-y-4">
                  {[
                    { label: "Nueva solicitud de crédito", desc: "Para administradores" },
                    { label: "Crédito pendiente de aprobación", desc: "Recordatorio diario" },
                    { label: "Nómina cargada", desc: "Cuando se procesa la nómina" },
                    { label: "Alertas de sistema", desc: "Errores críticos y advertencias" },
                  ].map((notif, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium text-sm">{notif.label}</p>
                        <p className="text-xs text-muted-foreground">{notif.desc}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Plantillas de Email</CardTitle>
          <CardDescription>Personalice el contenido de los correos automáticos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Asunto - Recordatorio de Cuota</Label>
            <Input defaultValue="[CREAFONDOS] Recordatorio: Tu cuota vence en {{dias}} días" />
          </div>
          <div className="space-y-2">
            <Label>Cuerpo del Mensaje</Label>
            <Textarea
              rows={6}
              defaultValue={`Estimado(a) {{nombre}},

Te recordamos que tu cuota de $${monto} del crédito #{{numero_credito}} vence el {{fecha_vencimiento}}.

Por favor realiza tu pago a tiempo para evitar intereses de mora.

Cordialmente,
CREAFONDOS`}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Variables disponibles: {"{{nombre}}"}, {"{{monto}}"}, {"{{fecha_vencimiento}}"}, {"{{numero_credito}}"},{" "}
            {"{{dias}}"}
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}
