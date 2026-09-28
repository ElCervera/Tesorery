import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { handleApiError } from "@/lib/api-helpers"
import { getPatronalId } from "@/lib/route-params"

export const runtime = "nodejs"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patronalId = getPatronalId(request, params)
    if (!patronalId) {
      return NextResponse.json({ error: "Patronal no encontrada" }, { status: 404 })
    }

    const lineas = await prisma.lineaAhorro.findMany({
      where: { patronalId },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(lineas)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patronalId = getPatronalId(request, params)
    if (!patronalId) {
      return NextResponse.json({ error: "Patronal no encontrada" }, { status: 404 })
    }

    const body = await request.json()
    const nombre = String(body?.nombre ?? "").trim()
    if (!nombre) {
      return NextResponse.json({ error: "nombre es requerido" }, { status: 400 })
    }

    const reglas = body?.reglas ?? null

    const linea = await prisma.lineaAhorro.create({
      data: {
        patronalId,
        nombre,
        reglas,
      },
    })

    return NextResponse.json(linea, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
