import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PeriodicidadNomina } from "@prisma/client"
import { handleApiError } from "@/lib/api-helpers"

export const runtime = "nodejs"

function parsePeriodicidad(value: string) {
  return value === "15" ? PeriodicidadNomina.QUINCENAL : PeriodicidadNomina.MENSUAL
}

export async function GET() {
  try {
    const patronales = await prisma.patronal.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(patronales)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const nombre = String(body?.nombre ?? "").trim()
    const nit = body?.nit ? String(body.nit).trim() : null
    const email = body?.email ? String(body.email).trim() : null
    const telefono = body?.telefono ? String(body.telefono).trim() : null
    const direccion = body?.direccion ? String(body.direccion).trim() : null
    const contactoPrincipal = body?.contactoPrincipal
      ? String(body.contactoPrincipal).trim()
      : null
    const periodicidadNomina = parsePeriodicidad(String(body?.periodicidadNomina ?? "30"))

    if (!nombre) {
      return NextResponse.json({ error: "nombre es requerido" }, { status: 400 })
    }

    const patronal = await prisma.patronal.create({
      data: {
        nombre,
        nit: nit || null,
        email: email || null,
        telefono: telefono || null,
        direccion: direccion || null,
        contactoPrincipal: contactoPrincipal || null,
        periodicidadNomina,
      },
    })

    return NextResponse.json(patronal, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
