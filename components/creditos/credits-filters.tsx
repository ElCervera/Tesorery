"use client"

import { Search, Filter, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreditsFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar por asociado, ID de crédito..." className="pl-9" />
      </div>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="vigente">Vigente</SelectItem>
          <SelectItem value="mora">En mora</SelectItem>
          <SelectItem value="cancelado">Cancelado</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Línea de crédito" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="libre">Libre Inversión</SelectItem>
          <SelectItem value="vivienda">Vivienda</SelectItem>
          <SelectItem value="educacion">Educación</SelectItem>
          <SelectItem value="vehiculo">Vehículo</SelectItem>
          <SelectItem value="calamidad">Calamidad</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Calendar className="h-4 w-4" />
        Fecha
      </Button>
      <Button variant="outline" className="gap-2 bg-transparent">
        <Filter className="h-4 w-4" />
        Más filtros
      </Button>
    </div>
  )
}
