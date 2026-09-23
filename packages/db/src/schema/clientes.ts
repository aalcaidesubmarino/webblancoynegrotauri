import { pgTable, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
  id: text('id').primaryKey(),
  nombre: text('nombre').notNull(),
  cifNif: text('cif_nif'),
  email: text('email'),
  telefono: text('telefono'),
  direccion: text('direccion'),
  codigoPostal: text('codigo_postal'),
  ciudad: text('ciudad'),
  provincia: text('provincia'),
  notas: text('notas'),
  archivado: boolean('archivado').default(false),
  consentimientoComunicaciones: boolean('consentimiento_comunicaciones').default(false),
  consentimientoTerapias: boolean('consentimiento_terapias').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type Cliente = typeof clientes.$inferSelect;
export type NuevoCliente = typeof clientes.$inferInsert;
