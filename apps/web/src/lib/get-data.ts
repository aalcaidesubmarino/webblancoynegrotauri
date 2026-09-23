import { db, productos, seccionesWeb } from '@repo/db';
import { eq, and, desc } from 'drizzle-orm';
import { SECCIONES_WEB_CANONICAS } from '@repo/shared';

export interface ProductoWebItem {
  id: string;
  ref: string | null;
  ean: string | null;
  nombre: string;
  categoria: string;
  categoriaLabel: string | null;
  precioVenta: number;
  precioAnterior: number | null;
  stockActual: number;
  esServicio: boolean;
  descripcionCorta: string | null;
  imagenUrl: string | null;
  destacado: string | null;
  familiaId: string | null;
  familiaNombre: string | null;
  bienestarId: string | null;
}

// Productos de muestra para cuando la base de datos se inicializa en blanco
const PRODUCTOS_FALLBACK: ProductoWebItem[] = [
  {
    id: 'prod-amatista-drusa',
    ref: 'MIN-AMAT-01',
    ean: '2000000001012',
    nombre: 'Drusa de Amatista Natural de Uruguay',
    categoria: 'minerales',
    categoriaLabel: 'Minerales & Cristales',
    precioVenta: 24.95,
    precioAnterior: 29.00,
    stockActual: 5,
    esServicio: false,
    descripcionCorta: 'Pieza de alta vibración para transmutar energía, favorecer el descanso y calmar la mente.',
    imagenUrl: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80',
    destacado: 'Pieza Única',
    familiaId: 'minerales',
    familiaNombre: 'Minerales',
    bienestarId: 'calma-ansiedad',
  },
  {
    id: 'prod-aceite-lavanda',
    ref: 'ARO-LAV-01',
    ean: '2000000001029',
    nombre: 'Aceite Esencial Puro de Lavanda Silvestre (15ml)',
    categoria: 'aromaterapia',
    categoriaLabel: 'Aromaterapia & Esencias',
    precioVenta: 14.50,
    precioAnterior: null,
    stockActual: 12,
    esServicio: false,
    descripcionCorta: '100% puro y quimiotipado. Induce un sueño reparador y serena tensiones nerviosas.',
    imagenUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    destacado: 'Más Vendido',
    familiaId: 'aromaterapia',
    familiaNombre: 'Aromaterapia',
    bienestarId: 'calma-ansiedad',
  },
  {
    id: 'prod-vela-soja-salvia',
    ref: 'VEL-SOJ-01',
    ean: '2000000001036',
    nombre: 'Vela de Soja Terapéutica "Limpieza & Paz"',
    categoria: 'velas',
    categoriaLabel: 'Velas Terapéuticas',
    precioVenta: 18.90,
    precioAnterior: 22.00,
    stockActual: 8,
    esServicio: false,
    descripcionCorta: 'Cera vegetal de soja con hojas de salvia blanca y aceite esencial de cedro.',
    imagenUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80',
    destacado: 'Esencial Zen',
    familiaId: 'velas',
    familiaNombre: 'Velas',
    bienestarId: 'hogar-sagrado',
  },
  {
    id: 'prod-sahumerio-palosanto',
    ref: 'INC-PALO-01',
    ean: '2000000001043',
    nombre: 'Atado Sagrado de Palo Santo & Salvia Blanca',
    categoria: 'inciensos',
    categoriaLabel: 'Inciensos Sagrados',
    precioVenta: 8.95,
    precioAnterior: null,
    stockActual: 20,
    esServicio: false,
    descripcionCorta: 'Recolección silvestre y sostenible de Perú. Purifica espacios y eleva la frecuencia del hogar.',
    imagenUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80',
    destacado: null,
    familiaId: 'inciensos',
    familiaNombre: 'Inciensos',
    bienestarId: 'hogar-sagrado',
  },
  {
    id: 'prod-cuarzo-rosa-corazon',
    ref: 'MIN-CROSA-01',
    ean: '2000000001050',
    nombre: 'Corazón Pulido de Cuarzo Rosa de Madagascar',
    categoria: 'minerales',
    categoriaLabel: 'Minerales & Cristales',
    precioVenta: 12.90,
    precioAnterior: null,
    stockActual: 6,
    esServicio: false,
    descripcionCorta: 'La piedra del amor incondicional, compasión y apertura del chakra cardíaco.',
    imagenUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    destacado: 'Más Vendido',
    familiaId: 'minerales',
    familiaNombre: 'Minerales',
    bienestarId: 'amor-propio',
  },
  {
    id: 'prod-difusor-ceramica',
    ref: 'QUE-CER-01',
    ean: '2000000001067',
    nombre: 'Quemador Artesanal de Cerámica & Bambú',
    categoria: 'quemadores',
    categoriaLabel: 'Quemadores & Difusores',
    precioVenta: 22.50,
    precioAnterior: 26.00,
    stockActual: 4,
    esServicio: false,
    descripcionCorta: 'Diseño minimalista para evaporar esencias con vela de té de forma suave y duradera.',
    imagenUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    destacado: null,
    familiaId: 'quemadores',
    familiaNombre: 'Quemadores',
    bienestarId: 'hogar-sagrado',
  },
];

export async function getProductosWeb(): Promise<ProductoWebItem[]> {
  try {
    const rows = await db
      .select()
      .from(productos)
      .where(
        and(
          eq(productos.publicadoWeb, true),
          eq(productos.archivado, false)
        )
      )
      .orderBy(desc(productos.orden));

    if (rows && rows.length > 0) {
      return rows.map((p) => ({
        id: p.id,
        ref: p.ref,
        ean: p.ean,
        nombre: p.nombre,
        categoria: p.categoria,
        categoriaLabel: p.categoriaLabel,
        precioVenta: parseFloat(p.precioVenta) || 0,
        precioAnterior: p.precioAnterior ? parseFloat(p.precioAnterior) : null,
        stockActual: p.stockActual ?? 0,
        esServicio: p.esServicio ?? false,
        descripcionCorta: p.descripcionCorta,
        imagenUrl: p.imagenUrl || (Array.isArray(p.imagenes) && p.imagenes[0] ? p.imagenes[0] : null),
        destacado: p.destacado,
        familiaId: p.familiaId,
        familiaNombre: p.familiaNombre,
        bienestarId: p.bienestarId,
      }));
    }
  } catch (error) {
    console.error('Error consultando productos de Neon en web:', error);
  }

  return PRODUCTOS_FALLBACK;
}

export async function getSeccionesWeb() {
  try {
    const rows = await db
      .select()
      .from(seccionesWeb)
      .where(eq(seccionesWeb.activo, true))
      .orderBy(seccionesWeb.orden);

    if (rows && rows.length > 0) {
      const mapa: Record<string, any> = {};
      for (const s of rows) {
        mapa[s.id] = {
          id: s.id,
          titulo: s.titulo,
          subtitulo: s.subtitulo,
          tipoPlantilla: s.tipoPlantilla,
          contenido: s.contenido,
        };
      }
      return mapa;
    }
  } catch (error) {
    console.error('Error consultando secciones de Neon en web:', error);
  }

  const mapaFallback: Record<string, any> = {};
  for (const s of SECCIONES_WEB_CANONICAS) {
    mapaFallback[s.id] = s;
  }
  return mapaFallback;
}
