import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export function handleApiError(error: unknown) {
  console.error(error)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 })
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Valor duplicado", meta: error.meta ?? null },
        { status: 409 }
      )
    }
  }

  const message = error instanceof Error ? error.message : String(error)
  return NextResponse.json({ error: "Error interno", details: message }, { status: 500 })
}
