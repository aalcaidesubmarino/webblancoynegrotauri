import { pgTable, text, numeric, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const recepcionesStock = pgTable('recepciones_stock', {
  id: text('id').primaryKey(),
  codigoRecepcion: text('codigo_recepcion').notNull().unique(), // Ej: "REC-20260921-001"
  fecha: timestamp('fecha', { withTimezone: true }).defaultNow(),
  proveedor: text('proveedor'),
  numeroAlbaran: text('numero_albaran'),
  observaciones: text('observaciones'),
  aplicaRecargoEquivalencia: boolean('aplica_recargo_equivalencia').default(true),
  porcentajeRecargoEquivalencia: numeric('porcentaje_recargo_equivalencia', { precision: 5, scale: 2 }).default('5.20'),
  porcentajeIva: numeric('porcentaje_iva', { precision: 5, scale: 2 }).default('21.00'),
  totalArticulos: integer('total_articulos').default(0),
  totalUnidades: integer('total_unidades').default(0),
  totalCosteEstimado: numeric('total_coste_estimado', { precision: 10, scale: 2 }).default('0.00'),
  totalBaseImponible: numeric('total_base_imponible', { precision: 10, scale: 2 }),
  totalCuotaIva: numeric('total_cuota_iva', { precision: 10, scale: 2 }),
  totalCuotaRecargoEquivalencia: numeric('total_cuota_recargo_equivalencia', { precision: 10, scale: 2 }),
  totalFacturaProveedor: numeric('total_factura_proveedor', { precision: 10, scale: 2 }),
  lineas: jsonb('lineas').default([]), // Líneas con PMP, coste anterior, pvp propuesto y stock añadido
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type RecepcionStock = typeof recepcionesStock.$inferSelect;
export type NuevaRecepcionStock = typeof recepcionesStock.$inferInsert;
