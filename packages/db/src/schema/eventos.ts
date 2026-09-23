import { pgTable, text, numeric, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const eventosCitas = pgTable('eventos_citas', {
  id: text('id').primaryKey(),
  titulo: text('titulo').notNull(),
  tipo: text('tipo').notNull(), // 'cita_individual' | 'taller_grupal'
  servicioId: text('servicio_id'),
  clienteNombre: text('cliente_nombre').notNull(),
  clienteTelefono: text('cliente_telefono'),
  clienteEmail: text('cliente_email'),
  fechaInicio: timestamp('fecha_inicio', { withTimezone: true }).notNull(),
  fechaFin: timestamp('fecha_fin', { withTimezone: true }).notNull(),
  plazas: integer('plazas'),
  precio: numeric('precio', { precision: 10, scale: 2 }),
  publicadoWeb: boolean('publicado_web').default(false),
  descripcion: text('descripcion'),
  notas: text('notas'),
  estado: text('estado').default('confirmada'), // 'confirmada' | 'pendiente' | 'cancelada' | 'completada'
  archivado: boolean('archivado').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type EventoCita = typeof eventosCitas.$inferSelect;
export type NuevoEventoCita = typeof eventosCitas.$inferInsert;
