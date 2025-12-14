# 📚 Perpustakaan Cika - REST API

Sistem Manajemen Perpustakaan dengan REST API menggunakan Laravel 11 dan Laravel Sanctum untuk autentikasi.

## 🚀 Base URL

```
Production: https://perpustakaan.taro.web.id/api
Local: http://localhost/perpustakaan-cika/public/api
```

---

## 🔓 Public Routes (Tidak Perlu Login)

| Endpoint | Method | Keterangan |
|----------|--------|------------|
| `/api/register` | POST | Registrasi user baru |
| `/api/login` | POST | Login user (petugas/admin) |
| `/api/siswa/login` | POST | Login siswa (menggunakan NIS) |
| `/api/buku` | GET | Lihat daftar buku |
| `/api/buku/{id}` | GET | Lihat detail buku |

---

## 🔐 Protected Routes (Perlu Token Autentikasi)

| Endpoint | Method | Keterangan |
|----------|--------|------------|
| `/api/user` | GET | Lihat data user saat ini |
| `/api/profile` | GET | Lihat profil user |
| `/api/logout` | POST | Logout |
| `/api/logout-all` | POST | Logout dari semua device |
| `/api/buku` | POST | Tambah buku baru |
| `/api/buku/{id}` | PUT/PATCH | Update buku |
| `/api/buku/{id}` | DELETE | Hapus buku |
| `/api/siswa` | GET, POST, PUT, DELETE | Manajemen Siswa |
| `/api/kunjungan` | GET, POST, PUT, DELETE | Manajemen Kunjungan |
| `/api/peminjaman` | GET, POST, PUT, DELETE | Manajemen Peminjaman |
| `/api/pengembalian` | GET, POST, PUT, DELETE | Manajemen Pengembalian |
| `/api/data-siswa` | GET, POST, PUT, DELETE | Data Siswa untuk petugas |

---

## 📖 Panduan Penggunaan API

### 1️⃣ Registrasi User Baru

**Request:**
```http
POST /api/register
Content-Type: application/json

{
    "name": "Nama Lengkap",
    "username": "username",
    "email": "email@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

**Response (Success):**
```json
{
    "status": "success",
    "message": "Registrasi berhasil",
    "data": {
        "user": {
            "id": 1,
            "name": "Nama Lengkap",
            "email": "email@example.com"
        },
        "token": "1|abc123xyz..."
    }
}
```

---

### 2️⃣ Login User (Petugas/Admin)

**Request:**
```http
POST /api/login
Content-Type: application/json

{
    "email": "admin@perpus.com",
    "password": "123456"
}
```

**Response (Success):**
```json
{
    "status": "success",
    "message": "Login berhasil",
    "data": {
        "user": {
            "id": 1,
            "name": "Admin Petugas",
            "email": "admin@perpus.com",
            "role": "petugas"
        },
        "token": "2|def456abc..."
    }
}
```

---

### 3️⃣ Login Siswa (dengan NIS)

**Request:**
```http
POST /api/siswa/login
Content-Type: application/json

{
    "nis": "1001"
}
```

**Response (Success):**
```json
{
    "status": "success",
    "message": "Login siswa berhasil",
    "data": {
        "siswa": {
            "id": 1,
            "nama": "Andi Pratama",
            "nis": "1001",
            "kelas": "XI",
            "jurusan": "RPL"
        }
    }
}
```

---

### 4️⃣ Menggunakan Token untuk Akses Protected Routes

Setelah login, gunakan token yang didapat di header `Authorization`:

```http
GET /api/profile
Authorization: Bearer 2|def456abc...
Accept: application/json
```

---

### 5️⃣ Lihat Daftar Buku (Public)

**Request:**
```http
GET /api/buku
Accept: application/json
```

**Response:**
```json
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "judul": "Laskar Pelangi",
            "pengarang": "Andrea Hirata",
            "penerbit": "Bentang Pustaka",
            "tahun": 2005,
            "jenis": "Fiksi",
            "rak": "A-01",
            "stok": 3
        }
    ]
}
```

---

### 6️⃣ Tambah Buku Baru (Protected)

**Request:**
```http
POST /api/buku
Authorization: Bearer {token}
Content-Type: application/json

{
    "judul": "Buku Baru",
    "pengarang": "Penulis",
    "penerbit": "Penerbit XYZ",
    "tahun": 2024,
    "jenis": "Fiksi",
    "rak": "A-01",
    "stok": 5,
    "sinopsis": "Deskripsi buku"
}
```

---

### 7️⃣ CRUD Siswa (Protected)

| Action | Method | Endpoint | Body |
|--------|--------|----------|------|
| List | GET | `/api/siswa` | - |
| Detail | GET | `/api/siswa/{id}` | - |
| Create | POST | `/api/siswa` | `{nama, nis, kelas, jurusan}` |
| Update | PUT | `/api/siswa/{id}` | `{nama, nis, kelas, jurusan}` |
| Delete | DELETE | `/api/siswa/{id}` | - |

---

### 8️⃣ CRUD Peminjaman (Protected)

| Action | Method | Endpoint | Body |
|--------|--------|----------|------|
| List | GET | `/api/peminjaman` | - |
| Detail | GET | `/api/peminjaman/{id}` | - |
| Create | POST | `/api/peminjaman` | `{siswa_id, buku_id, tanggal_peminjaman, tanggal_kembali_rencana, jumlah}` |
| Update | PUT | `/api/peminjaman/{id}` | `{...}` |
| Delete | DELETE | `/api/peminjaman/{id}` | - |

---

### 9️⃣ Logout

**Request:**
```http
POST /api/logout
Authorization: Bearer {token}
```

**Response:**
```json
{
    "status": "success",
    "message": "Logout berhasil"
}
```

---

## 🧪 Testing dengan cURL

### Login:
```bash
curl -X POST https://perpustakaan.taro.web.id/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"admin@perpus.com","password":"123456"}'
```

### Get Buku (dengan Token):
```bash
curl -X GET https://perpustakaan.taro.web.id/api/buku \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🧪 Testing dengan Postman

1. Import collection atau buat request baru
2. Set base URL: `https://perpustakaan.taro.web.id/api`
3. Untuk login, kirim POST ke `/login` dengan body JSON
4. Copy token dari response
5. Di tab **Authorization**, pilih **Bearer Token** dan paste token
6. Akses protected routes

---

## ⚠️ Error Response

### Unauthorized (401)
```json
{
    "message": "Unauthenticated."
}
```

### Validation Error (422)
```json
{
    "message": "The given data was invalid.",
    "errors": {
        "email": ["The email field is required."]
    }
}
```

### Not Found (404)
```json
{
    "message": "Data tidak ditemukan"
}
```

---

## 👤 Default User

| Email | Password | Role |
|-------|----------|------|
| admin@perpus.com | 123456 | petugas |

---

## 📞 Kontak

Jika ada pertanyaan, hubungi developer.
