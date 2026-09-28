import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { TipoCuota } from "@prisma/client"
import { handleApiError } from "@/lib/api-helpers"
import { getPatronalId } from "@/lib/route-params"

export const runtime = "nodejs"

function parseTipoCuota(value: string) {
  return value === "fija" ? TipoCuota.FIJA : TipoCuota.PORCENTAJE
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

    const ahorroObligatorioPct = Number(body?.ahorroObligatorioPct)
    const aportePct = Number(body?.aportePct)

    if (!Number.isFinite(ahorroObligatorioPct) || !Number.isFinite(aportePct)) {
      return NextResponse.json(
        { error: "ahorroObligatorioPct y aportePct son requeridos" },
        { status: 400 }
      )
    }

    if (aportePct > ahorroObligatorioPct) {
      return NextResponse.json(
        { error: "aportePct no puede ser mayor que ahorroObligatorioPct" },
        { status: 400 }
      )
    }

    const ahorroVoluntarioHabilitado = Boolean(body?.ahorroVoluntarioHabilitado)
    const ahorroVoluntarioPctMax =
      body?.ahorroVoluntarioPctMax !== undefined && body?.ahorroVoluntarioPctMax !== null
        ? Number(body.ahorroVoluntarioPctMax)
        : null
    const tipoCuota = parseTipoCuota(String(body?.tipoCuota ?? "porcentaje"))
    const cuotaFija =
      body?.cuotaFija !== undefined && body?.cuotaFija !== null ? Number(body.cuotaFija) : null

    const configuracion = await prisma.configuracionAhorro.upsert({
      where: { patronalId },
      create: {
        patronalId,
        ahorroObligatorioPct,
        aportePct,
        ahorroVoluntarioHabilitado,
        ahorroVoluntarioPctMax,
        tipoCuota,
        cuotaFija,
      },
      update: {
        ahorroObligatorioPct,
        aportePct,
        ahorroVoluntarioHabilitado,
        ahorroVoluntarioPctMax,
        tipoCuota,
        cuotaFija,
      },
    })

    return NextResponse.json(configuracion)
  } catch (error) {
    return handleApiError(error)
  }
}
