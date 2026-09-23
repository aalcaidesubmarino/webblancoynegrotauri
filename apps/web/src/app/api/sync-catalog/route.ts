import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    const expectedSecret = process.env.REVALIDATE_SECRET || 'aura-pepi-secret-key';

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: 'Token no autorizado.' }, { status: 401 });
    }

    // Revalidar portada y catálogo
    revalidatePath('/', 'page');

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: 'Catálogo sincronizado y revalidado con éxito.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error durante la revalidación del catálogo', details: error?.message },
      { status: 500 }
    );
  }
}
