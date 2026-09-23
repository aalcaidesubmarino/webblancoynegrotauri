/**
 * Redondeo financiero preciso a 2 decimales para evitar desajustes de coma flotante.
 */
export function redondear2(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/**
 * Redondeo de coste / PMP a 4 decimales para mayor precisión en almacén.
 */
export function redondear4(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 10000) / 10000;
}

/**
 * Cálculo del Precio Medio Ponderado (PMP).
 * Fórmula: PMP = ((StockAnterior * CosteAnterior) + (UnidadesNuevas * CosteNuevo)) / (StockAnterior + UnidadesNuevas)
 * Si el stock previo es <= 0, el nuevo PMP adopta directamente el nuevo coste.
 */
export function calcularPMP(
  stockPrevio: number,
  costePrevio: number,
  unidadesNuevas: number,
  nuevoCoste: number
): number {
  const stockValido = Math.max(0, stockPrevio);
  const unidadesValidas = Math.max(0, unidadesNuevas);

  if (unidadesValidas === 0) {
    return redondear4(costePrevio);
  }

  if (stockValido === 0) {
    return redondear4(nuevoCoste);
  }

  const valorTotalPrevio = stockValido * costePrevio;
  const valorTotalNuevo = unidadesValidas * nuevoCoste;
  const stockTotal = stockValido + unidadesValidas;

  return redondear4((valorTotalPrevio + valorTotalNuevo) / stockTotal);
}

/**
 * Desglose de Base Imponible y Cuota de IVA a partir de un PVP que ya incluye impuestos.
 */
export function desglosarIvaDesdePvp(pvp: number, porcentajeIva: number = 21): {
  baseImponible: number;
  cuotaIva: number;
  total: number;
} {
  const pvpRedondeado = redondear2(pvp);
  const factor = 1 + porcentajeIva / 100;
  const baseImponible = redondear2(pvpRedondeado / factor);
  const cuotaIva = redondear2(pvpRedondeado - baseImponible);

  return {
    baseImponible,
    cuotaIva,
    total: pvpRedondeado,
  };
}

/**
 * Cálculo de IVA y Recargo de Equivalencia (Régimen Especial de Comercio Minorista Español).
 */
export function calcularIvaYRecargo(
  baseImponible: number,
  porcentajeIva: number = 21,
  porcentajeRecargo: number = 5.2
): {
  baseImponible: number;
  cuotaIva: number;
  cuotaRecargo: number;
  totalFactura: number;
} {
  const bi = redondear2(baseImponible);
  const cuotaIva = redondear2(bi * (porcentajeIva / 100));
  const cuotaRecargo = redondear2(bi * (porcentajeRecargo / 100));
  const totalFactura = redondear2(bi + cuotaIva + cuotaRecargo);

  return {
    baseImponible: bi,
    cuotaIva,
    cuotaRecargo,
    totalFactura,
  };
}

/**
 * Cálculo de márgenes comerciales sobre PVP y sobre Coste (Markup).
 */
export function calcularMargenes(
  pvpConIva: number,
  costeUnitario: number,
  porcentajeIva: number = 21
): {
  baseImponible: number;
  coste: number;
  beneficioBruto: number;
  margenSobreVentaPorcentaje: number;
  markupSobreCostePorcentaje: number;
} {
  const { baseImponible } = desglosarIvaDesdePvp(pvpConIva, porcentajeIva);
  const coste = redondear2(costeUnitario);
  const beneficioBruto = redondear2(baseImponible - coste);

  const margenSobreVentaPorcentaje =
    baseImponible > 0 ? redondear2((beneficioBruto / baseImponible) * 100) : 0;

  const markupSobreCostePorcentaje =
    coste > 0 ? redondear2((beneficioBruto / coste) * 100) : 0;

  return {
    baseImponible,
    coste,
    beneficioBruto,
    margenSobreVentaPorcentaje,
    markupSobreCostePorcentaje,
  };
}

/**
 * Propuesta de precio comercial con terminación psicológica (.95, .90, .50).
 */
export function calcularPvpPropuesto(
  coste: number,
  margenDeseadoPorcentaje: number = 50,
  porcentajeIva: number = 21,
  terminacion: '95' | '90' | '50' | 'exacto' = '95'
): number {
  if (coste <= 0) return 0;
  // Margen sobre venta: PVP_sin_iva = Coste / (1 - Margen%)
  const factorMargen = Math.max(0.01, 1 - margenDeseadoPorcentaje / 100);
  const pvpSinIva = coste / factorMargen;
  const pvpConIva = pvpSinIva * (1 + porcentajeIva / 100);

  if (terminacion === 'exacto') {
    return redondear2(pvpConIva);
  }

  const parteEntera = Math.floor(pvpConIva);
  const centimos = parseInt(terminacion, 10) / 100;
  const resultado = parteEntera + centimos;

  return resultado < pvpConIva ? redondear2(resultado + 1) : redondear2(resultado);
}

/**
 * Suma total de desglose de efectivo (billetes y monedas de 500€ a 0.01€).
 */
export function calcularTotalEfectivo(desglose: Record<string, number | undefined>): number {
  const valores: Record<string, number> = {
    b500: 500,
    b200: 200,
    b100: 100,
    b50: 50,
    b20: 20,
    b10: 10,
    b5: 5,
    m2: 2,
    m1: 1,
    m050: 0.5,
    m020: 0.2,
    m010: 0.1,
    m005: 0.05,
    m002: 0.02,
    m001: 0.01,
  };

  let total = 0;
  for (const [clave, cantidad] of Object.entries(desglose)) {
    if (cantidad && valores[clave]) {
      total += cantidad * valores[clave];
    }
  }

  return redondear2(total);
}
