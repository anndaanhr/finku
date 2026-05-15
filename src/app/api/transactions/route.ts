import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

// GET /api/transactions
export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const categoryId = searchParams.get('categoryId')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '20')
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = { userId: payload.userId }
  if (type === 'INCOME' || type === 'EXPENSE') where.type = type
  if (categoryId) where.categoryId = parseInt(categoryId)

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
      skip,
      take: limit,
      include: { category: true },
    }),
    prisma.transaction.count({ where }),
  ])

  return successResponse({ transactions, total, page, totalPages: Math.ceil(total / limit) })
}

// POST /api/transactions
export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  try {
    const { title, amount, type, date, categoryId, note } = await req.json()

    if (!title || !amount || !type || !date || !categoryId) {
      return errorResponse('Semua field wajib diisi.')
    }
    if (!['INCOME', 'EXPENSE'].includes(type)) {
      return errorResponse('Tipe transaksi tidak valid.')
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return errorResponse('Nominal harus berupa angka positif.')
    }

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount: Number(amount),
        type,
        date: new Date(date),
        categoryId: Number(categoryId),
        userId: payload.userId,
        note: note ?? null,
      },
      include: { category: true },
    })

    return successResponse(transaction, 201)
  } catch (err) {
    console.error(err)
    return errorResponse('Terjadi kesalahan server.', 500)
  }
}
