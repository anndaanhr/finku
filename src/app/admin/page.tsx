import { prisma } from '@/lib/prisma'

export default async function AdminDashboardPage() {
  const userCount = await prisma.user.count()
  const transactionCount = await prisma.transaction.count()
  const categoryCount = await prisma.category.count()

  // Ambil total volume transaksi (Pemasukan + Pengeluaran)
  const sumResult = await prisma.transaction.aggregate({
    _sum: { amount: true }
  })
  
  const totalVolume = Number(sumResult._sum.amount || 0)

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-1px' }}>Admin Dashboard</h1>
      <p style={{ color: '#666', marginBottom: '32px', fontWeight: 500 }}>Ringkasan metrik sistem FinKu secara keseluruhan.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {/* Metric Card 1 */}
        <div style={{ background: '#FFE500', padding: '24px', borderRadius: '12px', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>group</span>
            <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em' }}>TOTAL PENGGUNA</span>
          </div>
          <div style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1px' }}>{userCount}</div>
        </div>

        {/* Metric Card 2 */}
        <div style={{ background: '#00C853', padding: '24px', borderRadius: '12px', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>receipt_long</span>
            <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em' }}>TOTAL TRANSAKSI</span>
          </div>
          <div style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1px' }}>{transactionCount}</div>
        </div>

        {/* Metric Card 3 */}
        <div style={{ background: '#2962FF', padding: '24px', borderRadius: '12px', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>account_balance_wallet</span>
            <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em' }}>VOLUME UANG</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-1px' }}>Rp {totalVolume.toLocaleString('id-ID')}</div>
        </div>

        {/* Metric Card 4 */}
        <div style={{ background: '#FF1744', padding: '24px', borderRadius: '12px', border: '3px solid #0A0A0A', boxShadow: '4px 4px 0 #0A0A0A', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>bookmarks</span>
            <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em' }}>KATEGORI KUSTOM</span>
          </div>
          <div style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1px' }}>{categoryCount}</div>
        </div>
      </div>
    </div>
  )
}
