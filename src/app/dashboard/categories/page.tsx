'use client'
import { useEffect, useState } from 'react'

interface Category { id: number; name: string; icon: string; color: string; type: 'INCOME'|'EXPENSE'; isDefault: boolean }

const ICONS = ['restaurant','directions_car','shopping_bag','movie','health_and_safety','school','receipt','payments','computer','home','sports_esports','flight','fitness_center','local_cafe','celebration','coffee','pets','spa','shopping_cart','electric_bolt','music_note','brush','work','book','savings','wallet']
const PALETTE = ['#FF1744','#FF6D00','#FFD600','#00C853','#00BFA5','#2979FF','#7C4DFF','#E040FB','#F06292','#FF8A65','#AED581','#4DD0E1','#0A0A0A','#546E7A','#8D6E63']

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ name:'', icon:'restaurant', color:'#2979FF', type:'EXPENSE' as 'INCOME'|'EXPENSE' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'ALL'|'INCOME'|'EXPENSE'>('ALL')

  const fetchCats = async () => { const r=await fetch('/api/categories'); const d=await r.json(); setCategories(d.data??[]); setLoading(false) }
  useEffect(()=>{ fetchCats() },[])
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault(); setSubmitting(true); setError('')
    const res=await fetch('/api/categories',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    const data=await res.json(); setSubmitting(false)
    if(!res.ok){setError(data.error??'Gagal.');return}
    setModal(false); setForm({name:'',icon:'restaurant',color:'#2979FF',type:'EXPENSE'}); fetchCats()
  }
  const handleDelete = async (id:number) => { if(!confirm('Hapus kategori ini?'))return; await fetch(`/api/categories/${id}`,{method:'DELETE'}); fetchCats() }
  const filtered = filter==='ALL' ? categories : categories.filter(c=>c.type===filter)

  const inp: React.CSSProperties = { padding:'13px 16px', fontSize:14, width:'100%', fontFamily:"'Plus Jakarta Sans',sans-serif" }

  return (
    <div style={{ padding:'40px 36px 60px', maxWidth:1260, margin:'0 auto' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:32 }}>
        <div>
          <h1 style={{ fontSize:48, fontWeight:800, color:'#0A0A0A', letterSpacing:'-2px', lineHeight:1 }}>Kategori.</h1>
          <p style={{ fontSize:14, color:'rgba(10,10,10,0.5)', fontWeight:600, marginTop:6 }}>Label visual untuk setiap transaksi Anda.</p>
        </div>
        <button onClick={()=>{setModal(true);setError('')}} className="neo-btn" style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 22px', fontSize:14, border:'none' }}>
          <span className="material-symbols-outlined" style={{ fontSize:20, fontVariationSettings:"'FILL' 1" }}>add_circle</span>
          Buat Kategori
        </button>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {[
          { l:'Total Kategori', v:categories.length, bg:'#0A0A0A', fg:'#FFE500', icon:'grid_view' },
          { l:'Pemasukan', v:categories.filter(c=>c.type==='INCOME').length, bg:'#00C853', fg:'#fff', icon:'trending_up' },
          { l:'Pengeluaran', v:categories.filter(c=>c.type==='EXPENSE').length, bg:'#FF1744', fg:'#fff', icon:'trending_down' },
        ].map(s=>(
          <div key={s.l} className="neo-card stat-card" style={{ padding:'20px 24px', display:'flex', alignItems:'center', gap:16, background:s.bg }}>
            <div className="stat-icon-bg" style={{ width:44, height:44, borderRadius:12, background:'rgba(255,255,255,0.15)', border:'2px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize:22, color:s.fg }}>{s.icon}</span>
            </div>
            <div>
              <p style={{ fontSize:11, color:s.fg==='#fff'?'rgba(255,255,255,0.6)':'rgba(255,229,0,0.6)', fontWeight:800, letterSpacing:'0.08em' }}>{s.l}</p>
              <p style={{ fontSize:36, fontWeight:800, color:s.fg, lineHeight:1, letterSpacing:'-1px' }}>{s.v}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display:'flex', gap:8, marginBottom:24 }}>
        {[{l:'Semua',v:'ALL'},{l:'↑ Pemasukan',v:'INCOME'},{l:'↓ Pengeluaran',v:'EXPENSE'}].map(f=>(
          <button key={f.v} onClick={()=>setFilter(f.v as typeof filter)}
            style={{ padding:'9px 18px', borderRadius:10, fontSize:13, fontWeight:800, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Plus Jakarta Sans',sans-serif",
              ...(filter===f.v
                ?{background:'#0A0A0A',color:'#FFE500',border:'2.5px solid #0A0A0A',boxShadow:'3px 3px 0 #0A0A0A'}
                :{background:'#fff',color:'rgba(10,10,10,0.5)',border:'2.5px solid #0A0A0A',boxShadow:'2px 2px 0 #0A0A0A'}) }}>
            {f.l}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:16 }}>
          {[...Array(12)].map((_,i)=><div key={i} className="skeleton" style={{ height:160, borderRadius:12 }}/>)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'80px 0', gap:16 }}>
          <div style={{ width:80, height:80, borderRadius:20, background:'#0A0A0A', border:'2.5px solid #0A0A0A', boxShadow:'5px 5px 0 #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span className="material-symbols-outlined bounce" style={{ fontSize:42, color:'#FFE500', fontVariationSettings:"'FILL' 1" }}>bookmarks</span>
          </div>
          <p style={{ fontSize:18, fontWeight:800, color:'rgba(10,10,10,0.3)' }}>Belum ada kategori</p>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:16 }}>
          {filtered.map(cat=>(
            <div key={cat.id} className="neo-card cat-card" style={{ padding:'24px 14px', display:'flex', flexDirection:'column', alignItems:'center', gap:12, position:'relative' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=cat.color;(e.currentTarget as HTMLDivElement).style.boxShadow=`5px 5px 0 ${cat.color}`}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor='#0A0A0A';(e.currentTarget as HTMLDivElement).style.boxShadow='4px 4px 0 #0A0A0A'}}>
              <div className="cat-icon" style={{ width:64, height:64, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', background:cat.color, border:'2.5px solid #0A0A0A', boxShadow:'3px 3px 0 #0A0A0A' }}>
                <span className="material-symbols-outlined" style={{ fontSize:30, color:'#fff', fontVariationSettings:"'FILL' 1" }}>{cat.icon}</span>
              </div>
              <p style={{ fontWeight:800, fontSize:13, textAlign:'center', color:'#0A0A0A', lineHeight:1.3 }}>{cat.name}</p>
              <span className={cat.type==='INCOME'?'chip-income':'chip-expense'} style={{ fontSize:10, padding:'3px 9px', display:'inline-block' }}>
                {cat.type==='INCOME'?'↑ MASUK':'↓ KELUAR'}
              </span>
              {cat.isDefault
                ? <div style={{ position:'absolute', top:8, right:8, fontSize:9, color:'rgba(10,10,10,0.3)', fontWeight:800, letterSpacing:'0.05em', background:'rgba(10,10,10,0.06)', padding:'2px 6px', borderRadius:5 }}>SYS</div>
                : <button onClick={()=>handleDelete(cat.id)} className="delete-reveal" style={{ position:'absolute', top:8, right:8, width:26, height:26, borderRadius:7, background:'#FF1744', border:'2px solid #0A0A0A', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'2px 2px 0 #0A0A0A' }}>
                    <span className="material-symbols-outlined" style={{ fontSize:14, color:'#fff' }}>close</span>
                  </button>
              }
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:16, background:'rgba(10,10,10,0.7)', backdropFilter:'blur(4px)' }}>
          <div className="modal-enter" style={{ width:'100%', maxWidth:440, background:'#F7F3EC', border:'2.5px solid #0A0A0A', boxShadow:'8px 8px 0 #0A0A0A', borderRadius:18, padding:36, maxHeight:'92vh', overflowY:'auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 style={{ fontSize:24, fontWeight:800, color:'#0A0A0A' }}>Kategori Baru</h2>
              <button onClick={()=>setModal(false)} style={{ width:36, height:36, borderRadius:9, background:'#0A0A0A', border:'2px solid #0A0A0A', cursor:'pointer', color:'#FFE500', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'2px 2px 0 rgba(0,0,0,0.3)' }}>
                <span className="material-symbols-outlined" style={{ fontSize:20 }}>close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {/* Type */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, background:'rgba(10,10,10,0.06)', border:'2px solid #0A0A0A', borderRadius:12, padding:5 }}>
                {(['EXPENSE','INCOME'] as const).map(t=>(
                  <button key={t} type="button" onClick={()=>setForm(f=>({...f,type:t}))}
                    style={{ padding:'12px 0', borderRadius:9, fontSize:13, fontWeight:800, cursor:'pointer', transition:'all 0.15s', border:'none', fontFamily:"'Plus Jakarta Sans',sans-serif",
                      ...(form.type===t?{background:t==='INCOME'?'#00C853':'#FF1744',color:'#fff',boxShadow:'2px 2px 0 #0A0A0A'}:{background:'transparent',color:'rgba(10,10,10,0.35)'}) }}>
                    {t==='INCOME'?'↑ Pemasukan':'↓ Pengeluaran'}
                  </button>
                ))}
              </div>
              {/* Name */}
              <div>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(10,10,10,0.5)', marginBottom:8 }}>NAMA KATEGORI</p>
                <input className="neo-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required placeholder="Contoh: Olahraga" style={inp}/>
              </div>
              {/* Icon picker */}
              <div>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(10,10,10,0.5)', marginBottom:10 }}>PILIH IKON</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(9,1fr)', gap:6 }}>
                  {ICONS.map(icon=>(
                    <button key={icon} type="button" onClick={()=>setForm(f=>({...f,icon}))}
                      style={{ width:38, height:38, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all 0.15s', border:'2px solid',
                        background:form.icon===icon?form.color:'#fff', borderColor:form.icon===icon?'#0A0A0A':'rgba(10,10,10,0.15)',
                        boxShadow:form.icon===icon?'3px 3px 0 #0A0A0A':'none', transform:form.icon===icon?'translate(-1px,-1px)':'none' }}>
                      <span className="material-symbols-outlined" style={{ fontSize:17, color:form.icon===icon?'#fff':'rgba(10,10,10,0.35)', fontVariationSettings:"'FILL' 1" }}>{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Color picker */}
              <div>
                <p style={{ fontSize:10, fontWeight:800, letterSpacing:'0.15em', color:'rgba(10,10,10,0.5)', marginBottom:10 }}>WARNA</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {PALETTE.map(color=>(
                    <button key={color} type="button" onClick={()=>setForm(f=>({...f,color}))}
                      style={{ width:32, height:32, borderRadius:9, background:color, cursor:'pointer', transition:'all 0.15s',
                        border:`2.5px solid ${form.color===color?'#0A0A0A':color}`,
                        boxShadow:form.color===color?'3px 3px 0 #0A0A0A':'none',
                        transform:form.color===color?'translate(-1px,-1px) scale(1.1)':'scale(1)' }}/>
                  ))}
                </div>
              </div>
              {/* Preview */}
              <div style={{ padding:'16px 18px', background:'#fff', border:'2px solid #0A0A0A', borderRadius:12, boxShadow:'3px 3px 0 #0A0A0A', display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:15, background:form.color, border:'2.5px solid #0A0A0A', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'3px 3px 0 #0A0A0A' }}>
                  <span className="material-symbols-outlined" style={{ fontSize:26, color:'#fff', fontVariationSettings:"'FILL' 1" }}>{form.icon}</span>
                </div>
                <div>
                  <p style={{ fontWeight:800, fontSize:15, color:'#0A0A0A' }}>{form.name||'Nama Kategori'}</p>
                  <span className={form.type==='INCOME'?'chip-income':'chip-expense'} style={{ fontSize:10, padding:'3px 9px', display:'inline-block', marginTop:4 }}>
                    {form.type==='INCOME'?'↑ MASUK':'↓ KELUAR'}
                  </span>
                </div>
              </div>
              {error && <div style={{ padding:'12px 16px', borderRadius:10, background:'#FF174415', border:'2px solid #FF1744', color:'#FF1744', fontSize:13, fontWeight:800 }}>⚠ {error}</div>}
              <button type="submit" disabled={submitting} className="neo-btn" style={{ padding:'15px 0', borderRadius:12, fontSize:15, border:'none', width:'100%', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {submitting?'Menyimpan...':'✦ Simpan Kategori'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
