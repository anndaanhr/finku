import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

// POST /api/auth/register
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return errorResponse('Nama, email, dan password wajib diisi.')
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return errorResponse('Email sudah terdaftar.')
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    })

    // Seed default categories for new user
    await prisma.category.createMany({
      data: [
        { name: 'Makanan & Minuman', icon: 'restaurant', color: '#ef4444', type: 'EXPENSE', isDefault: true, userId: user.id },
        { name: 'Transportasi', icon: 'directions_car', color: '#3b82f6', type: 'EXPENSE', isDefault: true, userId: user.id },
        { name: 'Belanja', icon: 'shopping_bag', color: '#f97316', type: 'EXPENSE', isDefault: true, userId: user.id },
        { name: 'Hiburan', icon: 'movie', color: '#a855f7', type: 'EXPENSE', isDefault: true, userId: user.id },
        { name: 'Kesehatan', icon: 'health_and_safety', color: '#22c55e', type: 'EXPENSE', isDefault: true, userId: user.id },
        { name: 'Pendidikan', icon: 'school', color: '#06b6d4', type: 'EXPENSE', isDefault: true, userId: user.id },
        { name: 'Tagihan', icon: 'receipt', color: '#64748b', type: 'EXPENSE', isDefault: true, userId: user.id },
        { name: 'Gaji', icon: 'payments', color: '#6b38d4', type: 'INCOME', isDefault: true, userId: user.id },
        { name: 'Freelance', icon: 'computer', color: '#10b981', type: 'INCOME', isDefault: true, userId: user.id },
        { name: 'Transfer Masuk', icon: 'account_balance', color: '#0ea5e9', type: 'INCOME', isDefault: true, userId: user.id },
        { name: 'Lain-lain', icon: 'more_horiz', color: '#94a3b8', type: 'INCOME', isDefault: true, userId: user.id },
      ],
    })

    const token = signToken({ userId: user.id, email: user.email, role: user.role })
    const response = successResponse({ id: user.id, name: user.name, email: user.email, role: user.role }, 201)
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
