import { DatosNegocio, ConfigFiscal, Familia, Bienestar } from './types';

export const DATOS_NEGOCIO_DEFAULT: DatosNegocio = {
  nombreComercial: 'Blanco y Negro - Terapias Holísticas y Bienestar',
  titular: 'Josefa Clemente Gómez (Pepi)',
  cifNif: '33292415L',
  direccion: 'Rúa Principal, 42 - Bajo',
  codigoPostal: '15930',
  ciudad: 'Boiro',
  provincia: 'A Coruña',
  telefono: '+34 600 000 000',
  email: 'contacto@blancoynegro.es',
  webUrl: 'https://webblancoynegro.vercel.app',
  pieTicket: 'Gracias por confiar en Blanco y Negro Boiro.\nPara cambios o devoluciones conserve este ticket (15 días).\nNo se devuelve el dinero en efectivo; se emite vale de tienda.',
};

export const CONFIG_FISCAL_DEFAULT: ConfigFiscal = {
  regimenComercio: 'recargo_equivalencia',
  ivaGeneral: 21.0,
  recargoEquivalenciaGeneral: 5.2,
  ivaReducido: 10.0,
  recargoEquivalenciaReducido: 1.4,
  ivaSuperreducido: 4.0,
  recargoEquivalenciaSuperreducido: 0.5,
  retencionAlquiler: 19.0,
  pagoFraccionadoIrpf: 20.0,
};

export const DENOMINACIONES_EFECTIVO = [
  { clave: 'b500', valor: 500, tipo: 'billete', label: '500 €' },
  { clave: 'b200', valor: 200, tipo: 'billete', label: '200 €' },
  { clave: 'b100', valor: 100, tipo: 'billete', label: '100 €' },
  { clave: 'b50', valor: 50, tipo: 'billete', label: '50 €' },
  { clave: 'b20', valor: 20, tipo: 'billete', label: '20 €' },
  { clave: 'b10', valor: 10, tipo: 'billete', label: '10 €' },
  { clave: 'b5', valor: 5, tipo: 'billete', label: '5 €' },
  { clave: 'm2', valor: 2, tipo: 'moneda', label: '2 €' },
  { clave: 'm1', valor: 1, tipo: 'moneda', label: '1 €' },
  { clave: 'm050', valor: 0.5, tipo: 'moneda', label: '50 cts' },
  { clave: 'm020', valor: 0.2, tipo: 'moneda', label: '20 cts' },
  { clave: 'm010', valor: 0.1, tipo: 'moneda', label: '10 cts' },
  { clave: 'm005', valor: 0.05, tipo: 'moneda', label: '5 cts' },
  { clave: 'm002', valor: 0.02, tipo: 'moneda', label: '2 cts' },
  { clave: 'm001', valor: 0.01, tipo: 'moneda', label: '1 ct' },
] as const;

export const FAMILIAS_OFICIALES: Familia[] = [
  { id: 'minerales', nombre: 'Minerales & Cristales', descripcion: 'Gemas naturales, rodados y piezas singulares', icono: 'gem', orden: 1, activo: true },
  { id: 'aromaterapia', nombre: 'Aromaterapia & Esencias', descripcion: 'Aceites esenciales puros y brumas áuricas', icono: 'sparkles', orden: 2, activo: true },
  { id: 'quemadores', nombre: 'Quemadores & Difusores', descripcion: 'Difusores ultrasónicos y quemadores cerámicos', icono: 'flame', orden: 3, activo: true },
  { id: 'velas', nombre: 'Velas Terapéuticas', descripcion: 'Cera de soja natural con hierbas e intenciones', icono: 'candle', orden: 4, activo: true },
  { id: 'inciensos', nombre: 'Inciensos Sagrados & Sahumerios', descripcion: 'Palo Santo, Copal y atados de Salvia blanca', icono: 'wind', orden: 5, activo: true },
  { id: 'cosmetica', nombre: 'Cosmética Natural & Baño Zen', descripcion: 'Jabones artesanales y sales del Himalaya', icono: 'heart', orden: 6, activo: true },
  { id: 'herramientas', nombre: 'Herramientas Holísticas & Péndulos', descripcion: 'Péndulos de cuarzo, cuencos tibetanos y oráculos', icono: 'compass', orden: 7, activo: true },
];

export const BIENESTARES_OFICIALES: Bienestar[] = [
  { id: 'calma-ansiedad', nombre: 'Calma & Serenidad', subtitulo: 'Alivio del estrés y paz interior', color: '#6A8D73', icono: 'moon', descripcion: 'Productos para apaciguar la mente inquieta', orden: 1, activo: true },
  { id: 'energia-vitalidad', nombre: 'Energía & Vitalidad', subtitulo: 'Activación del chakra plexo y dinamismo', color: '#D49B55', icono: 'sun', descripcion: 'Impulso vital para el cuerpo y la voluntad', orden: 2, activo: true },
  { id: 'hogar-sagrado', nombre: 'Hogar Sagrado & Limpieza', subtitulo: 'Purificación energética de estancias', color: '#7E827A', icono: 'home', descripcion: 'Sahumos y campanas para armonizar espacios', orden: 3, activo: true },
  { id: 'abundancia-enfoque', nombre: 'Abundancia & Claridad', subtitulo: 'Magnetismo de proyectos y prosperidad', color: '#B5935B', icono: 'coins', descripcion: 'Minerales como pirita y citrino para enfocar metas', orden: 4, activo: true },
  { id: 'amor-propio', nombre: 'Amor Propio & Armonía', subtitulo: 'Apertura del chakra corazón', color: '#C88D94', icono: 'heart', descripcion: 'Cuarzo rosa y rosas para nutrir el alma', orden: 5, activo: true },
  { id: 'proteccion-energetica', nombre: 'Protección Áurica', subtitulo: 'Escudo ante densidades e interferencias', color: '#3A3F44', icono: 'shield', descripcion: 'Turmalina negra, obsidiana y selenita', orden: 6, activo: true },
];
