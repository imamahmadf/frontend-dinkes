# Setup Environment Variables

## Cara Mengatur Environment Variables

### 1. Buat file `.env` di root project

```bash
# Di root project website-dinkes
touch .env
```

### 2. Tambahkan konfigurasi berikut di file `.env`

#### Untuk Development:

```env
VITE_API_URL=http://localhost:7000/api
```

#### Untuk Production:

```env
VITE_API_URL=https://your-production-domain.com/api
```

**PENTING:** Ganti `your-production-domain.com` dengan domain production Anda yang sebenarnya.

### 3. Restart development server

```bash
npm run dev
```

## Setup Production

### 1. Buat file `.env.production` untuk production build

```bash
# Di root project website-dinkes
touch .env.production
```

### 2. Tambahkan konfigurasi production

```env
VITE_API_URL=https://your-production-domain.com/api
```

### 3. Build untuk production

```bash
npm run build
```

## Troubleshooting

### Masalah: Di production masih membaca localhost

**Penyebab:**

- File `.env` atau `.env.production` tidak ada
- `VITE_API_URL` tidak diset dengan benar
- Domain production belum diganti dengan domain yang sebenarnya

**Solusi:**

1. Pastikan file `.env.production` ada dengan `VITE_API_URL` yang benar
2. Ganti `your-production-domain.com` dengan domain production Anda
3. Rebuild aplikasi setelah mengubah environment variables

### Error: "Cannot read properties of undefined"

- Pastikan file `.env` sudah dibuat di root project
- Pastikan `VITE_API_URL` sudah diset dengan benar
- Restart development server setelah mengubah file `.env`

### Error: "Network Error" atau "Connection Refused"

- Pastikan backend server berjalan di `http://localhost:7000` (development)
- Pastikan backend server berjalan di domain production (production)
- Periksa apakah port 7000 tidak digunakan aplikasi lain
- Pastikan backend API endpoint `/berita/list` tersedia

### Error: "404 Not Found"

- Periksa apakah endpoint `/berita/list` ada di backend
- Pastikan base URL API sudah benar

## Struktur Response API yang Diharapkan

```json
{
  "result": [
    {
      "id": 1,
      "title": "Judul Berita",
      "content": "Isi berita...",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Catatan

- File `.env` dan `.env.production` tidak akan di-commit ke git (sudah di-ignore)
- Gunakan file `env.example` sebagai template
- Untuk production, set `VITE_API_URL` ke URL production API
- Jika tidak ada environment variable, aplikasi akan menggunakan fallback berdasarkan environment (localhost untuk dev, domain production untuk prod)
