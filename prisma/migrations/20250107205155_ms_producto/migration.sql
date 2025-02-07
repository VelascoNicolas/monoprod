-- CreateEnum
CREATE TYPE "EstadoPresupuesto" AS ENUM ('CREADO', 'ACEPTADO', 'CANCELADO', 'RECHAZADO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('CREADA', 'ACEPTADA', 'CANCELADA', 'RECHAZADA', 'FINALIZADA');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "marca" TEXT NOT NULL DEFAULT 'Sin marca',
    "stock" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tipoProductoId" INTEGER,
    "descripcionId" INTEGER NOT NULL,
    "tiposUsoId" INTEGER NOT NULL,
    "proveedorId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombreCategoria" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoCategoria" (
    "productId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "ProductoCategoria_pkey" PRIMARY KEY ("productId","categoriaId")
);

-- CreateTable
CREATE TABLE "TipoProducto" (
    "id" SERIAL NOT NULL,
    "nombreTipo" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "categoriaId" INTEGER NOT NULL DEFAULT 1,
    "tipoPadreId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TipoProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DescuentoProducto" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "precioDescuento" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "DescuentoProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Descripcion" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "caracteristicas" TEXT[],

    CONSTRAINT "Descripcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "comentario" VARCHAR(256) NOT NULL,
    "tituloComentario" VARCHAR(20) NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoUso" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tiposDeUso" TEXT[],

    CONSTRAINT "TipoUso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "tipoImagen" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "urlImagen" TEXT NOT NULL,
    "productoId" INTEGER NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedores" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receta" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL,

    CONSTRAINT "Receta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presupuesto" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "estado" "EstadoPresupuesto" NOT NULL DEFAULT 'CREADO',
    "descargaPresupuestoId" INTEGER,
    "proveedorId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "solicitudPresupuestoId" INTEGER NOT NULL,

    CONSTRAINT "Presupuesto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialEstadoPresupuesto" (
    "id" SERIAL NOT NULL,
    "estado" "EstadoPresupuesto" NOT NULL,
    "presupuestoId" INTEGER NOT NULL,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "available" BOOLEAN NOT NULL,

    CONSTRAINT "HistorialEstadoPresupuesto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descargaPresupuesto" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fechaDescarga" TIMESTAMP(3) NOT NULL,
    "idPago" INTEGER NOT NULL,

    CONSTRAINT "descargaPresupuesto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitudPresupuesto" (
    "id" SERIAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'CREADA',

    CONSTRAINT "SolicitudPresupuesto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialEstadoSolicitud" (
    "id" SERIAL NOT NULL,
    "estado" "EstadoSolicitud" NOT NULL,
    "solicitudPresupuestoId" INTEGER NOT NULL,
    "fechaModificacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "available" BOOLEAN NOT NULL,

    CONSTRAINT "HistorialEstadoSolicitud_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_descripcionId_key" ON "Product"("descripcionId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_tiposUsoId_key" ON "Product"("tiposUsoId");

-- CreateIndex
CREATE INDEX "Product_available_idx" ON "Product"("available");

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_userId_productId_key" ON "Favorito"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Comentario_userId_productId_key" ON "Comentario"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedores_email_key" ON "Proveedores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedores_telefono_key" ON "Proveedores"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Presupuesto_descargaPresupuestoId_key" ON "Presupuesto"("descargaPresupuestoId");

-- CreateIndex
CREATE UNIQUE INDEX "Presupuesto_proveedorId_key" ON "Presupuesto"("proveedorId");

-- CreateIndex
CREATE UNIQUE INDEX "Presupuesto_productoId_key" ON "Presupuesto"("productoId");

-- CreateIndex
CREATE UNIQUE INDEX "Presupuesto_solicitudPresupuestoId_key" ON "Presupuesto"("solicitudPresupuestoId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tipoProductoId_fkey" FOREIGN KEY ("tipoProductoId") REFERENCES "TipoProducto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_descripcionId_fkey" FOREIGN KEY ("descripcionId") REFERENCES "Descripcion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tiposUsoId_fkey" FOREIGN KEY ("tiposUsoId") REFERENCES "TipoUso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoCategoria" ADD CONSTRAINT "ProductoCategoria_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoCategoria" ADD CONSTRAINT "ProductoCategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoProducto" ADD CONSTRAINT "TipoProducto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipoProducto" ADD CONSTRAINT "TipoProducto_tipoPadreId_fkey" FOREIGN KEY ("tipoPadreId") REFERENCES "TipoProducto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DescuentoProducto" ADD CONSTRAINT "DescuentoProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receta" ADD CONSTRAINT "Receta_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presupuesto" ADD CONSTRAINT "Presupuesto_descargaPresupuestoId_fkey" FOREIGN KEY ("descargaPresupuestoId") REFERENCES "descargaPresupuesto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presupuesto" ADD CONSTRAINT "Presupuesto_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presupuesto" ADD CONSTRAINT "Presupuesto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presupuesto" ADD CONSTRAINT "Presupuesto_solicitudPresupuestoId_fkey" FOREIGN KEY ("solicitudPresupuestoId") REFERENCES "SolicitudPresupuesto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEstadoPresupuesto" ADD CONSTRAINT "HistorialEstadoPresupuesto_presupuestoId_fkey" FOREIGN KEY ("presupuestoId") REFERENCES "Presupuesto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudPresupuesto" ADD CONSTRAINT "SolicitudPresupuesto_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEstadoSolicitud" ADD CONSTRAINT "HistorialEstadoSolicitud_solicitudPresupuestoId_fkey" FOREIGN KEY ("solicitudPresupuestoId") REFERENCES "SolicitudPresupuesto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
