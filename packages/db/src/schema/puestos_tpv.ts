import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const puestosTpv = pgTable('puestos_tpv', {
  machineId: text('machine_id').primaryKey(),
  hostname: text('hostname'),
  prefijo: text('prefijo').notNull(), // 'A', 'B', 'C' para numeración independiente de tickets
  ultimoAcceso: timestamp('ultimo_acceso', { withTimezone: true }).defaultNow(),
});

export type PuestoTpv = typeof puestosTpv.$inferSelect;
export type NuevoPuestoTpv = typeof puestosTpv.$inferInsert;
