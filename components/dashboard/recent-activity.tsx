import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    user: "Juan Pérez",
    initials: "JP",
    action: "Solicitud de crédito",
    amount: "$5,000,000",
    time: "Hace 5 min",
    status: "pending",
  },
  {
    id: 2,
    user: "María García",
    initials: "MG",
    action: "Pago de cuota",
    amount: "$450,000",
    time: "Hace 15 min",
    status: "completed",
  },
  {
    id: 3,
    user: "Carlos Rodríguez",
    initials: "CR",
    action: "Nuevo registro",
    amount: null,
    time: "Hace 30 min",
    status: "completed",
  },
  {
    id: 4,
    user: "Ana Martínez",
    initials: "AM",
    action: "Retiro de ahorros",
    amount: "$1,200,000",
    time: "Hace 1 hora",
    status: "completed",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">{activity.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{activity.user}</p>
                {activity.status === "pending" && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    Pendiente
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {activity.action}
                {activity.amount && ` • ${activity.amount}`}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
