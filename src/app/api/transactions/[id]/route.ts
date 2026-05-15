import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

// PUT /api/transactions/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  const { id } = await params
  const transactionId = parseInt(id)

  const existing = await prisma.transaction.findFirst({ where: { id: transactionId, userId: payload.userId } })
  if (!existing) return errorResponse('Transaksi tidak ditemukan.', 404)

  try {
    const { title, amount, type, date, categoryId, note } = await req.json()

    const updated = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        title,
        amount: Number(amount),
        type,
        date: new Date(date),
        categoryId: Number(categoryId),
        note: note ?? null,
      },
      include: { category: true },
    })

    return successResponse(updated)
  } catch (err) {
    console.error(err)
    return errorResponse('Terjadi kesalahan server.', 500)
  }
}

// DELETE /api/transactions/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  const { id } = await params
  const transactionId = parseInt(id)

  const existing = await prisma.transaction.findFirst({ where: { id: transactionId, userId: payload.userId } })
  if (!existing) return errorResponse('Transaksi tidak ditemukan.', 404)

  await prisma.transaction.delete({ where: { id: transactionId } })
  return successResponse({ message: 'Transaksi berhasil dihapus.' })
}
