/**
 * Calcula el dígito de control para un código EAN-13 a partir de los primeros 12 dígitos.
 */
export function calcularDigitoControlEAN13(primeros12: string): string {
  if (primeros12.length !== 12 || !/^\d{12}$/.test(primeros12)) {
    throw new Error('El código debe contener exactamente 12 dígitos numéricos.');
  }

  let suma = 0;
  for (let i = 0; i < 12; i++) {
    const num = parseInt(primeros12[i], 10);
    // Posiciones impares x1, pares x3 (0-indexed: par x1, impar x3)
    suma += i % 2 === 0 ? num : num * 3;
  }

  const modulo = suma % 10;
  const digito = modulo === 0 ? 0 : 10 - modulo;
  return digito.toString();
}

/**
 * Valida si un código EAN-13 completo de 13 dígitos es matemáticamente válido.
 */
export function esEAN13Valido(codigo: string): boolean {
  if (!codigo || codigo.length !== 13 || !/^\d{13}$/.test(codigo)) {
    return false;
  }

  const primeros12 = codigo.slice(0, 12);
  const digitoControlEsperado = calcularDigitoControlEAN13(primeros12);
  return codigo[12] === digitoControlEsperado;
}

/**
 * Genera un código EAN-13 interno válido usando el prefijo de circulación interna (200 a 299).
 */
export function generarEAN13Interno(correlativo: number): string {
  const pad = correlativo.toString().padStart(9, '0').slice(-9);
  const primeros12 = `200${pad}`;
  const digitoControl = calcularDigitoControlEAN13(primeros12);
  return `${primeros12}${digitoControl}`;
}

/**
 * Genera el identificador único canónico para un ticket de venta en TPV.
 * Formato: T[YY]-[PREFIJO][CORRELATIVO 6 DÍGITOS] (ej: "T26-A000142")
 */
export function generarNumeroTicket(prefijoPuesto: string, correlativo: number, fecha: Date = new Date()): string {
  const yy = fecha.getFullYear().toString().slice(-2);
  const pad = correlativo.toString().padStart(6, '0');
  const pref = (prefijoPuesto || 'A').toUpperCase().trim();
  return `T${yy}-${pref}${pad}`;
}

/**
 * Genera el identificador para facturas ordinarias o simplificadas.
 * Formato: F[YY]-[CORRELATIVO 5 DÍGITOS] (ej: "F26-00042")
 */
export function generarNumeroFactura(correlativo: number, esRectificativa: boolean = false, fecha: Date = new Date()): string {
  const yy = fecha.getFullYear().toString().slice(-2);
  const pad = correlativo.toString().padStart(5, '0');
  const letra = esRectificativa ? 'R' : 'F';
  return `${letra}${yy}-${pad}`;
}

/**
 * Genera el código para un vale de tienda canjeable.
 * Formato: VALE-[YYYY]-[CORRELATIVO 5 DÍGITOS] (ej: "VALE-2026-00015")
 */
export function generarCodigoVale(correlativo: number, fecha: Date = new Date()): string {
  const yyyy = fecha.getFullYear().toString();
  const pad = correlativo.toString().padStart(5, '0');
  return `VALE-${yyyy}-${pad}`;
}

/**
 * Genera el código para un pedido web de la tienda online.
 * Formato: #BYN-[NÚMERO ALEATORIO 4 DÍGITOS] (ej: "#BYN-8421")
 */
export function generarNumeroPedidoWeb(): string {
  const aleatorio = Math.floor(1000 + Math.random() * 9000);
  return `#BYN-${aleatorio}`;
}

/**
 * Patrones de barras Code 128 (Subconjunto B para caracteres alfanuméricos ASCII 32 a 127).
 * Retorna la secuencia de anchuras de barras y espacios (1 a 4).
 */
export function codificarCode128B(texto: string): number[] {
  // Código de inicio B: valor 104
  const START_B = 104;
  const STOP = 106;

  const valores: number[] = [START_B];
  let sumaChecksum = START_B;

  for (let i = 0; i < texto.length; i++) {
    const charCode = texto.charCodeAt(i);
    const valor = charCode - 32; // Mapeo estándar Code 128 B
    if (valor >= 0 && valor <= 95) {
      valores.push(valor);
      sumaChecksum += valor * (i + 1);
    }
  }

  const checksum = sumaChecksum % 103;
  valores.push(checksum);
  valores.push(STOP);

  return valores;
}
