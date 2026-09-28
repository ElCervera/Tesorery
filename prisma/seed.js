/* eslint-disable no-console */
const { PrismaClient, PeriodicidadNomina, TipoCuota, AfiliadoEstado } = require("@prisma/client")

const prisma = new PrismaClient()

async function upsertPatronal(data) {
  const existing = await prisma.patronal.findFirst({
    where: { nit: data.nit },
  })

  if (existing) {
    return prisma.patronal.update({
      where: { id: existing.id },
      data,
    })
  }

  return prisma.patronal.create({ data })
}

async function upsertLineaAhorro(patronalId, nombre) {
  const existing = await prisma.lineaAhorro.findFirst({
    where: { patronalId, nombre },
  })

  if (existing) {
    return prisma.lineaAhorro.update({
      where: { id: existing.id },
      data: { activa: true },
    })
  }

  return prisma.lineaAhorro.create({
    data: {
      patronalId,
      nombre,
      activa: true,
    },
  })
}

async function upsertAfiliado(patronalId, data) {
  const existing = await prisma.afiliado.findFirst({
    where: {
      patronalId,
      documento: data.documento,
    },
  })

  if (existing) {
    return prisma.afiliado.update({
      where: { id: existing.id },
      data,
    })
  }

  return prisma.afiliado.create({
    data: {
      ...data,
      patronalId,
    },
  })
}

async function main() {
  const patronalAndina = await upsertPatronal({
    nombre: "Patronal Andina",
    nit: "900123456-7",
    periodicidadNomina: PeriodicidadNomina.QUINCENAL,
  })

  const patronalPacifico = await upsertPatronal({
    nombre: "Patronal Pacifico",
    nit: "901234567-8",
    periodicidadNomina: PeriodicidadNomina.MENSUAL,
  })

  for (const patronal of [patronalAndina, patronalPacifico]) {
    await prisma.configuracionAhorro.upsert({
      where: { patronalId: patronal.id },
      update: {
        ahorroObligatorioPct: "5",
        aportePct: "3",
        ahorroVoluntarioHabilitado: true,
        ahorroVoluntarioPctMax: "10",
        tipoCuota: TipoCuota.PORCENTAJE,
        cuotaFija: null,
      },
      create: {
        patronalId: patronal.id,
        ahorroObligatorioPct: "5",
        aportePct: "3",
        ahorroVoluntarioHabilitado: true,
        ahorroVoluntarioPctMax: "10",
        tipoCuota: TipoCuota.PORCENTAJE,
        cuotaFija: null,
      },
    })

    await upsertLineaAhorro(patronal.id, "Ahorro Obligatorio")
    await upsertLineaAhorro(patronal.id, "Ahorro Voluntario")
    await upsertLineaAhorro(patronal.id, "Ahorro Navideno")
  }

  await upsertAfiliado(patronalAndina.id, {
    nombres: "Juan",
    apellidos: "Perez",
    documento: "101010101",
    tipoDocumento: "CC",
    email: "juan.perez@andina.com",
    telefono: "3001234567",
    salarioNeto: "2500000",
    estado: AfiliadoEstado.ACTIVO,
    fechaIngreso: new Date("2024-01-15T00:00:00Z"),
  })

  await upsertAfiliado(patronalAndina.id, {
    nombres: "Maria",
    apellidos: "Gomez",
    documento: "202020202",
    tipoDocumento: "CC",
    email: "maria.gomez@andina.com",
    telefono: "3002345678",
    salarioNeto: "3200000",
    estado: AfiliadoEstado.ACTIVO,
    fechaIngreso: new Date("2023-08-01T00:00:00Z"),
  })

  await upsertAfiliado(patronalAndina.id, {
    nombres: "Carlos",
    apellidos: "Vargas",
    documento: "303030303",
    tipoDocumento: "CC",
    email: "carlos.vargas@andina.com",
    telefono: "3003456789",
    salarioNeto: "4100000",
    estado: AfiliadoEstado.ACTIVO,
    fechaIngreso: new Date("2022-11-10T00:00:00Z"),
  })

  await upsertAfiliado(patronalPacifico.id, {
    nombres: "Laura",
    apellidos: "Rios",
    documento: "404040404",
    tipoDocumento: "CC",
    email: "laura.rios@pacifico.com",
    telefono: "3004567890",
    salarioNeto: "2800000",
    estado: AfiliadoEstado.ACTIVO,
    fechaIngreso: new Date("2024-03-05T00:00:00Z"),
  })

  await upsertAfiliado(patronalPacifico.id, {
    nombres: "Andres",
    apellidos: "Ortiz",
    documento: "505050505",
    tipoDocumento: "CC",
    email: "andres.ortiz@pacifico.com",
    telefono: "3005678901",
    salarioNeto: "3500000",
    estado: AfiliadoEstado.ACTIVO,
    fechaIngreso: new Date("2023-05-20T00:00:00Z"),
  })

  await upsertAfiliado(patronalPacifico.id, {
    nombres: "Daniela",
    apellidos: "Lopez",
    documento: "606060606",
    tipoDocumento: "CC",
    email: "daniela.lopez@pacifico.com",
    telefono: "3006789012",
    salarioNeto: "3900000",
    estado: AfiliadoEstado.ACTIVO,
    fechaIngreso: new Date("2022-09-12T00:00:00Z"),
  })

  console.log("Seed OK: patronales, configuracion ahorro, lineas ahorro y afiliados.")
}

main()
  .catch((error) => {
    console.error("Seed error:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
