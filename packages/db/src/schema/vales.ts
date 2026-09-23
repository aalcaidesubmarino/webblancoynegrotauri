import { pgTable, text, numeric, timestamp } from 'drizzle-orm/pg-core';

export const valesTienda = pgTable('vales_tienda', {
  id: text('id').primaryKey(),
  codigo: text('codigo').notNull().unique(), // Ej: "VALE-2026-00001"
  importeOriginal: numeric('importe_original', { precision: 10, scale: 2 }).notNull(),
  saldoRestante: numeric('saldo_restante', { precision: 10, scale: 2 }).notNull(),
  fechaCreacion: timestamp('fecha_creacion', { withTimezone: true }).notNull(),
  fechaCaducidad: timestamp('fecha_caducidad', { withTimezone: true }),
  fechaCanje: timestamp('fecha_canje', { withTimezone: true }),
  estado: text('estado').default('activo'), // 'activo' | 'canjeado' | 'caducado' | 'agotado'
  ticketOrigenId: text('ticket_origen_id'),
  ticketOrigenNumero: text('ticket_origen_numero'),
  ticketAbonoNumero: text('ticket_abono_numero'),
  clienteId: text('cliente_id'),
  clienteNombre: text('cliente_nombre'),
  motivo: text('motivo'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type ValeTienda = typeof valesTienda.$inferSelect;
export type NuevoValeTienda = typeof valesTienda.$inferInsert;
