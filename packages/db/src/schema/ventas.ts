import { pgTable, text, numeric, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export interface LineaTicketItem {
  productoId: string;
  ean?: string;
  ref?: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  descuentoTipo?: 'porcentaje' | 'fijo';
  descuentoValor?: number;
  precioFinal: number;
  subtotal: number;
  precioCoste?: number;
  iva?: number;
}

export const ventasTickets = pgTable('ventas_tickets', {
  id: text('id').primaryKey(),
  numeroTicket: text('numero_ticket').notNull().unique(), // Ej: "T26-A000142" o "FS-2026-0001"
  fecha: timestamp('fecha', { withTimezone: true }).notNull(),
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
  subtotal: numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
  impuestos: numeric('impuestos', { precision: 10, scale: 2 }).notNull(),
  metodoPago: text('metodo_pago').notNull(), // 'efectivo' | 'tarjeta' | 'bizum' | 'transferencia' | 'vale' | 'mixto'
  estado: text('estado').default('completada'), // 'completada' | 'anulada'
  lineas: jsonb('lineas').$type<LineaTicketItem[]>().default([]),
  clienteId: text('cliente_id'),
  clienteNombre: text('cliente_nombre'),
  clienteCif: text('cliente_cif'),
  clienteDireccion: text('cliente_direccion'),
  clienteTelefono: text('cliente_telefono'),
  facturado: boolean('facturado').default(false),
  numeroFactura: text('numero_factura'),
  notas: text('notas'),
  cajaSesionId: text('caja_sesion_id').notNull(),
  archivado: boolean('archivado').default(false),
  descuentoGlobalTipo: text('descuento_global_tipo'), // 'porcentaje' | 'fijo'
  descuentoGlobalValor: numeric('descuento_global_valor', { precision: 10, scale: 2 }),
  importeEntregado: numeric('importe_entregado', { precision: 10, scale: 2 }),
  cambio: numeric('cambio', { precision: 10, scale: 2 }),
  tipoDocumento: text('tipo_documento').default('ticket'), // 'ticket' | 'abono'
  ticketOrigenId: text('ticket_origen_id'),
  ticketOrigenNumero: text('ticket_origen_numero'),
  motivoDevolucion: text('motivo_devolucion'),
  datosTransferenciaDevolucion: text('datos_transferencia_devolucion'),
  unidadesDevueltas: jsonb('unidades_devueltas').$type<Record<string, number>>().default({}),
  devolucionEstado: text('devolucion_estado'), // 'ninguna' | 'parcial' | 'total'
  esTicketRegalo: boolean('es_ticket_regalo').default(false),
  regaloEstado: text('regalo_estado'), // 'pendiente' | 'canjeado'
  regaloFechaCanje: text('regalo_fecha_canje'),
  regaloCanjeadoNotas: text('regalo_canjeado_notas'),
  valeCodigoAplicado: text('vale_codigo_aplicado'),
  valeDescuentoImporte: numeric('vale_descuento_importe', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type VentaTicket = typeof ventasTickets.$inferSelect;
export type NuevaVentaTicket = typeof ventasTickets.$inferInsert;
