import { NextRequest, NextResponse } from 'next/server';
import { db, pedidosWeb } from '@repo/db';
import { generarNumeroPedidoWeb } from '@repo/shared';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      clienteNombre,
      clienteEmail,
      clienteTelefono,
      entregaTipo,
      direccion,
      ciudad,
      codigoPostal,
      metodoPago,
      total,
      items,
      notas,
    } = body;

    // Validación básica de campos obligatorios
    if (!clienteNombre || !clienteEmail || !clienteTelefono || !entregaTipo || !metodoPago) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios para registrar el pedido.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'La cesta de la compra no contiene artículos.' },
        { status: 400 }
      );
    }

    // Generar identificador canónico #BYN-XXXX
    const numeroPedido = generarNumeroPedidoWeb();
    const pedidoId = `ped-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Guardar en Neon Postgres
    await db.insert(pedidosWeb).values({
      id: pedidoId,
      numeroPedido,
      clienteNombre,
      clienteEmail,
      clienteTelefono,
      entregaTipo,
      direccion: direccion || null,
      ciudad: ciudad || null,
      codigoPostal: codigoPostal || null,
      metodoPago,
      total: typeof total === 'number' ? total.toFixed(2) : String(total),
      items: items,
      estado: 'pendiente',
      notas: notas || null,
    });

    return NextResponse.json(
      {
        success: true,
        numeroPedido,
        pedidoId,
        total,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error registrando pedido web en Neon:', error);
    return NextResponse.json(
      {
        error: 'No se pudo registrar el pedido en la base de datos.',
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
