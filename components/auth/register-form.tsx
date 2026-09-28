"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/auth-context"

export function RegisterForm() {
  const { register, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    companyName: "",
    nit: "",
    contactName: "",
    email: "",
    phone: "",
    password: "",
    employeeCount: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await register(formData)
      setIsSuccess(true)
    } catch (err) {
      setError("Error al enviar la solicitud. Intente de nuevo.")
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">Solicitud enviada</h3>
        <p className="text-muted-foreground">
          Hemos recibido su solicitud de registro. Nuestro equipo la revisará y se pondrá en contacto con usted en las
          próximas 24-48 horas.
        </p>
        <Button onClick={() => setIsSuccess(false)} className="mt-4">
          Volver al formulario
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="companyName">Nombre de la empresa</Label>
          <Input
            id="companyName"
            placeholder="Empresa S.A.S"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nit">NIT</Label>
          <Input
            id="nit"
            placeholder="900.123.456-7"
            value={formData.nit}
            onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employeeCount">No. de empleados</Label>
          <Select
            value={formData.employeeCount}
            onValueChange={(value) => setFormData({ ...formData, employeeCount: value })}
          >
            <SelectTrigger id="employeeCount">
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-50">1 - 50</SelectItem>
              <SelectItem value="51-200">51 - 200</SelectItem>
              <SelectItem value="201-500">201 - 500</SelectItem>
              <SelectItem value="501-1000">501 - 1,000</SelectItem>
              <SelectItem value="1001+">Más de 1,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contactName">Nombre del contacto</Label>
          <Input
            id="contactName"
            placeholder="Juan Pérez"
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="contacto@empresa.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+57 300 123 4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}

      <p className="text-xs text-muted-foreground">
        Al registrarse, acepta nuestros{" "}
        <Link href="/terminos" className="text-primary hover:underline">
          Términos de servicio
        </Link>{" "}
        y{" "}
        <Link href="/privacidad" className="text-primary hover:underline">
          Política de privacidad
        </Link>
        .
      </p>

      <Button type="submit" className="w-full h-11" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando solicitud...
          </>
        ) : (
          "Enviar solicitud"
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        ¿Ya tiene una cuenta?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Iniciar sesión
        </Link>
      </div>
    </form>
  )
}
