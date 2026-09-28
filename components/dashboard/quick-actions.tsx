import { Plus, FileText, Calculator, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const actions = [
  {
    title: "Nuevo Crédito",
    icon: Plus,
    href: "/dashboard/creditos/solicitudes",
    variant: "default" as const,
  },
  {
    title: "Nuevo Asociado",
    icon: UserPlus,
    href: "/dashboard/asociados/nuevo",
    variant: "outline" as const,
  },
  {
    title: "Simulador",
    icon: Calculator,
    href: "/dashboard/creditos/simulador",
    variant: "outline" as const,
  },
  {
    title: "Reportes",
    icon: FileText,
    href: "/dashboard/reportes",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button key={action.title} variant={action.variant} className="h-auto py-3 flex-col gap-2" asChild>
            <Link href={action.href}>
              <action.icon className="h-5 w-5" />
              <span className="text-xs">{action.title}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
