# 💸 FinKu — Aplikasi Manajemen Keuangan Pribadi

**FinKu** adalah aplikasi web manajemen keuangan pribadi yang dirancang untuk membantu pengguna melacak arus kas (pemasukan & pengeluaran) dengan antarmuka bergaya **Neubrutalism** yang unik, dinamis, dan berani.

![FinKu Banner](https://img.shields.io/badge/FinKu-Finance_Dashboard-FFE500?style=for-the-badge&logo=next.js&logoColor=black)

---

## ✨ Fitur Utama

- **🔐 Autentikasi Aman:** Sistem registrasi dan login menggunakan **JWT** yang disimpan dalam `HttpOnly Cookie` untuk mencegah serangan XSS. Hash password menggunakan `bcryptjs`.
- **📊 Dashboard Interaktif:** 
  - Ringkasan Saldo, Total Pemasukan, dan Total Pengeluaran bulan berjalan.
  - **AreaChart (Recharts)** interaktif untuk melihat tren arus kas 6 bulan terakhir.
  - Breakdown proporsi pengeluaran per kategori.
- **💰 Manajemen Transaksi (Arus Kas):** 
  - Pencatatan transaksi Pemasukan (Income) dan Pengeluaran (Expense).
  - Fitur Filter (Berdasarkan Tipe/Kategori) dan Pagination.
  - Proteksi privasi data (Setiap pengguna hanya bisa melihat & mengelola datanya sendiri).
- **📂 Kategori Kustom:** Buat dan kelola kategori transaksi sesuai kebutuhan (Warna kustom & Material Symbols).
- **🎨 Desain Neubrutalism:** Estetika antarmuka dengan *hard shadows*, border tebal kontras tinggi, dan *micro-animations* yang *eye-catching*.

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan teknologi modern (Fullstack Next.js):

### **Frontend**
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 & Vanilla CSS (Variables)
- **Charts:** Recharts
- **Icons:** Google Material Symbols Outlined
- **Fonts:** Plus Jakarta Sans

### **Backend & Database**
- **API Runtime:** Next.js Route Handlers (`src/app/api/...`)
- **ORM:** Prisma v7
- **Database:** PostgreSQL
- **Security:** `jsonwebtoken` (JWT), `bcryptjs`

---

## 🚀 Panduan Instalasi (Local Development)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di komputer lokal Anda:

### 1. Clone Repository
```bash
git clone https://github.com/username/finance-app.git
cd finance-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` di root direktori proyek, dan isi konfigurasi berikut:
```env
# Koneksi ke database PostgreSQL Anda
DATABASE_URL="postgresql://username:password@localhost:5432/finku?schema=public"

# Secret Key untuk men-generate JWT (Gunakan string acak yang kuat)
JWT_SECRET="super_secret_key_finku_123!"
```

### 4. Migrasi Database (Prisma)
Jalankan perintah ini untuk membuat tabel di database PostgreSQL Anda berdasarkan schema Prisma:
```bash
npx prisma migrate dev --name init
```

### 5. Jalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🗄️ Struktur Database (ERD)

Database terdiri dari 3 model utama:
1. **User:** Menyimpan kredensial pengguna (`id, email, password, name`).
2. **Category:** Menyimpan referensi kategori arus kas (`id, name, type, color, icon, userId`).
3. **Transaction:** Menyimpan rekam jejak transaksi (`id, title, amount, type, date, note, categoryId, userId`).

*Relasi: Satu `User` memiliki banyak `Transaction` dan `Category`. Penghapusan `User` akan memicu `Cascade Delete` untuk semua data transaksinya.*

---

## 📡 Dokumentasi API

Aplikasi ini menggunakan REST API terstandarisasi. Setiap *response* dibungkus dengan format:
- Sukses: `{ "success": true, "data": { ... } }`
- Error: `{ "success": false, "error": "Pesan error" }`

### Endpoint Tersedia:
- **Auth:**
  - `POST /api/auth/register` - Pendaftaran akun baru.
  - `POST /api/auth/login` - Login & set HttpOnly Cookie.
  - `GET /api/auth/me` - Validasi session JWT dan ambil data profil.
  - `POST /api/auth/logout` - Hapus session/cookie.
- **Transactions:**
  - `GET /api/transactions` - Ambil daftar transaksi (mendukung query string).
  - `POST /api/transactions` - Tambah transaksi baru.
  - `PUT /api/transactions/:id` - Edit transaksi.
  - `DELETE /api/transactions/:id` - Hapus transaksi.
- **Categories:**
  - `GET /api/categories` - Ambil kategori milik user & kategori default.
  - `POST /api/categories` - Buat kategori kustom.
  - `DELETE /api/categories/:id` - Hapus kategori kustom.
- **Dashboard:**
  - `GET /api/dashboard` - Agregasi data statistik & grafik 6 bulan terakhir.

---

## 👥 Tim Pengembang (Peran)

Proyek ini dikembangkan menggunakan siklus metode pengembangan dengan pembagian peran yang jelas:
- **Project Manager:** Perencanaan jadwal, manajemen risiko, Trello Board, dan dokumentasi proyek.
- **System Analyst:** Analisis kebutuhan sistem, ERD, Use Case, dan kontrak API.
- **UI/UX Designer:** Prototyping Figma, wireframe, dan penetapan Design System (Neubrutalism).
- **Frontend Developer:** Slicing UI Next.js, interaktivitas halaman, integrasi Chart, dan State Management.
- **Backend Developer:** Struktur database PostgreSQL, Prisma ORM, arsitektur REST API, dan Security (JWT).
- **Quality Assurance (QA):** Skenario pengujian (Blackbox Testing), Bug Reporting, dan UAT.

---
*© 2026 FinKu - Tugas Manajemen Proyek TI*
