"use client"

import { useAuth } from "@/context/auth-context"
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { CreditOverview } from "@/components/dashboard/credit-overview"
import { SavingsOverview } from "@/components/dashboard/savings-overview"
import { AsociadoDashboard } from "@/components/dashboard/asociado-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (user?.role === "Asociado") {
    return <AsociadoDashboard />
  }

  const isEmpresa = user?.role === "Empresa"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {isEmpresa ? `Dashboard Corporativo: ${user?.companyName}` : "Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {isEmpresa 
            ? `Resumen de actividades y saldos para los empleados de ${user?.companyName}`
            : "Resumen general del fondo de empleados"}
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CreditOverview />
          <SavingsOverview />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
