"use server"

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { handleApiError } from "@/lib/api-helpers"
import { OrigenTipo, TipoMovimiento } from "@prisma/client"

export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const patronalId = searchParams.get("patronalId") || undefined
    const afiliadoId = searchParams.get("afiliadoId") || undefined
    const from = searchParams.get("from")
    const to = searchParams.get("to")

    const where: Record<string, unknown> = {}
    if (patronalId) where.patronalId = patronalId
    if (afiliadoId) where.afiliadoId = afiliadoId
    if (from || to) {
      where.fecha = {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      }
    }

    const movimientos = await prisma.movimiento.findMany({
      where,
      orderBy: { fecha: "desc" },
    })

    return NextResponse.json(movimientos)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const patronalId = body?.patronalId ? String(body.patronalId) : null
    const fecha = body?.fecha ? new Date(body.fecha) : null
    const aportes = Array.isArray(body?.aportes) ? body.aportes : []

    if (!patronalId || !fecha || aportes.length === 0) {
      return NextResponse.json(
        { error: "patronalId, fecha y aportes son requeridos" },
        { status: 400 }
      )
    }

    const data = aportes.map((aporte: { afiliadoId: string; monto: number; descripcion?: string }) => ({
      patronalId,
      afiliadoId: String(aporte.afiliadoId),
      tipo: TipoMovimiento.APORTE,
      origenTipo: OrigenTipo.AHORRO,
      origenId: null,
      categoria: null,
      monto: Number(aporte.monto),
      fecha,
      descripcion: aporte.descripcion ? String(aporte.descripcion) : "Aporte por nomina",
      referenciaExterna: null,
    }))

    await prisma.movimiento.createMany({ data })

    return NextResponse.json({ ok: true, count: data.length }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
