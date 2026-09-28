import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { PeriodicidadNomina } from "@prisma/client"
import { handleApiError } from "@/lib/api-helpers"
import { getPatronalId } from "@/lib/route-params"

export const runtime = "nodejs"

function parsePeriodicidad(value: string) {
  return value === "15" ? PeriodicidadNomina.QUINCENAL : PeriodicidadNomina.MENSUAL
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patronalId = getPatronalId(request, params)
    if (!patronalId) {
      return NextResponse.json({ error: "Patronal no encontrada" }, { status: 404 })
    }

    const patronal = await prisma.patronal.findUnique({
      where: { id: patronalId },
      include: {
        configuracionAhorro: true,
        lineasAhorro: true,
        lineasCredito: true,
      },
    })

    if (!patronal) {
      return NextResponse.json({ error: "Patronal no encontrada" }, { status: 404 })
    }

    return NextResponse.json(patronal)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patronalId = getPatronalId(request, params)
    if (!patronalId) {
      return NextResponse.json({ error: "Patronal no encontrada" }, { status: 404 })
    }

    const body = await request.json()

    const nombre = body?.nombre ? String(body.nombre).trim() : undefined
    const nit = body?.nit ? String(body.nit).trim() : undefined
    const email = body?.email ? String(body.email).trim() : undefined
    const telefono = body?.telefono ? String(body.telefono).trim() : undefined
    const direccion = body?.direccion ? String(body.direccion).trim() : undefined
    const contactoPrincipal = body?.contactoPrincipal
      ? String(body.contactoPrincipal).trim()
      : undefined
    const periodicidadNomina = body?.periodicidadNomina
      ? parsePeriodicidad(String(body.periodicidadNomina))
      : undefined

    const patronal = await prisma.patronal.update({
      where: { id: patronalId },
      data: {
        ...(nombre ? { nombre } : {}),
        ...(nit !== undefined ? { nit: nit || null } : {}),
        ...(email !== undefined ? { email: email || null } : {}),
        ...(telefono !== undefined ? { telefono: telefono || null } : {}),
        ...(direccion !== undefined ? { direccion: direccion || null } : {}),
        ...(contactoPrincipal !== undefined
          ? { contactoPrincipal: contactoPrincipal || null }
          : {}),
        ...(periodicidadNomina ? { periodicidadNomina } : {}),
      },
    })

    return NextResponse.json(patronal)
  } catch (error) {
    return handleApiError(error)
  }
}
