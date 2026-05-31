import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminTokenFromRequest } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

// GET /api/admin/users
export async function GET(req: NextRequest) {
  try {
    const payload = getAdminTokenFromRequest(req)
    if (!payload) return errorResponse('Forbidden: Admin access required', 403)

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { transactions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return successResponse(users)
  } catch (err) {
    console.error(err)
    return errorResponse('Terjadi kesalahan server.', 500)
  }
}
