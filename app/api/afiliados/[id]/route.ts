import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { AfiliadoEstado } from "@prisma/client"
import { handleApiError } from "@/lib/api-helpers"
import { getAfiliadoId } from "@/lib/route-params"

export const runtime = "nodejs"

function parseEstado(value: string | null) {
  if (!value) return undefined
  if (value.toLowerCase() === "activo") return AfiliadoEstado.ACTIVO
  if (value.toLowerCase() === "inactivo") return AfiliadoEstado.INACTIVO
  return undefined
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const afiliadoId = getAfiliadoId(request, params)
    if (!afiliadoId) {
      return NextResponse.json({ error: "Afiliado no encontrado" }, { status: 404 })
    }

    const afiliado = await prisma.afiliado.findUnique({
      where: { id: afiliadoId },
    })

    if (!afiliado) {
      return NextResponse.json({ error: "Afiliado no encontrado" }, { status: 404 })
    }

    return NextResponse.json(afiliado)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const afiliadoId = getAfiliadoId(request, params)
    if (!afiliadoId) {
      return NextResponse.json({ error: "Afiliado no encontrado" }, { status: 404 })
    }

    const body = await request.json()

    const estado = parseEstado(body?.estado ? String(body.estado) : null)
    const afiliado = await prisma.afiliado.update({
      where: { id: afiliadoId },
      data: {
        nombres: body?.nombres ? String(body.nombres).trim() : undefined,
        apellidos: body?.apellidos ? String(body.apellidos).trim() : undefined,
        documento: body?.documento ? String(body.documento).trim() : undefined,
        tipoDocumento: body?.tipoDocumento ? String(body.tipoDocumento).trim() : undefined,
        email: body?.email ? String(body.email).trim() : undefined,
        telefono: body?.telefono ? String(body.telefono).trim() : undefined,
        salarioNeto: body?.salarioNeto ? Number(body.salarioNeto) : undefined,
        estado,
        fechaIngreso: body?.fechaIngreso ? new Date(body.fechaIngreso) : undefined,
        patronalId: body?.patronalId ? String(body.patronalId) : undefined,
      },
    })

    return NextResponse.json(afiliado)
  } catch (error) {
    return handleApiError(error)
  }
}
