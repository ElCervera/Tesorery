"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Building2,
  Users,
  CreditCard,
  PiggyBank,
  Settings,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Logo } from "@/components/logo"
import { useAuth } from "@/context/auth-context"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["Administrador", "Gerente de Fondo"],
  },
  {
    title: "Patronales",
    icon: Building2,
    href: "/dashboard/multiempresa",
    roles: ["Administrador", "Gerente de Fondo"],
    submenu: [
      { title: "Listado", href: "/dashboard/multiempresa" },
      { title: "Configuracion", href: "/dashboard/multiempresa/configuracion" },
    ],
  },
  {
    title: "Asociados",
    icon: Users,
    href: "/dashboard/asociados",
    roles: ["Administrador", "Gerente de Fondo"],
    submenu: [
      { title: "Listado", href: "/dashboard/asociados" },
      { title: "Editar Asociado", href: "/dashboard/asociados/editar" },
      { title: "Estados de Cuenta", href: "/dashboard/asociados/estados" },
      { title: "Nuevo Asociado", href: "/dashboard/asociados/nuevo", roles: ["Administrador"] },
    ],
  },
  {
    title: "Creditos",
    icon: CreditCard,
    href: "/dashboard/creditos",
    roles: ["Administrador", "Gerente de Fondo"],
    submenu: [
      { title: "Cartera", href: "/dashboard/creditos" },
      { title: "Solicitudes", href: "/dashboard/creditos/solicitudes" },
      { title: "Parametrizacion", href: "/dashboard/creditos/parametrizacion" },
    ],
  },
  {
    title: "Ahorros",
    icon: PiggyBank,
    href: "/dashboard/ahorros",
    roles: ["Administrador", "Gerente de Fondo"],
    submenu: [
      { title: "Lineas de Ahorro", href: "/dashboard/ahorros" },
      { title: "Movimientos", href: "/dashboard/ahorros/movimientos" },
      { title: "Configuracion", href: "/dashboard/ahorros/configuracion" },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="p-4">
            <Logo
              variant="full"
              className="[&_span]:text-sidebar-foreground [&_.text-muted-foreground]:text-sidebar-foreground/60"
            />
          </div>
        </SidebarHeader>
        <SidebarContent />
        <SidebarFooter className="border-t border-sidebar-border p-4">
          <div className="text-xs text-sidebar-foreground/60">v1.0.0 • CREAFONDOS</div>
        </SidebarFooter>
      </Sidebar>
    )
  }

  const filteredMenuItems = menuItems.filter((item) => {
    if (!user) return false
    return item.roles.includes(user.role)
  })

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="p-4">
          <Logo
            variant="full"
            className="[&_span]:text-sidebar-foreground [&_.text-muted-foreground]:text-sidebar-foreground/60"
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                if (item.submenu) {
                  // Filter submenu items if they have specific roles
                  const filteredSubmenu = item.submenu.filter(sub => 
                    !sub.roles || (user && sub.roles.includes(user.role))
                  )

                  return (
                    <Collapsible key={item.title} defaultOpen={isActive} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={isActive}>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {filteredSubmenu.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.href}>
                                <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                                  <Link href={subItem.href}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === "Administrador" && (
          <SidebarGroup>
            <SidebarGroupLabel>Sistema</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/dashboard/configuracion")}>
                    <Link href="/dashboard/configuracion">
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex flex-col gap-1">
          <div className="text-xs font-medium text-sidebar-foreground">Rol: {user?.role}</div>
          <div className="text-[10px] text-sidebar-foreground/60">v1.0.0 • CREAFONDOS</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
