import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { handleApiError } from "@/lib/api-helpers"
import { getLineaAhorroId } from "@/lib/route-params"

export const runtime = "nodejs"

export async function PUT(
  request: Request,
  { params }: { params: { id: string; lineaId: string } }
) {
  try {
    const lineaId = getLineaAhorroId(request, params)
    if (!lineaId) {
      return NextResponse.json({ error: "Linea no encontrada" }, { status: 404 })
    }

    const body = await request.json()
    const nombre = body?.nombre ? String(body.nombre).trim() : undefined
    const reglas = body?.reglas ?? undefined

    const linea = await prisma.lineaAhorro.update({
      where: { id: lineaId },
      data: {
        ...(nombre ? { nombre } : {}),
        ...(reglas !== undefined ? { reglas } : {}),
      },
    })

    return NextResponse.json(linea)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; lineaId: string } }
) {
  try {
    const lineaId = getLineaAhorroId(request, params)
    if (!lineaId) {
      return NextResponse.json({ error: "Linea no encontrada" }, { status: 404 })
    }

    await prisma.lineaAhorro.delete({
      where: { id: lineaId },
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return handleApiError(error)
  }
}
