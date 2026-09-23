import { pgTable, text, numeric, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const productos = pgTable('productos', {
  id: text('id').primaryKey(), // ID único o UUID
  ref: text('ref'), // Referencia interna (ej: 'MIN-AMAT-01')
  ean: text('ean'), // Código EAN-13 o Code 128
  nombre: text('nombre').notNull(),
  categoria: text('categoria').notNull(), // 'terapias' | 'aromaterapia' | 'minerales' | 'herramientas' | 'espacios' | 'general'
  categoriaLabel: text('categoria_label'),
  precioVenta: numeric('precio_venta', { precision: 10, scale: 2 }).notNull(),
  precioCoste: numeric('precio_coste', { precision: 10, scale: 2 }).default('0.00'),
  precioAnterior: numeric('precio_anterior', { precision: 10, scale: 2 }),
  iva: numeric('iva', { precision: 5, scale: 2 }).default('21.00'),
  stockActual: integer('stock_actual').default(0),
  stockMinimo: integer('stock_minimo').default(0),
  accionAgotado: text('accion_agotado').default('mostrar_agotado'), // 'ocultar' | 'mostrar_agotado' | 'bajo_encargo'
  publicadoWeb: boolean('publicado_web').default(true),
  esServicio: boolean('es_servicio').default(false), // true para masajes, reiki, cabina (sin stock físico)
  duracionMinutos: integer('duracion_minutos'),
  descripcionCorta: text('descripcion_corta'),
  descripcionCompleta: text('descripcion_completa'),
  beneficios: jsonb('beneficios').$type<string[]>().default([]),
  imagenUrl: text('imagen_url'),
  imagenes: jsonb('imagenes').$type<string[]>().default([]),
  destacado: text('destacado'), // 'Más Vendido' | 'Esencial Zen' | 'Pieza Única' | etc.
  archivado: boolean('archivado').default(false), // Soft-delete
  costeIncluyeIva: boolean('coste_incluye_iva').default(false),
  proveedor: text('proveedor'),
  refProveedor: text('ref_proveedor'),
  ubicacion: text('ubicacion'), // Ej: "Estantería B-3"
  lote: text('lote'),
  fechaCaducidad: text('fecha_caducidad'),
  modoUso: text('modo_uso'),
  familiaId: text('familia_id'), // 'minerales', 'aceites', 'quemadores', 'velas', etc.
  familiaNombre: text('familia_nombre'),
  bienestarId: text('bienestar_id'),
  bienestarIds: jsonb('bienestar_ids').$type<string[]>().default([]),
  tipoServicio: text('tipo_servicio'), // 'terapia' | 'cuidado' | 'ninguno'
  esExperienciaEstrella: boolean('es_experiencia_estrella').default(false),
  experienciaEstrellaTitulo: text('experiencia_estrella_titulo'),
  orden: integer('orden').default(0),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type Producto = typeof productos.$inferSelect;
export type NuevoProducto = typeof productos.$inferInsert;
