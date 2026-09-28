"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Ene", colocacion: 120, recaudo: 95 },
  { month: "Feb", colocacion: 150, recaudo: 110 },
  { month: "Mar", colocacion: 180, recaudo: 125 },
  { month: "Abr", colocacion: 165, recaudo: 140 },
  { month: "May", colocacion: 200, recaudo: 160 },
  { month: "Jun", colocacion: 220, recaudo: 180 },
]

export function CreditOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Comportamiento de Cartera</CardTitle>
        <Tabs defaultValue="6m" className="w-auto">
          <TabsList className="h-8">
            <TabsTrigger value="1m" className="text-xs px-2.5">
              1M
            </TabsTrigger>
            <TabsTrigger value="3m" className="text-xs px-2.5">
              3M
            </TabsTrigger>
            <TabsTrigger value="6m" className="text-xs px-2.5">
              6M
            </TabsTrigger>
            <TabsTrigger value="1y" className="text-xs px-2.5">
              1A
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorColocacion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.38 0.08 145)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.38 0.08 145)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRecaudo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.55 0.12 145)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.55 0.12 145)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                tick={{ fill: "oklch(0.45 0.03 145)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.88 0.02 90)" }}
              />
              <YAxis
                tick={{ fill: "oklch(0.45 0.03 145)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.88 0.02 90)" }}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.99 0.005 90)",
                  border: "1px solid oklch(0.88 0.02 90)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${value}M`, ""]}
              />
              <Area
                type="monotone"
                dataKey="colocacion"
                stroke="oklch(0.38 0.08 145)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorColocacion)"
                name="Colocación"
              />
              <Area
                type="monotone"
                dataKey="recaudo"
                stroke="oklch(0.55 0.12 145)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRecaudo)"
                name="Recaudo"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Colocación</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Recaudo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
