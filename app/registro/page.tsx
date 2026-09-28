import { RegisterForm } from "@/components/auth/register-form"
import { Logo } from "@/components/logo"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-financial-pattern-green.jpg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <Logo variant="full" className="[&_span]:text-primary-foreground" />

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-balance">
              Únase a la red de <br />
              Fondos más grande
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Complete el formulario de registro para solicitar acceso a nuestra plataforma de gestión integral.
            </p>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                Gestión multiempresa centralizada
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                Módulos de créditos y ahorros completos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                Reportes en tiempo real
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                Soporte técnico especializado
              </li>
            </ul>
          </div>

          <p className="text-sm text-primary-foreground/60">© 2025 CREAFONDOS. Todos los derechos reservados.</p>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <Logo showTagline />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Solicitar acceso</h2>
            <p className="text-muted-foreground">Complete sus datos para crear una solicitud de registro</p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
