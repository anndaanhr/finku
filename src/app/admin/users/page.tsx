'use client'
import { useState, useEffect } from 'react'

type AdminUser = {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
  _count: { transactions: number }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      const result = await res.json()
      if (result.success) {
        setUsers(result.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = window.confirm(`PERINGATAN: Apakah Anda yakin ingin menghapus akun ${name}? Semua data transaksi dan kategori mereka akan terhapus permanen!`)
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      const result = await res.json()
      if (result.success) {
        alert('Berhasil menghapus pengguna!')
        fetchUsers() // refresh list
      } else {
        alert(`Gagal: ${result.error}`)
      }
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan server.')
    }
  }

  if (loading) {
    return <div style={{ padding: '40px', fontWeight: 'bold' }}>Loading Data Pengguna...</div>
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-1px' }}>Manajemen Pengguna</h1>
      <p style={{ color: '#666', marginBottom: '32px', fontWeight: 500 }}>Daftar semua pengguna yang terdaftar di sistem beserta hak akses kontrol penuh.</p>

      <div style={{ background: '#fff', border: '3px solid #0A0A0A', boxShadow: '5px 5px 0 #0A0A0A', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderBottom: '3px solid #0A0A0A' }}>
              <th style={{ padding: '16px 20px', fontWeight: 900 }}>ID</th>
              <th style={{ padding: '16px 20px', fontWeight: 900 }}>NAMA</th>
              <th style={{ padding: '16px 20px', fontWeight: 900 }}>EMAIL</th>
              <th style={{ padding: '16px 20px', fontWeight: 900 }}>ROLE</th>
              <th style={{ padding: '16px 20px', fontWeight: 900 }}>TRANSAKSI</th>
              <th style={{ padding: '16px 20px', fontWeight: 900 }}>BERGABUNG</th>
              <th style={{ padding: '16px 20px', fontWeight: 900, textAlign: 'right' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '2px solid #eee' }}>
                <td style={{ padding: '16px 20px', fontWeight: 700 }}>#{u.id}</td>
                <td style={{ padding: '16px 20px', fontWeight: 600 }}>{u.name}</td>
                <td style={{ padding: '16px 20px', color: '#666' }}>{u.email}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    background: u.role === 'ADMIN' ? '#FF1744' : '#eee', 
                    color: u.role === 'ADMIN' ? '#fff' : '#0A0A0A',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 800,
                    border: u.role === 'ADMIN' ? '2px solid #0A0A0A' : 'none'
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', fontWeight: 700 }}>{u._count.transactions}</td>
                <td style={{ padding: '16px 20px', color: '#666', fontSize: '14px' }}>
                  {new Date(u.createdAt).toLocaleDateString('id-ID')}
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  {u.role !== 'ADMIN' && (
                    <button 
                      onClick={() => handleDelete(u.id, u.name)}
                      style={{ 
                        background: '#FF1744', color: '#fff', border: '2px solid #0A0A0A', 
                        padding: '8px 16px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer',
                        boxShadow: '2px 2px 0 #0A0A0A', transition: 'transform 0.1s'
                      }}
                      onMouseDown={e => { e.currentTarget.style.transform = 'translate(2px, 2px)'; e.currentTarget.style.boxShadow = '0 0 0 #0A0A0A' }}
                      onMouseUp={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '2px 2px 0 #0A0A0A' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '2px 2px 0 #0A0A0A' }}
                    >
                      Hapus
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
