-- CreateEnum
CREATE TYPE "PeriodicidadNomina" AS ENUM ('QUINCENAL', 'MENSUAL');

-- CreateEnum
CREATE TYPE "PatronalEstado" AS ENUM ('ACTIVA', 'INACTIVA');

-- CreateEnum
CREATE TYPE "TipoCuota" AS ENUM ('PORCENTAJE', 'FIJA');

-- CreateEnum
CREATE TYPE "AfiliadoEstado" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "EstadoCredito" AS ENUM ('VIGENTE', 'MORA', 'PAGADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "EstadoCuota" AS ENUM ('PENDIENTE', 'PAGADO', 'MORA');

-- CreateEnum
CREATE TYPE "TipoMovimiento" AS ENUM ('APORTE', 'RETIRO', 'DESEMBOLSO', 'PAGO', 'INTERES', 'AJUSTE');

-- CreateEnum
CREATE TYPE "OrigenTipo" AS ENUM ('AHORRO', 'CREDITO');

-- CreateEnum
CREATE TYPE "CategoriaMovimiento" AS ENUM ('CAPITAL', 'INTERES', 'PENALIDAD', 'AJUSTE');

-- CreateTable
CREATE TABLE "Patronal" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nit" TEXT,
    "periodicidadNomina" "PeriodicidadNomina" NOT NULL,
    "estado" "PatronalEstado" NOT NULL DEFAULT 'ACTIVA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patronal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguracionAhorro" (
    "id" TEXT NOT NULL,
    "patronalId" TEXT NOT NULL,
    "ahorroObligatorioPct" DECIMAL(5,2) NOT NULL,
    "aportePct" DECIMAL(5,2) NOT NULL,
    "ahorroVoluntarioHabilitado" BOOLEAN NOT NULL DEFAULT false,
    "ahorroVoluntarioPctMax" DECIMAL(5,2),
    "tipoCuota" "TipoCuota" NOT NULL DEFAULT 'PORCENTAJE',
    "cuotaFija" DECIMAL(14,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracionAhorro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineaAhorro" (
    "id" TEXT NOT NULL,
    "patronalId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "reglas" JSONB,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LineaAhorro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineaCredito" (
    "id" TEXT NOT NULL,
    "patronalId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tasa" DECIMAL(5,2) NOT NULL,
    "plazoMin" INTEGER NOT NULL,
    "plazoMax" INTEGER NOT NULL,
    "montoMin" DECIMAL(14,2) NOT NULL,
    "montoMax" DECIMAL(14,2) NOT NULL,
    "garantias" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LineaCredito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Afiliado" (
    "id" TEXT NOT NULL,
    "patronalId" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "email" TEXT,
    "telefono" TEXT,
    "salarioNeto" DECIMAL(14,2),
    "estado" "AfiliadoEstado" NOT NULL DEFAULT 'ACTIVO',
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Afiliado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credito" (
    "id" TEXT NOT NULL,
    "patronalId" TEXT NOT NULL,
    "afiliadoId" TEXT NOT NULL,
    "lineaCreditoId" TEXT NOT NULL,
    "monto" DECIMAL(14,2) NOT NULL,
    "plazo" INTEGER NOT NULL,
    "tasa" DECIMAL(5,2) NOT NULL,
    "fechaDesembolso" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3),
    "estado" "EstadoCredito" NOT NULL DEFAULT 'VIGENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CuotaCredito" (
    "id" TEXT NOT NULL,
    "creditoId" TEXT NOT NULL,
    "numeroCuota" INTEGER NOT NULL,
    "fechaPago" TIMESTAMP(3) NOT NULL,
    "monto" DECIMAL(14,2) NOT NULL,
    "estado" "EstadoCuota" NOT NULL DEFAULT 'PENDIENTE',
    "fechaPagoReal" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CuotaCredito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimiento" (
    "id" TEXT NOT NULL,
    "patronalId" TEXT NOT NULL,
    "afiliadoId" TEXT NOT NULL,
    "tipo" "TipoMovimiento" NOT NULL,
    "origenTipo" "OrigenTipo" NOT NULL,
    "origenId" TEXT,
    "categoria" "CategoriaMovimiento",
    "monto" DECIMAL(14,2) NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT,
    "referenciaExterna" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patronal_nit_key" ON "Patronal"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguracionAhorro_patronalId_key" ON "ConfiguracionAhorro"("patronalId");

-- CreateIndex
CREATE INDEX "LineaAhorro_patronalId_idx" ON "LineaAhorro"("patronalId");

-- CreateIndex
CREATE INDEX "LineaCredito_patronalId_idx" ON "LineaCredito"("patronalId");

-- CreateIndex
CREATE INDEX "Afiliado_patronalId_idx" ON "Afiliado"("patronalId");

-- CreateIndex
CREATE INDEX "Afiliado_documento_idx" ON "Afiliado"("documento");

-- CreateIndex
CREATE INDEX "Credito_patronalId_idx" ON "Credito"("patronalId");

-- CreateIndex
CREATE INDEX "Credito_afiliadoId_idx" ON "Credito"("afiliadoId");

-- CreateIndex
CREATE INDEX "Credito_lineaCreditoId_idx" ON "Credito"("lineaCreditoId");

-- CreateIndex
CREATE INDEX "CuotaCredito_creditoId_idx" ON "CuotaCredito"("creditoId");

-- CreateIndex
CREATE INDEX "Movimiento_patronalId_idx" ON "Movimiento"("patronalId");

-- CreateIndex
CREATE INDEX "Movimiento_afiliadoId_idx" ON "Movimiento"("afiliadoId");

-- CreateIndex
CREATE INDEX "Movimiento_fecha_idx" ON "Movimiento"("fecha");

-- AddForeignKey
ALTER TABLE "ConfiguracionAhorro" ADD CONSTRAINT "ConfiguracionAhorro_patronalId_fkey" FOREIGN KEY ("patronalId") REFERENCES "Patronal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaAhorro" ADD CONSTRAINT "LineaAhorro_patronalId_fkey" FOREIGN KEY ("patronalId") REFERENCES "Patronal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineaCredito" ADD CONSTRAINT "LineaCredito_patronalId_fkey" FOREIGN KEY ("patronalId") REFERENCES "Patronal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Afiliado" ADD CONSTRAINT "Afiliado_patronalId_fkey" FOREIGN KEY ("patronalId") REFERENCES "Patronal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_patronalId_fkey" FOREIGN KEY ("patronalId") REFERENCES "Patronal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_afiliadoId_fkey" FOREIGN KEY ("afiliadoId") REFERENCES "Afiliado"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_lineaCreditoId_fkey" FOREIGN KEY ("lineaCreditoId") REFERENCES "LineaCredito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CuotaCredito" ADD CONSTRAINT "CuotaCredito_creditoId_fkey" FOREIGN KEY ("creditoId") REFERENCES "Credito"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_patronalId_fkey" FOREIGN KEY ("patronalId") REFERENCES "Patronal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimiento" ADD CONSTRAINT "Movimiento_afiliadoId_fkey" FOREIGN KEY ("afiliadoId") REFERENCES "Afiliado"("id") ON DELETE CASCADE ON UPDATE CASCADE;
