import { prisma } from '@/lib/prisma';

export async function generateOrderNumber(): Promise<string> {
  const result = await prisma.$transaction(async (tx) => {
    const counter = await tx.orderCounter.upsert({
      where: { id: 1 },
      update: { counter: { increment: 1 } },
      create: { id: 1, counter: 1 },
    });
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const seq = String(counter.counter).padStart(6, '0');
    return `ORD-${date}-${seq}`;
  });
  return result;
}
