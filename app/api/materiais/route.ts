import { NextResponse } from 'next/server';

export async function GET() {
  const API_URL = process.env.API_URL;

  if (!API_URL) {
    return NextResponse.json({ error: 'API_URL não configurada' }, { status: 500 });
  }

  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 3600 } // Cache de 1 hora
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao buscar dados' }, { status: 500 });
  }
}
