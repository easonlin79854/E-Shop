import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { translations } from '@/lib/i18n';

function pickLang(req: NextRequest): 'zh' | 'en' {
  const al = req.headers.get('accept-language') ?? '';
  return al.toLowerCase().startsWith('en') ? 'en' : 'zh';
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const { role } = await req.json();

    if (role !== 'ADMIN' && role !== 'CUSTOMER') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Guard: prevent demoting the last admin
    if (role === 'CUSTOMER') {
      const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
      const targetUser = await prisma.user.findUnique({ where: { id }, select: { role: true } });

      if (targetUser?.role === 'ADMIN' && adminCount <= 1) {
        const lang = pickLang(req);
        const message = translations[lang].lastAdminError;
        return NextResponse.json({ error: message }, { status: 409 });
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update user role error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
