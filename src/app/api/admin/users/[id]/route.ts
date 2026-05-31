import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminTokenFromRequest } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = getAdminTokenFromRequest(req)
    if (!payload) return errorResponse('Forbidden: Admin access required', 403)

    const resolvedParams = await params
    const id = parseInt(resolvedParams.id, 10)
    if (isNaN(id)) return errorResponse('ID tidak valid.', 400)

    // Jangan izinkan admin menghapus dirinya sendiri
    if (id === payload.userId) {
      return errorResponse('Admin tidak dapat menghapus akunnya sendiri.', 400)
    }

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) return errorResponse('User tidak ditemukan.', 404)

    await prisma.user.delete({ where: { id } })

    return successResponse({ message: 'User berhasil dihapus.' })
  } catch (err) {
    console.error(err)
    return errorResponse('Terjadi kesalahan server.', 500)
  }
}
