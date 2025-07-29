# Form Permohonan Informasi Online

## Deskripsi

Form ini dibuat untuk mengajukan permohonan informasi online ke Dinas Kesehatan dengan validasi yang lengkap menggunakan Formik dan Yup.

## Fitur

- ✅ Validasi form menggunakan Formik dan Yup
- ✅ Upload file foto KTP (JPG/PNG, max 1MB)
- ✅ Validasi NIK 16 digit
- ✅ Validasi email format
- ✅ Validasi nomor WhatsApp
- ✅ Pengiriman data ke API menggunakan Axios
- ✅ Loading state saat submit
- ✅ Toast notification untuk feedback
- ✅ Responsive design dengan Chakra UI

## Field yang Tersedia

### 1. NIK (Nomor Induk Kependudukan)

- **Validasi**: Harus 16 digit angka
- **Required**: Ya
- **Format**: 1234567890123456

### 2. Nama Lengkap

- **Validasi**: Minimal 3 karakter
- **Required**: Ya

### 3. Upload Foto KTP

- **Validasi**:
  - Format: JPG/PNG
  - Ukuran maksimal: 1MB
- **Required**: Ya

### 4. Alamat Lengkap

- **Validasi**: Minimal 10 karakter
- **Required**: Ya
- **Type**: Textarea

### 5. Email

- **Validasi**: Format email valid
- **Required**: Ya
- **Format**: contoh@email.com

### 6. Nomor WhatsApp

- **Validasi**: 10-13 digit angka
- **Required**: Ya
- **Format**: 8xxxxxxxxxx (tanpa +62)

### 7. Asal Instansi

- **Validasi**: Minimal 3 karakter
- **Required**: Ya

### 8. Alasan Permohonan

- **Validasi**: Minimal 10 karakter
- **Required**: Ya
- **Type**: Textarea

### 9. Rincian Informasi yang Diminta

- **Validasi**: Minimal 10 karakter
- **Required**: Ya
- **Type**: Textarea

## Konfigurasi API

### File: `src/utils/api.js`

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
```

### Environment Variable

Buat file `.env` di root project:

```env
VITE_API_URL=http://your-api-url.com/api
```

## Endpoint API yang Diharapkan

### POST `/permohonan-informasi`

**Request Body**: FormData

```javascript
{
  nik: "1234567890123456",
  nama: "Nama Lengkap",
  fotoKtp: File,
  alamatLengkap: "Alamat lengkap",
  email: "email@example.com",
  nomorWa: "81234567890",
  alasanPermohonan: "Alasan permohonan",
  rincianInformasi: "Rincian informasi",
  asalInstansi: "Nama Instansi"
}
```

**Response Success**:

```javascript
{
  success: true,
  message: "Permohonan berhasil dikirim",
  data: {
    id: "permohonan_id",
    // ... data lainnya
  }
}
```

**Response Error**:

```javascript
{
  success: false,
  message: "Pesan error",
  errors: {
    // field errors jika ada
  }
}
```

## Dependencies yang Diperlukan

```json
{
  "formik": "^2.4.5",
  "yup": "^1.4.0",
  "axios": "^1.1.3"
}
```

## Cara Penggunaan

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Set Environment Variable**:
   Buat file `.env` dan set `VITE_API_URL`

3. **Jalankan Development Server**:

   ```bash
   npm run dev
   ```

4. **Akses Form**:
   Buka browser dan akses `/pelayanan/permohonan`

## Customization

### Mengubah Validasi

Edit schema validasi di `src/pages/Pelayanan/Permohonan.jsx`:

```javascript
const validationSchema = Yup.object({
  // Ubah validasi sesuai kebutuhan
});
```

### Mengubah Styling

Form menggunakan Chakra UI, jadi bisa diubah menggunakan props Chakra UI:

```javascript
<Input size="lg" variant="filled" colorScheme="green" />
```

### Menambah Field Baru

1. Tambahkan field di `initialValues`
2. Tambahkan validasi di `validationSchema`
3. Tambahkan komponen form
4. Tambahkan ke FormData di `handleSubmit`

## Troubleshooting

### Error: "Module not found"

Pastikan semua dependencies sudah terinstall:

```bash
npm install formik yup axios
```

### Error: "API not responding"

1. Periksa URL API di `.env`
2. Periksa koneksi internet
3. Periksa CORS policy di backend

### Error: "File upload failed"

1. Periksa ukuran file (max 1MB)
2. Periksa format file (JPG/PNG)
3. Periksa endpoint API untuk file upload

## Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository atau hubungi tim development.
