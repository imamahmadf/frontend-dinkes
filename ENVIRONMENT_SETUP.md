# Setup Environment Variables

## Cara Mengatur Environment Variables

### 1. Buat file `.env` di root project

```bash
# Di root project website-dinkes
touch .env
```

### 2. Tambahkan konfigurasi berikut di file `.env`

```env
VITE_API_URL=http://localhost:7000/api
```

### 3. Restart development server

```bash
npm run dev
```

## Troubleshooting

### Error: "Cannot read properties of undefined"

- Pastikan file `.env` sudah dibuat di root project
- Pastikan `VITE_API_URL` sudah diset dengan benar
- Restart development server setelah mengubah file `.env`

### Error: "Network Error" atau "Connection Refused"

- Pastikan backend server berjalan di `http://localhost:7000`
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

- File `.env` tidak akan di-commit ke git (sudah di-ignore)
- Gunakan file `env.example` sebagai template
- Untuk production, set `VITE_API_URL` ke URL production API
