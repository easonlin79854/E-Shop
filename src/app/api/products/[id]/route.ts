import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { translations } from '@/lib/i18n';

/** Returns true when the error indicates a foreign-key / RESTRICT violation */
function isForeignKeyError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  // Prisma known-request error with code P2003
  if ('code' in error && (error as { code: string }).code === 'P2003') return true;
  // PrismaClientUnknownRequestError – Postgres code 23001 surfaced in the message
  const msg = error.message;
  if (
    msg.includes('23001') ||
    msg.includes('foreign key constraint') ||
    msg.includes('violates RESTRICT') ||
    msg.toLowerCase().includes('orderitem_productid_fkey')
  ) {
    return true;
  }
  return false;
}

/** Pick zh/en from Accept-Language header (defaults to zh) */
function pickLang(req: NextRequest): 'zh' | 'en' {
  const al = req.headers.get('accept-language') ?? '';
  return al.toLowerCase().startsWith('en') ? 'en' : 'zh';
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    const { id } = await params;

    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete product error:', error);

    if (isForeignKeyError(error)) {
      const lang = pickLang(req);
      const message = translations[lang].deleteProductReferenced;
      return NextResponse.json({ error: message }, { status: 409 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
