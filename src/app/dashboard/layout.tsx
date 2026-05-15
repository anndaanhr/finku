import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'
import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('finku-token')?.value
  if (!token) redirect('/login')
  const payload = verifyToken(token)
  if (!payload) redirect('/login')
  const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { name: true, email: true } })
  if (!user) redirect('/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F3EC' }}>
      <Sidebar userName={user.name} userEmail={user.email} />
      <main style={{ flex: 1, marginLeft: 'var(--sidebar-w)', minHeight: '100vh', background: '#F7F3EC' }}>
        {children}
      </main>
    </div>
  )
}
