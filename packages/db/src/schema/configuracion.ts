import { pgTable, text, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const configuracionTpv = pgTable('configuracion_tpv', {
  id: text('id').primaryKey(), // 'default'
  datos: jsonb('datos').notNull(), // Contiene DatosNegocio, SMTP, ConfigFiscal, Familias, Bienestares
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type ConfiguracionTpv = typeof configuracionTpv.$inferSelect;
export type NuevaConfiguracionTpv = typeof configuracionTpv.$inferInsert;
