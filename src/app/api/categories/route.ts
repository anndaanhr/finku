import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

// GET /api/categories
export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  const categories = await prisma.category.findMany({
    where: { userId: payload.userId },
    orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
  })
  return successResponse(categories)
}

// POST /api/categories
export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  try {
    const { name, icon, color, type } = await req.json()
    if (!name || !type) return errorResponse('Nama dan tipe wajib diisi.')

    const category = await prisma.category.create({
      data: {
        name,
        icon: icon ?? 'category',
        color: color ?? '#6b38d4',
        type,
        isDefault: false,
        userId: payload.userId,
      },
    })
    return successResponse(category, 201)
  } catch (err) {
    console.error(err)
    return errorResponse('Terjadi kesalahan server.', 500)
  }
}
