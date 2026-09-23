export type CategoriaProducto =
  | 'terapias'
  | 'aromaterapia'
  | 'minerales'
  | 'herramientas'
  | 'espacios'
  | 'general';

export type MetodoPago =
  | 'efectivo'
  | 'tarjeta'
  | 'bizum'
  | 'transferencia'
  | 'vale'
  | 'mixto';

export type EstadoTicket = 'completada' | 'anulada';

export type TipoDocumento = 'ticket' | 'abono';

export type EstadoDevolucion = 'ninguna' | 'parcial' | 'total';

export type EstadoVale = 'activo' | 'canjeado' | 'caducado' | 'agotado';

export type TipoEvento = 'cita_individual' | 'taller_grupal';

export type EstadoEvento = 'confirmada' | 'pendiente' | 'cancelada' | 'completada';

export type EstadoPedidoWeb = 'pendiente' | 'pagado' | 'preparado' | 'entregado';

export type TipoEntrega = 'tienda' | 'envio';

export type TipoServicio = 'terapia' | 'cuidado' | 'ninguno';

export type DescuentoTipo = 'porcentaje' | 'fijo';

export interface LineaTicket {
  productoId: string;
  ean?: string;
  ref?: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  descuentoTipo?: DescuentoTipo;
  descuentoValor?: number;
  precioFinal: number;
  subtotal: number;
  precioCoste?: number;
  iva?: number;
}

export interface LineaRecepcion {
  productoId: string;
  ref?: string;
  nombre: string;
  cantidad: number;
  costeUnitario: number;
  costeAnterior: number;
  stockAnterior: number;
  pmpCalculado: number;
  pvpActual: number;
  pvpPropuesto: number;
  subtotal: number;
}

export interface LineaFactura {
  concepto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  ivaPorcentaje: number;
  cuotaIva: number;
  total: number;
}

export interface DesgloseMonedas {
  b500?: number;
  b200?: number;
  b100?: number;
  b50?: number;
  b20?: number;
  b10?: number;
  b5?: number;
  m2?: number;
  m1?: number;
  m050?: number;
  m020?: number;
  m010?: number;
  m005?: number;
  m002?: number;
  m001?: number;
}

export interface Familia {
  id: string;
  nombre: string;
  descripcion?: string;
  icono?: string;
  orden: number;
  activo: boolean;
}

export interface Bienestar {
  id: string;
  nombre: string;
  subtitulo?: string;
  color?: string;
  icono?: string;
  descripcion?: string;
  orden: number;
  activo: boolean;
}

export interface DatosNegocio {
  nombreComercial: string;
  titular: string;
  cifNif: string;
  direccion: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  telefono: string;
  email: string;
  webUrl: string;
  pieTicket?: string;
  registroMercantil?: string;
}

export interface ConfigFiscal {
  regimenComercio: 'recargo_equivalencia' | 'general';
  ivaGeneral: number; // 21.00
  recargoEquivalenciaGeneral: number; // 5.20
  ivaReducido: number; // 10.00
  recargoEquivalenciaReducido: number; // 1.40
  ivaSuperreducido: number; // 4.00
  recargoEquivalenciaSuperreducido: number; // 0.50
  retencionAlquiler: number; // 19.00
  pagoFraccionadoIrpf: number; // 20.00
}

export interface ConfigSMTP {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  notificarArqueosDiarios: boolean;
  emailArqueosDestino?: string;
}
