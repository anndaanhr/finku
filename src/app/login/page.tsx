'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

/* ── Counter hook ───────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const dur = 1800, t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 4)
      setVal(Math.round(to * e))
      if (p < 1) requestAnimationFrame(tick)
    }
    const delay = setTimeout(() => requestAnimationFrame(tick), 600)
    return () => clearTimeout(delay)
  }, [to])
  return <>{val.toLocaleString('id-ID')}{suffix}</>
}

const TICKER_ITEMS = [
  '✦ NABUNG', '● INVESTASI', '✦ HEMAT', '● CATAT', '✦ BUDGETING',
  '● KELOLA', '✦ PEMASUKAN', '● PENGELUARAN', '✦ FINANSIAL', '● TABUNGAN',
  '✦ NABUNG', '● INVESTASI', '✦ HEMAT', '● CATAT', '✦ BUDGETING',
  '● KELOLA', '✦ PEMASUKAN', '● PENGELUARAN', '✦ FINANSIAL', '● TABUNGAN',
]

const SHAPES = [
  { size: 90,  color: '#FFE500', borderRadius: 20, top: '8%',  left: '12%', delay: 0,    dur: 6,  rotate: 0   },
  { size: 55,  color: '#00C853', borderRadius: 12, top: '18%', left: '70%', delay: 1.2,  dur: 7,  rotate: 45  },
  { size: 70,  color: '#FF1744', borderRadius: 16, top: '60%', left: '8%',  delay: 0.5,  dur: 8,  rotate: 20  },
  { size: 40,  color: '#2979FF', borderRadius: 10, top: '72%', left: '65%', delay: 2,    dur: 5,  rotate: 0   },
  { size: 110, color: '#7C4DFF', borderRadius: 25, top: '40%', left: '78%', delay: 0.8,  dur: 9,  rotate: 15  },
  { size: 35,  color: '#FFE500', borderRadius: 8,  top: '85%', left: '32%', delay: 1.8,  dur: 6,  rotate: 30  },
  { size: 60,  color: '#FF6D00', borderRadius: 14, top: '25%', left: '42%', delay: 3,    dur: 7,  rotate: 60  },
  { size: 28,  color: '#00BFA5', borderRadius: 7,  top: '55%', left: '50%', delay: 1,    dur: 10, rotate: 0   },
]

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    const res = await fetch(tab === 'login' ? '/api/auth/login' : '/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tab === 'login' ? { email: form.email, password: form.password } : form)
    })
    const data = await res.json(); setLoading(false)
    if (!res.ok) { setError(data.error ?? 'Terjadi kesalahan.'); return }
    if (data.data && data.data.role === 'ADMIN') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
    router.refresh()
  }

  return (
    <>
      {/* ── Keyframe styles ─────────────────────────── */}
      <style>{`
        @keyframes float-a {
          0%,100% { transform: translate(0,0) rotate(0deg) scale(1); }
          25%      { transform: translate(18px,-24px) rotate(15deg) scale(1.05); }
          50%      { transform: translate(-10px,18px) rotate(-8deg) scale(0.95); }
          75%      { transform: translate(12px,8px) rotate(10deg) scale(1.02); }
        }
        @keyframes float-b {
          0%,100% { transform: translate(0,0) rotate(45deg) scale(1); }
          33%      { transform: translate(-22px,14px) rotate(65deg) scale(1.08); }
          66%      { transform: translate(16px,-18px) rotate(30deg) scale(0.92); }
        }
        @keyframes float-c {
          0%,100% { transform: translate(0,0) rotate(20deg) scale(1); }
          50%      { transform: translate(24px,-30px) rotate(-15deg) scale(1.1); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes badge-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,229,0,0.5); }
          50%      { box-shadow: 0 0 0 10px rgba(255,229,0,0); }
        }
        @keyframes slide-up {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fade-in-left {
          from { opacity:0; transform:translateX(-20px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .shape-float-a { animation: float-a var(--dur,7s) ease-in-out infinite; }
        .shape-float-b { animation: float-b var(--dur,8s) ease-in-out infinite; }
        .shape-float-c { animation: float-c var(--dur,6s) ease-in-out infinite; }
        .hero-slide     { animation: slide-up 0.7s cubic-bezier(.22,1,.36,1) both; }
        .stat-fade      { animation: fade-in-left 0.6s ease both; }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', background: '#F7F3EC', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* ══ LEFT — Branding + Animated BG ════════════════ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '48px 52px', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>

          {/* Floating shapes */}
          {SHAPES.map((s, i) => (
            <div key={i}
              className={i % 3 === 0 ? 'shape-float-a' : i % 3 === 1 ? 'shape-float-b' : 'shape-float-c'}
              style={{
                position: 'absolute', width: s.size, height: s.size,
                background: s.color, borderRadius: s.borderRadius,
                border: '2.5px solid rgba(255,255,255,0.2)',
                top: s.top, left: s.left, opacity: 0.18, pointerEvents: 'none',
                '--dur': `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              } as React.CSSProperties}
            />
          ))}

          {/* Grid overlay for texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
            backgroundImage: 'linear-gradient(rgba(255,229,0,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,229,0,0.6) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          {/* ── Logo ─────────────────────────────────── */}
          <div className="hero-slide" style={{ animationDelay: '0s', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FFE500', border: '2.5px solid #FFE500', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '4px 4px 0 rgba(255,255,255,0.15)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#0A0A0A', fontVariationSettings: "'FILL' 1" }}>north_star</span>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#FFE500', letterSpacing: '-0.5px' }}>FinKu</div>
          </div>

          {/* ── Hero text ─────────────────────────────── */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Live badge */}
            <div className="hero-slide" style={{ animationDelay: '0.1s', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: '#FFE500', border: '2px solid #FFE500', borderRadius: 8, marginBottom: 24, animation: 'badge-pulse 2.5s ease-in-out infinite, slide-up 0.7s cubic-bezier(.22,1,.36,1) 0.1s both' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0A0A0A', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: '#0A0A0A' }}>AKTIF SEKARANG</span>
            </div>

            <h1 className="hero-slide" style={{ animationDelay: '0.2s', fontSize: 60, fontWeight: 800, lineHeight: 1.0, letterSpacing: '-3px', color: '#fff', marginBottom: 20 }}>
              Kendalikan<br /><span style={{ color: '#FFE500' }}>Keuangan</span><br />Anda.
            </h1>
            <p className="hero-slide" style={{ animationDelay: '0.3s', fontSize: 17, color: 'rgba(255,255,255,0.45)', maxWidth: 380, lineHeight: 1.7, fontWeight: 500 }}>
              Catat setiap rupiah. Pantau tren. Raih kebebasan finansial.
            </p>

            {/* Stats */}
            <div className="hero-slide" style={{ animationDelay: '0.4s', display: 'flex', gap: 16, marginTop: 36 }}>
              {[
                { to: 2400, suffix: '+', label: 'Pengguna' },
                { to: 18000, suffix: '+', label: 'Transaksi' },
                { to: 32, suffix: '%', label: 'Avg Tabungan' },
              ].map((s, i) => (
                <div key={i} className="stat-fade" style={{ animationDelay: `${0.5 + i * 0.12}s`, padding: '14px 18px', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 12, flex: 1, transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,229,0,0.1)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,229,0,0.4)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#FFE500', letterSpacing: '-1px' }}>
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 700, marginTop: 3 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Testimonial ───────────────────────────── */}
          <div className="hero-slide" style={{ animationDelay: '0.55s', position: 'relative', zIndex: 2, padding: '18px 22px', background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.12)', borderRadius: 14, maxWidth: 380 }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 12 }}>
              &ldquo;FinKu membuat saya akhirnya sadar ke mana uang bulanan saya pergi.&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: '#FFE500', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#0A0A0A' }}>B</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Budi Santoso</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Mahasiswa, Unila</p>
              </div>
            </div>
          </div>

          {/* ── Scrolling Ticker ──────────────────────── */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, overflow: 'hidden', borderTop: '2px solid rgba(255,229,0,0.25)', background: 'rgba(255,229,0,0.07)', padding: '10px 0' }}>
            <div style={{ display: 'flex', gap: 32, animation: 'marquee 22s linear infinite', width: 'max-content' }}>
              {TICKER_ITEMS.map((t, i) => (
                <span key={i} style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,229,0,0.55)', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT — Form ══════════════════════════════════ */}
        <div style={{ width: 460, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 36 }}>
          <div style={{ width: '100%', maxWidth: 380 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0A0A0A', marginBottom: 6 }}>
              {tab === 'login' ? 'Selamat datang kembali.' : 'Buat akun baru.'}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.45)', fontWeight: 600, marginBottom: 28 }}>
              {tab === 'login' ? 'Masukkan email dan password Anda.' : 'Gratis selamanya. Mulai catat hari ini.'}
            </p>

            {/* Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, background: 'rgba(10,10,10,0.05)', border: '2px solid #0A0A0A', borderRadius: 12, padding: 5, marginBottom: 28 }}>
              {(['login', 'register'] as const).map(t => (
                <button key={t} onClick={() => { setTab(t); setError('') }}
                  style={{ padding: '12px 0', borderRadius: 9, fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'all 0.15s', fontFamily: "'Plus Jakarta Sans', sans-serif",
                    ...(tab === t ? { background: '#0A0A0A', color: '#FFE500', border: 'none', boxShadow: 'none' } : { background: 'transparent', color: 'rgba(10,10,10,0.35)', border: 'none' }) }}>
                  {t === 'login' ? 'Masuk' : 'Daftar'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {tab === 'register' && (
                <div>
                  <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(10,10,10,0.5)', marginBottom: 8 }}>NAMA LENGKAP</p>
                  <input className="neo-input" type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="Budi Santoso" style={{ padding: '13px 16px', fontSize: 14, width: '100%' }} />
                </div>
              )}
              <div>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(10,10,10,0.5)', marginBottom: 8 }}>EMAIL</p>
                <input className="neo-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="email@contoh.com" style={{ padding: '13px 16px', fontSize: 14, width: '100%' }} />
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(10,10,10,0.5)', marginBottom: 8 }}>PASSWORD</p>
                <input className="neo-input" type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required placeholder="••••••••" minLength={6} style={{ padding: '13px 16px', fontSize: 14, width: '100%' }} />
              </div>
              {error && (
                <div style={{ padding: '12px 16px', borderRadius: 10, background: '#FF174418', border: '2px solid #FF1744', color: '#FF1744', fontSize: 13, fontWeight: 700 }}>⚠ {error}</div>
              )}
              <button type="submit" disabled={loading} className="neo-btn" style={{ padding: '16px 0', borderRadius: 12, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 6, width: '100%' }}>
                {loading ? '⏳ Memproses...' : tab === 'login' ? 'Masuk ke FinKu →' : 'Buat Akun Gratis →'}
              </button>
            </form>
            <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(10,10,10,0.25)', marginTop: 28, fontWeight: 600 }}>FinKu v1.0 · &copy; 2026 PT. Antecha Sync</p>
          </div>
        </div>
      </div>
    </>
  )
}
