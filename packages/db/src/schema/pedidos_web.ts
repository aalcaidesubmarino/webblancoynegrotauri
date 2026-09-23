import { pgTable, text, numeric, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const pedidosWeb = pgTable('pedidos_web', {
  id: text('id').primaryKey(),
  numeroPedido: text('numero_pedido').notNull().unique(), // Ej: "#BYN-8421"
  clienteNombre: text('cliente_nombre').notNull(),
  clienteEmail: text('cliente_email').notNull(),
  clienteTelefono: text('cliente_telefono').notNull(),
  entregaTipo: text('entrega_tipo').notNull(), // 'tienda' | 'envio'
  direccion: text('direccion'),
  ciudad: text('ciudad'),
  codigoPostal: text('codigo_postal'),
  metodoPago: text('metodo_pago').notNull(), // 'bizum' | 'tienda'
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
  items: jsonb('items').default([]),
  estado: text('estado').default('pendiente'), // 'pendiente' | 'pagado' | 'preparado' | 'entregado'
  notas: text('notas'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export type PedidoWeb = typeof pedidosWeb.$inferSelect;
export type NuevoPedidoWeb = typeof pedidosWeb.$inferInsert;
