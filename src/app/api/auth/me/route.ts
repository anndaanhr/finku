import { NextRequest } from 'next/server'
import { getTokenFromRequest } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'
import { prisma } from '@/lib/prisma'

// GET /api/auth/me - get current user from token + DB
export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, createdAt: true }
    })
    if (!user) return errorResponse('User tidak ditemukan', 404)
    return successResponse({ user })
  } catch {
    // Fallback to token data if DB fails
    return successResponse({ user: { id: payload.userId, name: payload.email?.split('@')[0] ?? 'User', email: payload.email, createdAt: new Date().toISOString() } })
  }
}

// POST /api/auth/logout
export async function POST() {
  const response = successResponse({ message: 'Logged out' })
  response.cookies.set('finku-token', '', { maxAge: 0, path: '/' })
  return response
}
