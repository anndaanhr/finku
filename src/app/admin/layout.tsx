import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwt'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'

import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'FinKu Admin',
  description: 'Admin Panel FinKu',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('finku-token')?.value

  if (!token) redirect('/login')

  const payload = verifyToken(token)
  if (!payload || payload.role !== 'ADMIN') {
    redirect('/dashboard') // Bukan admin? Balik ke dashboard!
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0A' }}>
      <AdminSidebar userName={user?.name || payload.email} userEmail={payload.email} />
      
      <main style={{ 
        flex: 1, 
        marginLeft: 'var(--sidebar-w)', 
        minHeight: '100vh',
        background: '#fff',
        borderLeft: '2.5px solid #0A0A0A',
      }}>
        {children}
      </main>
    </div>
  )
}
