import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

// POST /api/auth/login
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return errorResponse('Email dan password wajib diisi.')
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return errorResponse('Email atau password salah.', 401)

    const match = await bcrypt.compare(password, user.password)
    if (!match) return errorResponse('Email atau password salah.', 401)

    const token = signToken({ userId: user.id, email: user.email, role: user.role })
    const response = successResponse({ id: user.id, name: user.name, email: user.email, role: user.role })
    response.cookies.set('finku-token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch (err) {
    console.error(err)
    return errorResponse('Terjadi kesalahan server.', 500)
  }
}
