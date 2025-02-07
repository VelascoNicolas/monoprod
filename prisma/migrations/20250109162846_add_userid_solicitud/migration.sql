/*
  Warnings:

  - Added the required column `userId` to the `SolicitudPresupuesto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
/* ALTER TABLE "SolicitudPresupuesto" ADD COLUMN     "userId" INTEGER NOT NULL; */

ALTER TABLE "SolicitudPresupuesto" ADD COLUMN "userId" INTEGER;

UPDATE "SolicitudPresupuesto" SET "userId" = 1; -- Cambia 1 por un valor válido o usa tu lógica personalizada.

ALTER TABLE "SolicitudPresupuesto" ALTER COLUMN "userId" SET NOT NULL;