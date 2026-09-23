import { pgTable, text, numeric, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const facturas = pgTable('facturas', {
  id: text('id').primaryKey(),
  numeroFactura: text('numero_factura').notNull().unique(), // Ej: "F26-0001" o "R26-0001"
  fecha: timestamp('fecha', { withTimezone: true }).notNull(),
  ticketId: text('ticket_id'),
  numeroTicketOrigen: text('numero_ticket_origen'),
  clienteId: text('cliente_id'),
  clienteNombre: text('cliente_nombre').notNull(),
  clienteCif: text('cliente_cif').notNull(),
  clienteDireccion: text('cliente_direccion'),
  clienteCodigoPostal: text('cliente_codigo_postal'),
  clienteCiudad: text('cliente_ciudad'),
  clienteEmail: text('cliente_email'),
  clienteTelefono: text('cliente_telefono'),
  lineas: jsonb('lineas').default([]),
  baseImponible: numeric('base_imponible', { precision: 10, scale: 2 }).notNull(),
  ivaPorcentaje: numeric('iva_porcentaje', { precision: 5, scale: 2 }).default('21.00'),
  cuotaIva: numeric('cuota_iva', { precision: 10, scale: 2 }).notNull(),
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
  metodoPago: text('metodo_pago').notNull(),
  estado: text('estado').default('emitida'), // 'emitida' | 'anulada'
  notas: text('notas'),
  datosEmpresa: jsonb('datos_empresa'),
  archivado: boolean('archivado').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type Factura = typeof facturas.$inferSelect;
export type NuevaFactura = typeof facturas.$inferInsert;
