"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Ahorro Voluntario", value: 45, color: "oklch(0.38 0.08 145)" },
  { name: "Ahorro Contractual", value: 30, color: "oklch(0.55 0.12 145)" },
  { name: "Ahorro Programado", value: 15, color: "oklch(0.65 0.1 85)" },
  { name: "CDAT", value: 10, color: "oklch(0.75 0.08 145)" },
]

export function SavingsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Distribución de Ahorros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.99 0.005 90)",
                  border: "1px solid oklch(0.88 0.02 90)",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value}%`, ""]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
