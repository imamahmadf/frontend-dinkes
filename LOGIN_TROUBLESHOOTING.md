# Troubleshooting Login System

## Masalah yang Sudah Diperbaiki:

### 1. ✅ AuthContext tidak mengembalikan boolean

- **Masalah**: Fungsi `login` di AuthContext tidak mengembalikan `true/false`
- **Solusi**: Ditambahkan `return true` untuk sukses dan `return false` untuk gagal

### 2. ✅ Missing isAuthenticated computed value

- **Masalah**: Tidak ada computed value untuk `isAuthenticated`
- **Solusi**: Ditambahkan `const isAuthenticated = !!token && !!user`

### 3. ✅ App.jsx menggunakan fungsi yang tidak ada

- **Masalah**: App.jsx menggunakan `logout`, `setToken`, `setUser`, `setRole` tanpa context
- **Solusi**: Ditambahkan `useContext(AuthContext)` dan ekspos setter functions

### 4. ✅ Missing environment variable

- **Masalah**: `VITE_REACT_APP_API_BASE_URL` tidak terdefinisi
- **Solusi**: Buat file `.env` dengan:

```
VITE_REACT_APP_API_BASE_URL=http://localhost:3000/api
```

### 5. ✅ JSON Parse Error

- **Masalah**: `JSON.parse()` error ketika localStorage item adalah `null` atau `undefined`
- **Solusi**:
  - Dibuat utility functions `safeGetItem`, `safeSetItem`, `safeRemoveItem`
  - Menambahkan try-catch untuk menangani error JSON parse
  - Otomatis menghapus localStorage item yang corrupt

### 6. ✅ Infinite Loop di App.jsx

- **Masalah**: `checkAuth` terus dipanggil berulang kali karena dependency array yang salah
- **Solusi**:
  - Menggunakan `useCallback` di AuthContext untuk mencegah re-render
  - Menambahkan `useRef` untuk mencegah multiple API calls
  - Menghapus dependency array yang tidak perlu
  - Menambahkan pengecekan `isAuthenticated` untuk skip auth check yang tidak perlu

### 7. ✅ DOM Properties Warning

- **Masalah**: Warning `frameborder`, `referrerpolicy`, `allowfullscreen` di iframe
- **Solusi**:
  - Mengubah `frameborder` menjadi `frameBorder`
  - Mengubah `referrerpolicy` menjadi `referrerPolicy`
  - Mengubah `allowfullscreen` menjadi `allowFullScreen`

### 8. ✅ Redirect ke Home Issue

- **Masalah**: User tidak bisa akses halaman login karena langsung redirect ke home
- **Solusi**:
  - Menambahkan parameter `?force=true` untuk force login
  - Menambahkan tombol logout di navbar
  - Memperbaiki kondisi redirect di Login component

### 9. ✅ Logout Infinite Loop Issue

- **Masalah**: Setelah logout, aplikasi mengalami infinite loop di halaman login
- **Solusi**:
  - Menghapus pemanggilan `logout()` di App.jsx untuk mencegah infinite loop
  - Menambahkan parameter `?force=true` saat logout
  - Menambahkan `setTimeout` untuk memastikan state terupdate sebelum redirect
  - Menambahkan debugging untuk memahami flow login/logout

## Langkah-langkah Debug:

### 1. Periksa Environment Variable

```bash
# Buat file .env di root project
echo "VITE_REACT_APP_API_BASE_URL=http://localhost:3000/api" > .env
```

### 2. Clear localStorage jika ada data corrupt

```javascript
// Di browser console
localStorage.clear();
// Atau hapus item tertentu
localStorage.removeItem("user");
localStorage.removeItem("role");
localStorage.removeItem("token");
```

### 3. Periksa Console Browser

- Buka Developer Tools (F12)
- Lihat tab Console untuk error messages
- Periksa Network tab untuk request API

### 4. Periksa Backend API

- Pastikan backend server berjalan
- Pastikan endpoint `/user/login` tersedia
- Periksa response format dari API

### 5. Test dengan Data Dummy

```javascript
// Di browser console, test:
console.log(import.meta.env.VITE_REACT_APP_API_BASE_URL);
```

## Common Issues:

### 1. CORS Error

- Pastikan backend mengizinkan CORS dari frontend
- Tambahkan headers yang diperlukan

### 2. Network Error

- Periksa URL API di environment variable
- Pastikan backend server berjalan

### 3. Authentication Error

- Periksa format data yang dikirim ke API
- Pastikan backend menerima `namaPengguna` dan `password`

### 4. JSON Parse Error

- Error ini terjadi ketika localStorage berisi data yang tidak valid JSON
- Solusi: Gunakan utility functions yang sudah dibuat
- Atau clear localStorage dan coba login ulang

## Testing:

1. Buka halaman login
2. Masukkan credentials
3. Periksa console untuk log messages
4. Periksa Network tab untuk request/response
5. Periksa localStorage untuk token dan user data

## Debug Commands:

```javascript
// Di browser console
localStorage.getItem("token");
localStorage.getItem("user");
localStorage.getItem("role");

// Clear localStorage jika ada masalah
localStorage.clear();
```

## Utility Functions:

File `src/utils/storage.js` berisi fungsi-fungsi aman untuk menangani localStorage:

- `safeGetItem(key)` - Mengambil item dengan error handling
- `safeSetItem(key, value)` - Menyimpan item dengan error handling
- `safeRemoveItem(key)` - Menghapus item dengan error handling
