import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { translations } from '@/lib/i18n';

function pickLang(req: NextRequest): 'zh' | 'en' {
  const al = req.headers.get('accept-language') ?? '';
  return al.toLowerCase().startsWith('en') ? 'en' : 'zh';
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
    const lang = pickLang(req);
    const t = translations[lang];

    await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id },
        select: { id: true, status: true },
      });

      if (!order) {
        throw Object.assign(new Error(t.orderNotFound), { statusCode: 404 });
      }

      if (order.status !== 'CANCELLED') {
        throw Object.assign(new Error(t.deleteOrderNotCancelled), { statusCode: 409 });
      }

      await tx.orderItem.deleteMany({ where: { orderId: id } });
      await tx.order.delete({ where: { id } });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = (error as Error & { statusCode: number }).statusCode;
      return NextResponse.json({ error: error.message }, { status: statusCode });
    }
    console.error('Delete order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
