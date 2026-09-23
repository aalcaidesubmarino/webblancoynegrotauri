import { pgTable, text, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const seccionesWeb = pgTable('secciones_web', {
  id: text('id').primaryKey(), // 'sec-hero', 'sec-garantias', 'sec-tienda', 'sec-bienestar', 'sec-terapias', 'sec-sobre_mi', 'sec-faq', 'sec-footer'
  titulo: text('titulo').notNull(),
  subtitulo: text('subtitulo'),
  tipoPlantilla: text('tipo_plantilla').notNull(),
  orden: integer('orden').default(1),
  activo: boolean('activo').default(true),
  contenido: jsonb('contenido').default({}),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type SeccionWeb = typeof seccionesWeb.$inferSelect;
export type NuevaSeccionWeb = typeof seccionesWeb.$inferInsert;
