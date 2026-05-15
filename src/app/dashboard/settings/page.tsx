'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User { name: string; email: string; createdAt: string }

export default function SettingsPage() {
  const [user, setUser] = useState<User|null>(null)
  const router = useRouter()

  useEffect(()=>{
    fetch('/api/auth/me')
      .then(r=>r.json())
      .then(d=>{
        // successResponse wraps in {success, data}, so user is at d.data.user
        const u = d?.data?.user ?? d?.user ?? d
        if (u && u.email) setUser(u)
      })
  },[])

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method:'POST' }); router.push('/login'); router.refresh()
  }

  const joined = user ? new Date(user.createdAt).toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}) : '—'
  const initials = user ? user.name.split(' ').map((n:string)=>n[0]).join('').toUpperCase().slice(0,2) : '??'

  const stack = [
    { name:'Next.js 16', desc:'App Router + API Routes', color:'#0A0A0A', icon:'code' },
    { name:'PostgreSQL', desc:'Database via Prisma', color:'#336791', icon:'storage' },
    { name:'Prisma v7', desc:'ORM & Schema Manager', color:'#5A67D8', icon:'schema' },
    { name:'JWT Auth', desc:'HttpOnly Cookie Session', color:'#FF6D00', icon:'lock' },
    { name:'Recharts', desc:'Chart & Visualisasi', color:'#00C853', icon:'bar_chart' },
    { name:'Neubrutalism', desc:'Design System', color:'#FFE500', icon:'palette' },
  ]

  return (
    <div style={{ padding:'40px 36px 60px', maxWidth:1260, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom:36 }}>
        <h1 style={{ fontSize:48, fontWeight:800, color:'#0A0A0A', letterSpacing:'-2px', lineHeight:1 }}>Pengaturan.</h1>
        <p style={{ fontSize:14, color:'rgba(10,10,10,0.5)', fontWeight:600, marginTop:6 }}>Informasi akun dan konfigurasi aplikasi.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:24 }}>
        {/* Left column */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {/* Profile card */}
          <div className="neo-card" style={{ padding:0, overflow:'hidden' }}>
            {/* Yellow banner */}
            <div style={{ height:90, background:'#FFE500', borderBottom:'2.5px solid #0A0A0A', position:'relative', display:'flex', alignItems:'center', justifyContent:'flex-end', padding:'0 24px', gap:12 }}>
              <span className="material-symbols-outlined float-icon" style={{ fontSize:50, color:'rgba(10,10,10,0.2)', fontVariationSettings:"'FILL' 1" }}>north_star</span>
              <span className="material-symbols-outlined float-icon-2" style={{ fontSize:34, color:'rgba(10,10,10,0.15)', fontVariationSettings:"'FILL' 1" }}>payments</span>
            </div>
            {/* Body */}
            <div style={{ padding:'0 28px 28px' }}>
              {/* Avatar — overlaps banner */}
              <div style={{ width:72, height:72, borderRadius:16, background:'#0A0A0A', border:'3px solid #0A0A0A', boxShadow:'4px 4px 0 #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:800, color:'#FFE500', marginTop:-36, marginBottom:16 }}>
                {user ? initials : '??'}
              </div>
              {/* Name & email */}
              {user ? (
                <>
                  <p style={{ fontSize:22, fontWeight:800, color:'#0A0A0A', letterSpacing:'-0.5px', lineHeight:1.2 }}>{user.name}</p>
                  <p style={{ fontSize:13, color:'rgba(10,10,10,0.55)', fontWeight:600, marginTop:4, marginBottom:20 }}>{user.email}</p>
                </>
              ) : (
                <>
                  <div className="skeleton" style={{ height:26, width:'70%', marginBottom:8 }}/>
                  <div className="skeleton" style={{ height:18, width:'55%', marginBottom:20 }}/>
                </>
              )}
              {/* Info rows */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'#F7F3EC', border:'2px solid #0A0A0A', borderRadius:10, boxShadow:'2px 2px 0 #0A0A0A' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize:16, color:'rgba(10,10,10,0.5)' }}>calendar_today</span>
                    <span style={{ fontSize:11, fontWeight:800, color:'rgba(10,10,10,0.5)', letterSpacing:'0.1em' }}>BERGABUNG</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:800, color:'#0A0A0A' }}>{user ? joined : '—'}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'#00C853', border:'2px solid #0A0A0A', borderRadius:10, boxShadow:'2px 2px 0 #0A0A0A' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize:16, color:'rgba(255,255,255,0.8)' }}>verified</span>
                    <span style={{ fontSize:11, fontWeight:800, color:'rgba(255,255,255,0.8)', letterSpacing:'0.1em' }}>STATUS AKUN</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:800, color:'#fff' }}>● Aktif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="neo-card" style={{ padding:24, border:'2.5px solid #FF1744', boxShadow:'4px 4px 0 #FF1744' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <div style={{ width:32, height:32, borderRadius:9, background:'#FF1744', border:'2px solid #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'2px 2px 0 #0A0A0A' }}>
                <span className="material-symbols-outlined" style={{ fontSize:17, color:'#fff' }}>warning</span>
              </div>
              <p style={{ fontSize:14, fontWeight:800, color:'#FF1744' }}>DANGER ZONE</p>
            </div>
            <p style={{ fontSize:13, color:'rgba(10,10,10,0.5)', fontWeight:600, marginBottom:16, lineHeight:1.6 }}>Logout akan mengakhiri sesi aktif Anda.</p>
            <button onClick={handleLogout} className="neo-btn-red" style={{ width:'100%', padding:'13px 0', fontSize:14, borderRadius:10, border:'2.5px solid #0A0A0A', fontFamily:"'Plus Jakarta Sans',sans-serif", display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <span className="material-symbols-outlined" style={{ fontSize:18 }}>logout</span>
              Keluar dari FinKu
            </button>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
          {/* Tech Stack */}
          <div className="neo-card" style={{ padding:28 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:22 }}>
              <div style={{ width:40, height:40, borderRadius:11, background:'#0A0A0A', border:'2px solid #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'3px 3px 0 rgba(0,0,0,0.2)' }}>
                <span className="material-symbols-outlined" style={{ fontSize:20, color:'#FFE500', fontVariationSettings:"'FILL' 1" }}>terminal</span>
              </div>
              <div>
                <h2 style={{ fontSize:18, fontWeight:800, color:'#0A0A0A' }}>Tech Stack</h2>
                <p style={{ fontSize:12, color:'rgba(10,10,10,0.4)', fontWeight:600 }}>Teknologi di balik FinKu</p>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {stack.map(s=>(
                <div key={s.name} style={{ padding:'14px 16px', background:'#F7F3EC', border:'2px solid #0A0A0A', borderRadius:12, boxShadow:'3px 3px 0 #0A0A0A', display:'flex', alignItems:'center', gap:12, transition:'all 0.15s', cursor:'default' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.transform='translate(-2px,-2px)';(e.currentTarget as HTMLDivElement).style.boxShadow='5px 5px 0 #0A0A0A';(e.currentTarget as HTMLDivElement).style.background=s.color+'15'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.transform='none';(e.currentTarget as HTMLDivElement).style.boxShadow='3px 3px 0 #0A0A0A';(e.currentTarget as HTMLDivElement).style.background='#F7F3EC'}}>
                  <div style={{ width:38, height:38, borderRadius:10, background:s.color, border:'2px solid #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'2px 2px 0 #0A0A0A' }}>
                    <span className="material-symbols-outlined" style={{ fontSize:18, color:s.color==='#FFE500'?'#0A0A0A':'#fff', fontVariationSettings:"'FILL' 1" }}>{s.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize:13, fontWeight:800, color:'#0A0A0A' }}>{s.name}</p>
                    <p style={{ fontSize:11, color:'rgba(10,10,10,0.45)', fontWeight:600, marginTop:1 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About card */}
          <div className="neo-card-yellow" style={{ padding:28, boxShadow:'5px 5px 0 #0A0A0A' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
              <div style={{ width:40, height:40, borderRadius:11, background:'#0A0A0A', border:'2px solid #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'3px 3px 0 rgba(0,0,0,0.25)' }}>
                <span className="material-symbols-outlined" style={{ fontSize:20, color:'#FFE500', fontVariationSettings:"'FILL' 1" }}>north_star</span>
              </div>
              <div>
                <h2 style={{ fontSize:18, fontWeight:800, color:'#0A0A0A' }}>Tentang FinKu</h2>
                <p style={{ fontSize:12, color:'rgba(10,10,10,0.5)', fontWeight:600 }}>Versi 1.0 · 2026</p>
              </div>
            </div>
            <p style={{ fontSize:14, color:'rgba(10,10,10,0.65)', fontWeight:600, lineHeight:1.7, marginBottom:16 }}>
              FinKu adalah aplikasi manajemen keuangan pribadi yang dirancang untuk mahasiswa dan profesional muda Indonesia. Catat pemasukan, pengeluaran, dan pantau tren keuangan Anda secara real-time.
            </p>
            <div style={{ display:'flex', gap:10 }}>
              {[{l:'Open Source',icon:'code'},{l:'Gratis Selamanya',icon:'volunteer_activism'},{l:'Lokal',icon:'shield'}].map(tag=>(
                <span key={tag.l} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px', background:'#0A0A0A', border:'2px solid #0A0A0A', borderRadius:8, fontSize:11, fontWeight:800, color:'#FFE500' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:13 }}>{tag.icon}</span>
                  {tag.l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
