import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { AfiliadoEstado } from "@prisma/client"

export const runtime = "nodejs"

function parseEstado(value: string | null) {
  if (!value) return undefined
  if (value.toLowerCase() === "activo") return AfiliadoEstado.ACTIVO
  if (value.toLowerCase() === "inactivo") return AfiliadoEstado.INACTIVO
  return undefined
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const patronalId = searchParams.get("patronalId")
  const query = (searchParams.get("query") || "").trim()
  const estado = parseEstado(searchParams.get("estado"))

  const where: Record<string, unknown> = {}
  if (patronalId) where.patronalId = patronalId
  if (estado) where.estado = estado
  if (query) {
    where.OR = [
      { nombres: { contains: query, mode: "insensitive" } },
      { apellidos: { contains: query, mode: "insensitive" } },
      { documento: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
    ]
  }

  const afiliados = await prisma.afiliado.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(afiliados)
}

export async function POST(request: Request) {
  const body = await request.json()

  const patronalId = String(body?.patronalId ?? "").trim()
  const nombres = String(body?.nombres ?? "").trim()
  const apellidos = String(body?.apellidos ?? "").trim()
  const documento = String(body?.documento ?? "").trim()
  const tipoDocumento = String(body?.tipoDocumento ?? "").trim()
  const fechaIngreso = body?.fechaIngreso ? new Date(body.fechaIngreso) : null

  if (!patronalId || !nombres || !apellidos || !documento || !tipoDocumento || !fechaIngreso) {
    return NextResponse.json(
      { error: "patronalId, nombres, apellidos, documento, tipoDocumento y fechaIngreso son requeridos" },
      { status: 400 }
    )
  }

  const afiliado = await prisma.afiliado.create({
    data: {
      patronalId,
      nombres,
      apellidos,
      documento,
      tipoDocumento,
      email: body?.email ? String(body.email).trim() : null,
      telefono: body?.telefono ? String(body.telefono).trim() : null,
      salarioNeto: body?.salarioNeto ? Number(body.salarioNeto) : null,
      fechaIngreso,
    },
  })

  return NextResponse.json(afiliado, { status: 201 })
}
