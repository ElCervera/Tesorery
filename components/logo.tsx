import { Heart, Users } from "lucide-react"

interface LogoProps {
  variant?: "full" | "icon"
  className?: string
  showTagline?: boolean
}

export function Logo({ variant = "full", className = "", showTagline = false }: LogoProps) {
  if (variant === "icon") {
    return (
      <div className={`flex items-center justify-center w-10 h-10 bg-primary rounded-lg ${className}`}>
        <div className="relative">
          <Users className="w-5 h-5 text-primary-foreground" />
          <Heart className="w-2.5 h-2.5 text-primary-foreground absolute -top-1 -right-1 fill-current" />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
        <div className="relative">
          <Users className="w-5 h-5 text-primary-foreground" />
          <Heart className="w-2.5 h-2.5 text-primary-foreground absolute -top-1 -right-1 fill-current" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight text-foreground">CREAFONDOS</span>
        {showTagline && <span className="text-xs text-muted-foreground">Expertos en Fondos de Empleados</span>}
      </div>
    </div>
  )
}
