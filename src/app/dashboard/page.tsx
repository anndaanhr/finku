'use client'
import { useEffect, useState, useRef } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Transaction { id: number; title: string; amount: number; type: 'INCOME'|'EXPENSE'; date: string; category: { name: string; icon: string; color: string } }
interface DashboardData { balance: number; income: number; expense: number; recentTransactions: Transaction[]; chartData: { month: string; pemasukan: number; pengeluaran: number }[]; categoryBreakdown: { name: string; color: string; value: number }[] }

const IDR = (n: number) => new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', minimumFractionDigits:0 }).format(n)
const compact = (n: number) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}jt` : n >= 1000 ? `${(n/1000).toFixed(0)}rb` : String(n)

function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0); const ref = useRef(0)
  useEffect(() => {
    const end=to, dur=900, t0=performance.now()
    const tick=(t:number)=>{ const p=Math.min((t-t0)/dur,1); const e=1-Math.pow(1-p,3); setVal(Math.round(ref.current+(end-ref.current)*e)); if(p<1) requestAnimationFrame(tick); else ref.current=end }
    requestAnimationFrame(tick)
  }, [to])
  return <>{new Intl.NumberFormat('id-ID').format(val)}</>
}

const NeoTip = ({ active, payload, label }: { active?:boolean; payload?:{name:string;value:number;color:string}[]; label?:string }) => {
  if (!active||!payload?.length) return null
  return (
    <div style={{ background:'#fff', border:'2.5px solid #0A0A0A', boxShadow:'4px 4px 0 #0A0A0A', padding:'12px 16px', borderRadius:10, fontSize:12 }}>
      <p style={{ fontWeight:800, marginBottom:8, fontSize:13 }}>{label}</p>
      {payload.map((p,i)=>(
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
          <span style={{ width:10, height:10, borderRadius:3, background:p.color, border:'1.5px solid #0A0A0A', display:'inline-block' }}/>
          <span style={{ color:'rgba(10,10,10,0.6)', fontWeight:600 }}>{p.name}:</span>
          <span style={{ fontWeight:800 }}>{IDR(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

const quickActions = [
  { href:'/dashboard/transactions', icon:'add_circle', label:'Catat Transaksi', bg:'#FFE500', fg:'#0A0A0A' },
  { href:'/dashboard/transactions', icon:'swap_horiz', label:'Lihat Histori', bg:'#2979FF', fg:'#fff' },
  { href:'/dashboard/categories', icon:'bookmarks', label:'Kategori', bg:'#00C853', fg:'#fff' },
  { href:'/dashboard/settings', icon:'manage_accounts', label:'Pengaturan', bg:'#7C4DFF', fg:'#fff' },
]

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData|null>(null)
  const [loading, setLoading] = useState(true)
  const month = new Date().toLocaleString('id-ID',{month:'long',year:'numeric'})
  useEffect(()=>{ fetch('/api/dashboard').then(r=>r.json()).then(d=>{setData(d.data);setLoading(false)}) },[])
  const savingsRate = data&&data.income>0 ? Math.round(((data.income-data.expense)/data.income)*100) : 0
  const balPos = (data?.balance??0)>=0

  return (
    <div style={{ padding:'40px 36px 60px', maxWidth:1260, margin:'0 auto' }}>

      {/* HEADER */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 }}>
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 12px', background:'#FFE500', border:'2px solid #0A0A0A', boxShadow:'3px 3px 0 #0A0A0A', borderRadius:8, marginBottom:12 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#0A0A0A', display:'inline-block' }}/>
            <span style={{ fontSize:11, fontWeight:800, letterSpacing:'0.12em', color:'#0A0A0A' }}>LIVE · {month.toUpperCase()}</span>
          </div>
          <h1 style={{ fontSize:48, fontWeight:800, lineHeight:1, color:'#0A0A0A', letterSpacing:'-2px' }}>
            Keuangan Anda.
          </h1>
        </div>
        <a href="/dashboard/transactions" className="neo-btn" style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 22px', fontSize:14, textDecoration:'none' }}>
          <span className="material-symbols-outlined" style={{ fontSize:20, fontVariationSettings:"'FILL' 1" }}>add_circle</span>
          Tambah Transaksi
        </a>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
        {quickActions.map(q=>(
          <a key={q.label} href={q.href} className="quick-action">
            <div className="qa-icon" style={{ width:52, height:52, borderRadius:14, background:q.bg, border:'2px solid #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'3px 3px 0 #0A0A0A' }}>
              <span className="material-symbols-outlined" style={{ fontSize:26, color:q.fg, fontVariationSettings:"'FILL' 1" }}>{q.icon}</span>
            </div>
            <span style={{ fontSize:12, fontWeight:800, color:'#0A0A0A', textAlign:'center' }}>{q.label}</span>
          </a>
        ))}
      </div>

      {/* STAT CARDS */}
      <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr', gap:20, marginBottom:20 }}>

        {/* Balance */}
        <div className="neo-card stat-card" style={{ padding:28, position:'relative', overflow:'hidden', background: balPos?'#0A0A0A':'#FF1744' }}>
          {/* Decorative float icons */}
          <span className="material-symbols-outlined float-icon" style={{ position:'absolute', top:-10, right:-10, fontSize:130, color:'rgba(255,255,255,0.06)', fontVariationSettings:"'FILL' 1", pointerEvents:'none' }}>account_balance_wallet</span>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, position:'relative' }}>
            <div className="stat-icon-bg" style={{ width:38, height:38, borderRadius:10, background:'#FFE500', border:'2px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize:20, color:'#0A0A0A', fontVariationSettings:"'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.55)', fontWeight:700 }}>TOTAL SALDO BERSIH</span>
          </div>
          {loading ? <div className="skeleton" style={{ height:52, width:'60%', marginBottom:16 }}/> : (
            <div className="count-enter" style={{ fontSize:42, fontWeight:800, letterSpacing:'-2px', color:'#fff', marginBottom:18, position:'relative', lineHeight:1 }}>
              Rp <Counter to={Math.abs(data?.balance??0)}/>{!balPos&&' (−)'}
            </div>
          )}
          <div style={{ position:'relative' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:6 }}>
              <span style={{ color:'rgba(255,255,255,0.5)', fontWeight:700 }}>TINGKAT TABUNGAN</span>
              <span style={{ fontWeight:800, color:'#FFE500' }}>{savingsRate}%</span>
            </div>
            <div style={{ height:6, background:'rgba(255,255,255,0.15)', borderRadius:4, border:'1px solid rgba(255,255,255,0.2)' }}>
              <div style={{ height:'100%', width:`${Math.max(0,Math.min(savingsRate,100))}%`, background:'#FFE500', borderRadius:3, transition:'width 1.2s cubic-bezier(.34,1.3,.64,1)' }}/>
            </div>
          </div>
        </div>

        {/* Income */}
        <div className="neo-card stat-card" style={{ padding:28, position:'relative', overflow:'hidden', background:'#00C853' }}>
          <span className="material-symbols-outlined float-icon-2" style={{ position:'absolute', top:-10, right:-10, fontSize:120, color:'rgba(0,0,0,0.08)', fontVariationSettings:"'FILL' 1", pointerEvents:'none' }}>trending_up</span>
          <div className="stat-icon-bg" style={{ width:44, height:44, borderRadius:12, background:'rgba(0,0,0,0.15)', border:'2px solid rgba(0,0,0,0.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18, position:'relative' }}>
            <span className="material-symbols-outlined" style={{ fontSize:22, color:'#fff' }}>trending_up</span>
          </div>
          <p style={{ fontSize:11, color:'rgba(0,0,0,0.5)', fontWeight:800, letterSpacing:'0.1em', marginBottom:8, position:'relative' }}>PEMASUKAN</p>
          {loading ? <div className="skeleton" style={{ height:36, width:'80%' }}/> :
            <p style={{ fontSize:30, fontWeight:800, color:'#fff', letterSpacing:'-1px', position:'relative' }}>Rp <Counter to={data?.income??0}/></p>}
          <p style={{ fontSize:11, color:'rgba(0,0,0,0.4)', marginTop:8, fontWeight:700, position:'relative' }}>Bulan {month.split(' ')[0]}</p>
        </div>

        {/* Expense */}
        <div className="neo-card stat-card" style={{ padding:28, position:'relative', overflow:'hidden', background:'#fff' }}>
          <span className="material-symbols-outlined float-icon-3" style={{ position:'absolute', top:-10, right:-10, fontSize:120, color:'rgba(255,23,68,0.07)', fontVariationSettings:"'FILL' 1", pointerEvents:'none' }}>trending_down</span>
          <div className="stat-icon-bg" style={{ width:44, height:44, borderRadius:12, background:'#FF1744', border:'2px solid #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18, position:'relative', boxShadow:'2px 2px 0 #0A0A0A' }}>
            <span className="material-symbols-outlined" style={{ fontSize:22, color:'#fff' }}>trending_down</span>
          </div>
          <p style={{ fontSize:11, color:'rgba(10,10,10,0.4)', fontWeight:800, letterSpacing:'0.1em', marginBottom:8, position:'relative' }}>PENGELUARAN</p>
          {loading ? <div className="skeleton" style={{ height:36, width:'80%' }}/> :
            <p style={{ fontSize:30, fontWeight:800, color:'#FF1744', letterSpacing:'-1px', position:'relative' }}>Rp <Counter to={data?.expense??0}/></p>}
          <p style={{ fontSize:11, color:'rgba(10,10,10,0.3)', marginTop:8, fontWeight:700, position:'relative' }}>Bulan {month.split(' ')[0]}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div style={{ display:'grid', gridTemplateColumns:'1.7fr 1fr', gap:20, marginBottom:20 }}>
        <div className="neo-card" style={{ padding:28 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:22 }}>
            <div>
              <h2 style={{ fontSize:20, fontWeight:800, color:'#0A0A0A' }}>Arus Kas</h2>
              <p style={{ fontSize:12, color:'rgba(10,10,10,0.4)', fontWeight:600, marginTop:2 }}>6 bulan terakhir</p>
            </div>
            <div style={{ display:'flex', gap:14, fontSize:11 }}>
              {[{c:'#00C853',l:'Masuk'},{c:'#FF1744',l:'Keluar'}].map(l=>(
                <div key={l.l} style={{ display:'flex', alignItems:'center', gap:6, fontWeight:700, color:'rgba(10,10,10,0.5)' }}>
                  <span style={{ width:14, height:4, borderRadius:2, background:l.c, border:'1px solid #0A0A0A', display:'inline-block' }}/>
                  {l.l}
                </div>
              ))}
            </div>
          </div>
          {loading ? <div className="skeleton" style={{ height:200 }}/> : (
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={data?.chartData} margin={{top:5,right:5,bottom:0,left:0}}>
                <defs>
                  <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C853" stopOpacity={0.25}/><stop offset="100%" stopColor="#00C853" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF1744" stopOpacity={0.2}/><stop offset="100%" stopColor="#FF1744" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(10,10,10,0.08)" vertical={false}/>
                <XAxis dataKey="month" tick={{ fontSize:11, fill:'rgba(10,10,10,0.4)', fontWeight:600 }} axisLine={false} tickLine={false}/>
                <YAxis tickFormatter={compact} tick={{ fontSize:10, fill:'rgba(10,10,10,0.35)', fontWeight:600 }} axisLine={false} tickLine={false} width={42}/>
                <Tooltip content={<NeoTip/>} cursor={{ stroke:'rgba(10,10,10,0.15)', strokeWidth:1.5, strokeDasharray:'5 5' }}/>
                <Area type="monotone" dataKey="pemasukan" name="Pemasukan" stroke="#00C853" strokeWidth={2.5} fill="url(#gIn)" dot={false} activeDot={{ r:5, fill:'#00C853', stroke:'#0A0A0A', strokeWidth:2 }}/>
                <Area type="monotone" dataKey="pengeluaran" name="Pengeluaran" stroke="#FF1744" strokeWidth={2.5} fill="url(#gOut)" dot={false} activeDot={{ r:5, fill:'#FF1744', stroke:'#0A0A0A', strokeWidth:2 }}/>
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="neo-card" style={{ padding:28 }}>
          <h2 style={{ fontSize:20, fontWeight:800, color:'#0A0A0A', marginBottom:4 }}>Distribusi</h2>
          <p style={{ fontSize:12, color:'rgba(10,10,10,0.4)', fontWeight:600, marginBottom:18 }}>Per kategori</p>
          {loading ? <div className="skeleton" style={{ height:180 }}/> : (data?.categoryBreakdown?.length??0)===0 ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:28, gap:10 }}>
              <span className="material-symbols-outlined bounce" style={{ fontSize:60, color:'rgba(10,10,10,0.12)', fontVariationSettings:"'FILL' 1" }}>donut_large</span>
              <p style={{ fontSize:13, fontWeight:700, color:'rgba(10,10,10,0.25)' }}>Belum ada data</p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={data?.categoryBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={3} strokeWidth={2} stroke="#0A0A0A">
                    {data?.categoryBreakdown.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                  <Tooltip formatter={(v: any)=>IDR(Number(v))} contentStyle={{ background:'#fff', border:'2px solid #0A0A0A', boxShadow:'3px 3px 0 #0A0A0A', borderRadius:8, fontSize:12, fontWeight:700 }}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:8 }}>
                {data?.categoryBreakdown.slice(0,4).map((item,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ width:10, height:10, borderRadius:3, background:item.color, border:'1.5px solid #0A0A0A', display:'inline-block' }}/>
                      <span style={{ fontSize:12, fontWeight:600, color:'rgba(10,10,10,0.6)' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize:12, fontWeight:800 }}>Rp {compact(item.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="neo-card" style={{ padding:28 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:800 }}>Transaksi Terbaru</h2>
            <p style={{ fontSize:12, color:'rgba(10,10,10,0.4)', fontWeight:600, marginTop:2 }}>5 aktivitas terakhir</p>
          </div>
          <a href="/dashboard/transactions" style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:800, color:'#0A0A0A', textDecoration:'none', padding:'8px 16px', border:'2px solid #0A0A0A', borderRadius:9, boxShadow:'3px 3px 0 #0A0A0A', background:'#FFE500', transition:'all 0.1s' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='translate(2px,2px)';(e.currentTarget as HTMLAnchorElement).style.boxShadow='1px 1px 0 #0A0A0A'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.transform='none';(e.currentTarget as HTMLAnchorElement).style.boxShadow='3px 3px 0 #0A0A0A'}}>
            Lihat Semua →
          </a>
        </div>
        <div style={{ height:2, background:'#0A0A0A', marginBottom:20 }}/>
        {loading ? <div style={{ display:'flex', flexDirection:'column', gap:12 }}>{[1,2,3].map(i=><div key={i} className="skeleton" style={{ height:60 }}/>)}</div>
        : (data?.recentTransactions?.length??0)===0 ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'40px 0', gap:12 }}>
            <span className="material-symbols-outlined bounce" style={{ fontSize:64, color:'rgba(10,10,10,0.12)', fontVariationSettings:"'FILL' 1" }}>receipt_long</span>
            <p style={{ fontSize:15, fontWeight:700, color:'rgba(10,10,10,0.25)' }}>Belum ada transaksi</p>
            <a href="/dashboard/transactions" className="neo-btn-yellow" style={{ padding:'11px 24px', fontSize:14, borderRadius:10, display:'inline-block', textDecoration:'none', fontWeight:800 }}>+ Catat Sekarang</a>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {data?.recentTransactions.map(tx=>(
              <div key={tx.id} className="tx-row" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 12px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div className="tx-icon" style={{ width:44, height:44, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', background:tx.category.color+'18', border:`2px solid ${tx.category.color}50`, flexShrink:0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize:22, color:tx.category.color, fontVariationSettings:"'FILL' 1" }}>{tx.category.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight:700, fontSize:14 }}>{tx.title}</p>
                    <p style={{ fontSize:11, color:'rgba(10,10,10,0.4)', marginTop:2, fontWeight:600 }}>
                      {new Date(tx.date).toLocaleDateString('id-ID',{day:'numeric',month:'short'})} · {tx.category.name}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <p style={{ fontWeight:800, fontSize:16, color:tx.type==='INCOME'?'#00C853':'#FF1744' }}>
                    {tx.type==='INCOME'?'+':'−'} {IDR(Number(tx.amount))}
                  </p>
                  <span className={tx.type==='INCOME'?'chip-income':'chip-expense'} style={{ fontSize:10, padding:'2px 8px', display:'inline-block', marginTop:4 }}>
                    {tx.type==='INCOME'?'MASUK':'KELUAR'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
