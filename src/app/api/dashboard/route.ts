import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getTokenFromRequest } from '@/lib/jwt'
import { successResponse, errorResponse } from '@/lib/api-helpers'

// GET /api/dashboard - get summary stats
export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req)
  if (!payload) return errorResponse('Unauthorized', 401)

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

  // Aggregate income and expenses this month
  const [incomeAgg, expenseAgg, recentTransactions] = await Promise.all([
    prisma.transaction.aggregate({
      where: { userId: payload.userId, type: 'INCOME', date: { gte: startOfMonth, lte: endOfMonth } },
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      where: { userId: payload.userId, type: 'EXPENSE', date: { gte: startOfMonth, lte: endOfMonth } },
      _sum: { amount: true },
    }),
    prisma.transaction.findMany({
      where: { userId: payload.userId },
      orderBy: { date: 'desc' },
      take: 5,
      include: { category: true },
    }),
  ])

  const income = Number(incomeAgg._sum.amount ?? 0)
  const expense = Number(expenseAgg._sum.amount ?? 0)
  const balance = income - expense

  // Monthly chart data (last 6 months)
  const chartData = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const start = new Date(d.getFullYear(), d.getMonth(), 1)
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59)
    const [inc, exp] = await Promise.all([
      prisma.transaction.aggregate({ where: { userId: payload.userId, type: 'INCOME', date: { gte: start, lte: end } }, _sum: { amount: true } }),
      prisma.transaction.aggregate({ where: { userId: payload.userId, type: 'EXPENSE', date: { gte: start, lte: end } }, _sum: { amount: true } }),
    ])
    chartData.push({
      month: start.toLocaleString('id-ID', { month: 'short' }),
      pemasukan: Number(inc._sum.amount ?? 0),
      pengeluaran: Number(exp._sum.amount ?? 0),
    })
  }

  // Category breakdown for pie chart
  const categoryBreakdown = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: { userId: payload.userId, type: 'EXPENSE', date: { gte: startOfMonth, lte: endOfMonth } },
    _sum: { amount: true },
  })

  const categoryDetails = await Promise.all(
    categoryBreakdown.map(async (item) => {
      const cat = await prisma.category.findUnique({ where: { id: item.categoryId } })
      return { name: cat?.name ?? 'Lain-lain', color: cat?.color ?? '#94a3b8', value: Number(item._sum.amount ?? 0) }
    })
  )

  return successResponse({
    balance,
    income,
    expense,
    recentTransactions,
    chartData,
    categoryBreakdown: categoryDetails,
  })
}
