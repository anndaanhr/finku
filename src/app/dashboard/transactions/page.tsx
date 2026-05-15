'use client'
import { useEffect, useState } from 'react'

interface Transaction { id: number; title: string; amount: number; type: 'INCOME'|'EXPENSE'; date: string; note?: string; category: { id:number; name:string; icon:string; color:string } }
interface Category { id: number; name: string; icon: string; color: string; type: string }

const IDR = (n: number) => new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', minimumFractionDigits:0 }).format(n)

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [deleting, setDeleting] = useState<number|null>(null)
  const [filter, setFilter] = useState<'ALL'|'INCOME'|'EXPENSE'>('ALL')
  const [form, setForm] = useState({ title:'', amount:'', type:'EXPENSE' as 'INCOME'|'EXPENSE', categoryId:'', date: new Date().toISOString().split('T')[0], note:'' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchAll = async () => {
    setLoading(true)
    const [tr, cr] = await Promise.all([fetch('/api/transactions'), fetch('/api/categories')])
    const [td, cd] = await Promise.all([tr.json(), cr.json()])
    // API returns: { success, data: { transactions: [...], total, page } }
    const txList = td?.data?.transactions ?? td?.data ?? []
    // Categories API returns: { success, data: [...] }
    const catList = cd?.data ?? []
    setTransactions(Array.isArray(txList) ? txList : [])
    setCategories(Array.isArray(catList) ? catList : [])
    setLoading(false)
  }
  useEffect(()=>{ fetchAll() },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true); setError('')
    const res = await fetch('/api/transactions', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...form, amount:parseFloat(form.amount), categoryId:parseInt(form.categoryId)}) })
    const data = await res.json(); setSubmitting(false)
    if (!res.ok) { setError(data.error??'Gagal menyimpan.'); return }
    setModal(false); setForm({ title:'', amount:'', type:'EXPENSE', categoryId:'', date: new Date().toISOString().split('T')[0], note:'' }); fetchAll()
  }
  const handleDelete = async (id: number) => {
    if (!confirm('Hapus transaksi ini?')) return; setDeleting(id)
    await fetch(`/api/transactions/${id}`, { method:'DELETE' }); setDeleting(null); fetchAll()
  }

  const filteredCats = categories.filter(c => c.type === form.type)
  const filteredTx = filter==='ALL' ? transactions : transactions.filter(t=>t.type===filter)
  const inp: React.CSSProperties = { padding:'13px 16px', fontSize:14, width:'100%', fontFamily:"'Plus Jakarta Sans',sans-serif" }

  const totalIn  = transactions.filter(t=>t.type==='INCOME').reduce((a,t)=>a+Number(t.amount),0)
  const totalOut = transactions.filter(t=>t.type==='EXPENSE').reduce((a,t)=>a+Number(t.amount),0)

  return (
    <div style={{ padding:'40px 36px 60px', maxWidth:1260, margin:'0 auto' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 }}>
        <div>
          <h1 style={{ fontSize:48, fontWeight:800, color:'#0A0A0A', letterSpacing:'-2px', lineHeight:1 }}>Transaksi.</h1>
          <p style={{ fontSize:14, color:'rgba(10,10,10,0.5)', fontWeight:600, marginTop:6 }}>Semua catatan arus keuangan Anda.</p>
        </div>
        <button onClick={()=>{setModal(true);setError('')}} className="neo-btn" style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 22px', fontSize:14, border:'none' }}>
          <span className="material-symbols-outlined" style={{ fontSize:20, fontVariationSettings:"'FILL' 1" }}>add_circle</span>
          Tambah Transaksi
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {[
          { l:'Total Transaksi', v:`${transactions.length}`, bg:'#0A0A0A', fg:'#FFE500', icon:'receipt_long', isNum:false },
          { l:'Total Pemasukan', v:IDR(totalIn), bg:'#00C853', fg:'#fff', icon:'trending_up', isNum:false },
          { l:'Total Pengeluaran', v:IDR(totalOut), bg:'#FF1744', fg:'#fff', icon:'trending_down', isNum:false },
        ].map(s=>(
          <div key={s.l} className="neo-card stat-card" style={{ padding:'20px 24px', display:'flex', alignItems:'center', gap:16, background:s.bg }}>
            <div className="stat-icon-bg" style={{ width:44, height:44, borderRadius:12, background:'rgba(255,255,255,0.15)', border:'2px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span className="material-symbols-outlined" style={{ fontSize:22, color:s.fg }}>{s.icon}</span>
            </div>
            <div style={{ overflow:'hidden' }}>
              <p style={{ fontSize:11, color:s.fg==='#fff'?'rgba(255,255,255,0.6)':'rgba(255,229,0,0.6)', fontWeight:800, letterSpacing:'0.08em' }}>{s.l}</p>
              <p style={{ fontSize:20, fontWeight:800, color:s.fg, lineHeight:1.2, marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.v}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display:'flex', gap:8, marginBottom:20 }}>
        {[{l:'Semua',v:'ALL'},{l:'↑ Pemasukan',v:'INCOME'},{l:'↓ Pengeluaran',v:'EXPENSE'}].map(f=>(
          <button key={f.v} onClick={()=>setFilter(f.v as typeof filter)}
            style={{ padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:800, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Plus Jakarta Sans',sans-serif",
              ...(filter===f.v?{background:'#0A0A0A',color:'#FFE500',border:'2.5px solid #0A0A0A',boxShadow:'3px 3px 0 #0A0A0A'}:{background:'#fff',color:'rgba(10,10,10,0.5)',border:'2.5px solid #0A0A0A',boxShadow:'2px 2px 0 #0A0A0A'}) }}>
            {f.l}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="neo-card" style={{ overflow:'hidden', padding:0 }}>
        {/* Table header */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.2fr 1fr 80px', gap:16, padding:'14px 24px', background:'#0A0A0A', borderBottom:'2.5px solid #0A0A0A' }}>
          {['Transaksi','Kategori','Jumlah','Tanggal',''].map(h=>(
            <span key={h} style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(255,255,255,0.5)' }}>{h}</span>
          ))}
        </div>

        {loading ? (
          <div style={{ padding:24, display:'flex', flexDirection:'column', gap:12 }}>
            {[1,2,3,4].map(i=><div key={i} className="skeleton" style={{ height:64 }}/>)}
          </div>
        ) : filteredTx.length === 0 ? (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'64px 0', gap:16 }}>
            <div style={{ width:80, height:80, borderRadius:20, background:'#0A0A0A', border:'2.5px solid #0A0A0A', boxShadow:'5px 5px 0 #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span className="material-symbols-outlined bounce" style={{ fontSize:42, color:'#FFE500', fontVariationSettings:"'FILL' 1" }}>receipt_long</span>
            </div>
            <p style={{ fontSize:18, fontWeight:800, color:'rgba(10,10,10,0.25)' }}>Belum ada transaksi</p>
            <button onClick={()=>{setModal(true);setError('')}} className="neo-btn-yellow" style={{ padding:'12px 24px', fontSize:14, borderRadius:10, border:'2.5px solid #0A0A0A', boxShadow:'3px 3px 0 #0A0A0A', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, cursor:'pointer' }}>
              + Catat Sekarang
            </button>
          </div>
        ) : (
          <div style={{ padding:'8px 0' }}>
            {filteredTx.map(tx=>(
              <div key={tx.id} className="tx-row neo-row" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.2fr 1fr 80px', gap:16, padding:'16px 24px', alignItems:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div className="tx-icon" style={{ width:42, height:42, borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', background:tx.category.color, border:'2px solid #0A0A0A', flexShrink:0, boxShadow:'2px 2px 0 #0A0A0A' }}>
                    <span className="material-symbols-outlined" style={{ fontSize:20, color:'#fff', fontVariationSettings:"'FILL' 1" }}>{tx.category.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight:700, fontSize:14, color:'#0A0A0A' }}>{tx.title}</p>
                    {tx.note && <p style={{ fontSize:11, color:'rgba(10,10,10,0.4)', fontWeight:600, marginTop:1 }}>{tx.note}</p>}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:tx.category.color, border:'1.5px solid #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize:12, color:'#fff', fontVariationSettings:"'FILL' 1" }}>{tx.category.icon}</span>
                  </div>
                  <span style={{ fontSize:13, fontWeight:600, color:'rgba(10,10,10,0.6)' }}>{tx.category.name}</span>
                </div>
                <p style={{ fontWeight:800, fontSize:15, color:tx.type==='INCOME'?'#00C853':'#FF1744' }}>
                  {tx.type==='INCOME'?'+':'−'} {IDR(Number(tx.amount))}
                </p>
                <span style={{ fontSize:12, fontWeight:600, color:'rgba(10,10,10,0.5)' }}>
                  {new Date(tx.date).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}
                </span>
                <button onClick={()=>handleDelete(tx.id)} disabled={deleting===tx.id}
                  style={{ width:36, height:36, borderRadius:9, background:'#FF1744', border:'2px solid #0A0A0A', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'2px 2px 0 #0A0A0A', transition:'all 0.1s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.transform='translate(2px,2px)';(e.currentTarget as HTMLButtonElement).style.boxShadow='none'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.transform='none';(e.currentTarget as HTMLButtonElement).style.boxShadow='2px 2px 0 #0A0A0A'}}>
                  <span className="material-symbols-outlined" style={{ fontSize:17, color:'#fff' }}>{deleting===tx.id?'hourglass_empty':'delete'}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:16, background:'rgba(10,10,10,0.7)', backdropFilter:'blur(4px)' }}>
          <div className="modal-enter" style={{ width:'100%', maxWidth:480, background:'#F7F3EC', border:'2.5px solid #0A0A0A', boxShadow:'8px 8px 0 #0A0A0A', borderRadius:18, padding:36, maxHeight:'92vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 style={{ fontSize:24, fontWeight:800, color:'#0A0A0A' }}>Transaksi Baru</h2>
              <button onClick={()=>setModal(false)} style={{ width:36, height:36, borderRadius:9, background:'#0A0A0A', border:'2px solid #0A0A0A', cursor:'pointer', color:'#FFE500', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'2px 2px 0 rgba(0,0,0,0.3)' }}>
                <span className="material-symbols-outlined" style={{ fontSize:20 }}>close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
              {/* Type toggle */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, background:'rgba(10,10,10,0.06)', border:'2px solid #0A0A0A', borderRadius:12, padding:5 }}>
                {(['EXPENSE','INCOME'] as const).map(t=>(
                  <button key={t} type="button" onClick={()=>setForm(f=>({...f,type:t,categoryId:''}))}
                    style={{ padding:'12px 0', borderRadius:9, fontSize:13, fontWeight:800, cursor:'pointer', transition:'all 0.15s', border:'none', fontFamily:"'Plus Jakarta Sans',sans-serif",
                      ...(form.type===t?{background:t==='INCOME'?'#00C853':'#FF1744',color:'#fff',boxShadow:'2px 2px 0 #0A0A0A'}:{background:'transparent',color:'rgba(10,10,10,0.35)'}) }}>
                    {t==='INCOME'?'↑ Pemasukan':'↓ Pengeluaran'}
                  </button>
                ))}
              </div>
              <div>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(10,10,10,0.5)', marginBottom:8 }}>JUDUL</p>
                <input className="neo-input" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} required placeholder="Contoh: Makan siang" style={inp}/>
              </div>
              <div>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(10,10,10,0.5)', marginBottom:8 }}>JUMLAH (Rp)</p>
                <input className="neo-input" type="number" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} required min="1" placeholder="25000" style={inp}/>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div>
                  <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(10,10,10,0.5)', marginBottom:8 }}>KATEGORI</p>
                  <select className="neo-input" value={form.categoryId} onChange={e=>setForm(f=>({...f,categoryId:e.target.value}))} required style={inp}>
                    <option value="">Pilih...</option>
                    {filteredCats.filter(c=>c.type===form.type).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(10,10,10,0.5)', marginBottom:8 }}>TANGGAL</p>
                  <input className="neo-input" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} required style={inp}/>
                </div>
              </div>
              <div>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(10,10,10,0.5)', marginBottom:8 }}>CATATAN (opsional)</p>
                <input className="neo-input" value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Keterangan tambahan..." style={inp}/>
              </div>
              {error && <div style={{ padding:'12px 16px', borderRadius:10, background:'#FF174415', border:'2px solid #FF1744', color:'#FF1744', fontSize:13, fontWeight:800 }}>⚠ {error}</div>}
              <button type="submit" disabled={submitting} className="neo-btn" style={{ padding:'15px 0', borderRadius:12, fontSize:15, border:'none', width:'100%', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {submitting?'Menyimpan...':'✦ Simpan Transaksi'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
