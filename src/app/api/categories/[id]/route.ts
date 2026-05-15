import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

// DELETE /api/categories/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  const { id } = await params
  const categoryId = parseInt(id)

  const category = await prisma.category.findFirst({ where: { id: categoryId, userId: payload.userId } })
  if (!category) return errorResponse('Kategori tidak ditemukan.', 404)
  if (category.isDefault) return errorResponse('Kategori default tidak bisa dihapus.', 400)

  await prisma.category.delete({ where: { id: categoryId } })
  return successResponse({ message: 'Kategori berhasil dihapus.' })
}
