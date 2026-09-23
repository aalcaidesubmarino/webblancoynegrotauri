import { pgTable, text, numeric, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const cajaSesiones = pgTable('caja_sesiones', {
  id: text('id').primaryKey(),
  fechaApertura: timestamp('fecha_apertura', { withTimezone: true }).notNull(),
  fechaCierre: timestamp('fecha_cierre', { withTimezone: true }),
  fondoApertura: numeric('fondo_apertura', { precision: 10, scale: 2 }).notNull(),
  totalEfectivo: numeric('total_efectivo', { precision: 10, scale: 2 }).default('0.00'),
  totalTarjeta: numeric('total_tarjeta', { precision: 10, scale: 2 }).default('0.00'),
  totalBizum: numeric('total_bizum', { precision: 10, scale: 2 }).default('0.00'),
  totalTransferencia: numeric('total_transferencia', { precision: 10, scale: 2 }).default('0.00'),
  totalVales: numeric('total_vales', { precision: 10, scale: 2 }).default('0.00'),
  totalEntradasManuales: numeric('total_entradas_manuales', { precision: 10, scale: 2 }).default('0.00'),
  totalSalidasManuales: numeric('total_salidas_manuales', { precision: 10, scale: 2 }).default('0.00'),
  totalVentas: numeric('total_ventas', { precision: 10, scale: 2 }).default('0.00'),
  esperadoEnCaja: numeric('esperado_en_caja', { precision: 10, scale: 2 }).default('0.00'),
  contadoEnCaja: numeric('contado_en_caja', { precision: 10, scale: 2 }),
  desgloseMonedas: jsonb('desglose_monedas').$type<Record<string, number>>().default({}), // Conteo de billetes y monedas (500€ a 0.01€)
  descuadre: numeric('descuadre', { precision: 10, scale: 2 }),
  fondoSiguienteDia: numeric('fondo_siguiente_dia', { precision: 10, scale: 2 }),
  retiradaEfectivo: numeric('retirada_efectivo', { precision: 10, scale: 2 }),
  cerrada: boolean('cerrada').default(false),
  observaciones: text('observaciones'),
  totalSesiones: numeric('total_sesiones', { precision: 10, scale: 2 }).default('0.00'),
  totalProductos: numeric('total_productos', { precision: 10, scale: 2 }).default('0.00'),
  ventasCount: integer('ventas_count').default(0),
  totalCoste: numeric('total_coste', { precision: 10, scale: 2 }).default('0.00'),
  totalBeneficio: numeric('total_beneficio', { precision: 10, scale: 2 }).default('0.00'),
  margenPorcentaje: numeric('margen_porcentaje', { precision: 5, scale: 2 }).default('0.00'),
  archivado: boolean('archivado').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const cajaMovimientos = pgTable('caja_movimientos', {
  id: text('id').primaryKey(),
  cajaSesionId: text('caja_sesion_id').notNull(),
  tipo: text('tipo').notNull(), // 'entrada' | 'salida'
  importe: numeric('importe', { precision: 10, scale: 2 }).notNull(),
  concepto: text('concepto').notNull(), // Ej: 'Retirada de efectivo / Propietario', 'Aportación de cambio', etc.
  fecha: timestamp('fecha', { withTimezone: true }).notNull(),
  usuario: text('usuario'),
  notas: text('notas'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type CajaSesion = typeof cajaSesiones.$inferSelect;
export type NuevaCajaSesion = typeof cajaSesiones.$inferInsert;
export type CajaMovimiento = typeof cajaMovimientos.$inferSelect;
export type NuevoCajaMovimiento = typeof cajaMovimientos.$inferInsert;
