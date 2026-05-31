'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', icon: 'monitoring', label: 'Admin Dashboard', exact: true },
  { href: '/admin/users', icon: 'manage_accounts', label: 'Manajemen Pengguna', exact: false },
]

export default function AdminSidebar({ userName, userEmail }: { userName: string; userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const handleLogout = async () => { await fetch('/api/auth/me', { method: 'POST' }); router.push('/login'); router.refresh() }
  const initials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, width: 'var(--sidebar-w)', height: '100vh',
      background: '#0A0A0A', display: 'flex', flexDirection: 'column', zIndex: 50,
      borderRight: '2.5px solid #0A0A0A',
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 20px 20px', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FF1744', border: '2px solid #FF1744', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '3px 3px 0 rgba(255,255,255,0.15)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#fff', fontVariationSettings: "'FILL' 1" }}>admin_panel_settings</span>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FF1744', letterSpacing: '-0.5px' }}>FinKu</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.2em', marginTop: -3 }}>ADMIN PANEL</div>
          </div>
        </div>
      </div>

      {/* User card */}
      <div style={{ margin: '16px 14px', padding: '14px', borderRadius: 12, background: 'rgba(255,23,68,0.1)', border: '2px solid rgba(255,23,68,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: '#FF1744', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff', flexShrink: 0 }}>{initials}</div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C853', display: 'inline-block' }} />
              <span style={{ fontSize: 10, color: '#00C853', fontWeight: 700 }}>SUPER ADMIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav label */}
      <div style={{ padding: '0 20px 10px' }}>
        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)' }}>MENU ADMIN</p>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} className={`nav-link${isActive ? ' active' : ''}`}>
              <span className="material-symbols-outlined nav-icon" style={{ fontSize: 20, fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
              {item.label}
              {isActive && <span style={{ marginLeft: 'auto', fontSize: 18, fontWeight: 900 }}>›</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 10px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
        <Link href="/dashboard" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: 'transparent', border: '2px solid transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', transition: 'all 0.15s', textDecoration: 'none' }}>
           <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
           Kembali ke App
        </Link>
        <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: 'transparent', border: '2px solid transparent', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', transition: 'all 0.15s' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background='rgba(255,23,68,0.15)'; el.style.borderColor='rgba(255,23,68,0.4)'; el.style.color='#FF1744' }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.background='transparent'; el.style.borderColor='transparent'; el.style.color='rgba(255,255,255,0.3)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
          Keluar
        </button>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', textAlign: 'center', marginTop: 12, fontWeight: 600 }}>FinKu Admin v1.0</p>
      </div>
    </aside>
  )
}
