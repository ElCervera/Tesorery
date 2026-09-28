"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TreasuryOverview } from "@/components/tesoreria/treasury-overview"
import { CashFlow } from "@/components/tesoreria/cash-flow"
import { BankAccounts } from "@/components/tesoreria/bank-accounts"
import { PayrollDiscounts } from "@/components/tesoreria/payroll-discounts"

export default function TesoreriaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tesorería</h1>
        <p className="text-muted-foreground">Gestión de flujo de caja, cuentas bancarias y descuentos de nómina</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="cashflow">Flujo de Caja</TabsTrigger>
          <TabsTrigger value="banks">Cuentas Bancarias</TabsTrigger>
          <TabsTrigger value="payroll">Descuentos Nómina</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TreasuryOverview />
        </TabsContent>

        <TabsContent value="cashflow">
          <CashFlow />
        </TabsContent>

        <TabsContent value="banks">
          <BankAccounts />
        </TabsContent>

        <TabsContent value="payroll">
          <PayrollDiscounts />
        </TabsContent>
      </Tabs>
    </div>
  )
}
