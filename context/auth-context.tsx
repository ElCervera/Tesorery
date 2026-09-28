"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  user: { 
    email: string; 
    name: string; 
    role: string;
    companyId?: string;
    companyName?: string;
  } | null
  login: (email: string, password: string) => Promise<void>
  setRole: (role: string) => void
  setCompany: (id: string, name: string) => void
  register: (companyData: {
    companyName: string
    nit: string
    contactName: string
    email: string
    phone: string
    password: string
    employeeCount: string
  }) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  // Forzamos estado autenticado por defecto para permitir exploración total
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState<{ 
    email: string; 
    name: string; 
    role: string;
    companyId?: string;
    companyName?: string;
  } | null>({
    email: "admin@creafondos.com",
    name: "Administrador",
    role: "Administrador",
    companyId: "EMP001",
    companyName: "Empresa Demo A"
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Intentar cargar el usuario guardado si existe
    const savedUser = localStorage.getItem("creafondos_user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (e) {
        console.error("Error parsing saved user", e)
      }
    }
    setIsLoading(false)
    setIsAuthenticated(true)
  }, [])

  const setRole = (role: string) => {
    if (user) {
      let name = role
      if (role === "Asociado") name = "Juan Pérez (Asociado)"
      if (role === "Empresa") name = "Admin " + (user.companyName || "Empresa")
      
      const updatedUser = { ...user, role, name }
      setUser(updatedUser)
      localStorage.setItem("creafondos_user", JSON.stringify(updatedUser))
    }
  }

  const setCompany = (id: string, name: string) => {
    if (user) {
      const updatedUser = { ...user, companyId: id, companyName: name }
      setUser(updatedUser)
      localStorage.setItem("creafondos_user", JSON.stringify(updatedUser))
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    console.log("AuthContext: login function called with email:", email, "and password:", password)
    try {
      if (email && password) {
        console.log("AuthContext: email and password are provided. Simulating successful login.")
        const userData = {
          email,
          name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
          role: "Administrador",
          companyId: "EMP001",
          companyName: "Empresa Demo A"
        }
        localStorage.setItem("creafondos_user", JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
        console.log("AuthContext: Redirecting to /dashboard")
      } else {
        console.log("AuthContext: Email or password not provided. Throwing error.")
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.error("AuthContext: Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (companyData: {
    companyName: string
    nit: string
    contactName: string
    email: string
    phone: string
    password: string
    employeeCount: string
  }) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validate data
      if (!companyData.email || !companyData.password || companyData.password.length < 8) {
        throw new Error("Invalid company data")
      }

      // Store registration data temporarily
      const registrationData = {
        company: companyData.companyName,
        nit: companyData.nit,
        contact: companyData.contactName,
        email: companyData.email,
        phone: companyData.phone,
        employeeCount: companyData.employeeCount,
        registeredAt: new Date().toISOString(),
      }
      localStorage.setItem("creafondos_registration", JSON.stringify(registrationData))

      // In a real app, send this to backend and wait for approval
      console.log("Registration data submitted:", registrationData)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!email) {
        throw new Error("Email is required")
      }

      // In a real app, this would send a reset email
      console.log("Password reset email sent to:", email)
    } catch (error) {
      console.error("Forgot password failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // No redirigimos al login, solo reseteamos el estado si fuera necesario
    // Pero como queremos estar siempre logueados, no hacemos nada
    console.log("Logout intentado pero deshabilitado")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, setRole, setCompany, register, forgotPassword, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}


