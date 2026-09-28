"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PatronalOption = {
  id: string
  nombre: string
}

type AssociatesFiltersProps = {
  query: string
  estado: string
  patronalId: string
  patronales: PatronalOption[]
  onQueryChange: (value: string) => void
  onEstadoChange: (value: string) => void
  onPatronalChange: (value: string) => void
}

export function AssociatesFilters({
  query,
  estado,
  patronalId,
  patronales,
  onQueryChange,
  onEstadoChange,
  onPatronalChange,
}: AssociatesFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar por nombre, documento o correo..."
            className="pl-9"
          />
        </div>
        <Select value={estado} onValueChange={onEstadoChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activo">Activo</SelectItem>
            <SelectItem value="inactivo">Inactivo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={patronalId} onValueChange={onPatronalChange}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Patronal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            {patronales.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
