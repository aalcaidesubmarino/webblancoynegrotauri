/**
 * Formatea un valor numérico o string como divisa en Euros (€) con formato español (1.234,56 €).
 */
export function formatEuro(cantidad: number | string | null | undefined): string {
  if (cantidad === null || cantidad === undefined || cantidad === '') {
    return '0,00 €';
  }

  const num = typeof cantidad === 'string' ? parseFloat(cantidad) : cantidad;
  if (isNaN(num)) {
    return '0,00 €';
  }

  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Formatea un número porcentual (ej: 21 -> "21,00 %").
 */
export function formatPorcentaje(valor: number | string | null | undefined): string {
  if (valor === null || valor === undefined || valor === '') {
    return '0,00 %';
  }

  const num = typeof valor === 'string' ? parseFloat(valor) : valor;
  if (isNaN(num)) {
    return '0,00 %';
  }

  return `${num.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;
}

/**
 * Formatea un objeto Date o cadena ISO a formato de fecha legible en España (DD/MM/YYYY).
 */
export function formatFecha(fecha: Date | string | null | undefined): string {
  if (!fecha) return '-';
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(d.getTime())) return '-';

  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/**
 * Formatea la hora en formato HH:MM (24h).
 */
export function formatHora(fecha: Date | string | null | undefined): string {
  if (!fecha) return '-';
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(d.getTime())) return '-';

  return d.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Formatea fecha y hora combinada (DD/MM/YYYY HH:MM).
 */
export function formatFechaHora(fecha: Date | string | null | undefined): string {
  if (!fecha) return '-';
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
  if (isNaN(d.getTime())) return '-';

  return `${formatFecha(d)} ${formatHora(d)}`;
}
