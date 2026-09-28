import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  CreditCard,
  PiggyBank,
  TrendingDown,
  FileText,
  Calendar,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react"
import Link from "next/link"

const reportCategories = [
  {
    title: "Asociados",
    description: "Reportes sobre el padrón de asociados",
    icon: Users,
    reports: [
      { name: "Listado general de asociados", href: "/dashboard/reportes/asociados" },
      { name: "Nuevos asociados por periodo", href: "/dashboard/reportes/asociados" },
      { name: "Retiros del periodo", href: "/dashboard/reportes/asociados" },
      { name: "Directorio de contactos", href: "/dashboard/reportes/asociados" },
    ],
  },
  {
    title: "Cartera de Créditos",
    description: "Análisis y seguimiento de créditos",
    icon: CreditCard,
    reports: [
      { name: "Cartera por estado", href: "/dashboard/reportes/cartera" },
      { name: "Cartera por línea de crédito", href: "/dashboard/reportes/cartera" },
      { name: "Proyección de recaudo", href: "/dashboard/reportes/cartera" },
      { name: "Créditos desembolsados", href: "/dashboard/reportes/cartera" },
    ],
  },
  {
    title: "Ahorros",
    description: "Captaciones y rendimientos",
    icon: PiggyBank,
    reports: [
      { name: "Saldos por línea de ahorro", href: "/dashboard/reportes/ahorros" },
      { name: "Movimientos del periodo", href: "/dashboard/reportes/ahorros" },
      { name: "Rendimientos liquidados", href: "/dashboard/reportes/ahorros" },
      { name: "Top ahorradores", href: "/dashboard/reportes/ahorros" },
    ],
  },
  {
    title: "Mora y Cobranza",
    description: "Seguimiento de cartera vencida",
    icon: TrendingDown,
    reports: [
      { name: "Cartera en mora", href: "/dashboard/reportes/cartera" },
      { name: "Antigüedad de mora", href: "/dashboard/reportes/cartera" },
      { name: "Gestión de cobranza", href: "/dashboard/reportes/cartera" },
      { name: "Provisiones", href: "/dashboard/reportes/cartera" },
    ],
  },
]

const quickReports = [
  { name: "Estado de cuenta consolidado", icon: FileText, href: "/dashboard/reportes/estados" },
  { name: "Informe mensual ejecutivo", icon: BarChart3, href: "/dashboard/reportes/ejecutivo" },
  { name: "Calendario de pagos", icon: Calendar, href: "/dashboard/reportes/calendario" },
  { name: "Exportar a Excel", icon: FileSpreadsheet, href: "#" },
]

export function ReportsGrid() {
  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickReports.map((report) => (
          <Button
            key={report.name}
            variant="outline"
            className="h-auto py-4 justify-start gap-3 bg-transparent"
            asChild
          >
            <Link href={report.href}>
              <report.icon className="h-5 w-5 text-primary" />
              <span className="text-sm">{report.name}</span>
            </Link>
          </Button>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.reports.map((report) => (
                  <li key={report.name}>
                    <Link
                      href={report.href}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {report.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
