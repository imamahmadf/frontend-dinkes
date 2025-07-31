# Komponen BeritaCard

## Deskripsi

Komponen `BeritaCard` digunakan untuk menampilkan kartu berita dengan layout yang menarik dan responsif.

## Fitur

- ✅ Tampilan kartu yang menarik dengan shadow dan hover effect
- ✅ Gambar berita dengan fallback jika gambar tidak ada
- ✅ Badge tema berita di pojok kiri atas
- ✅ Judul berita dengan truncation jika terlalu panjang
- ✅ Ringkasan berita yang dibersihkan dari HTML tags
- ✅ Informasi penulis
- ✅ Tombol "Baca Selengkapnya" dengan hover effect
- ✅ Animasi fade-in dengan delay bertahap
- ✅ Responsif untuk berbagai ukuran layar

## Penggunaan

```jsx
import BeritaCard from "../components/BeritaCard";

// Dalam komponen
<BeritaCard berita={beritaData} index={0} />;
```

## Props

| Prop     | Tipe   | Deskripsi                         |
| -------- | ------ | --------------------------------- |
| `berita` | Object | Data berita yang akan ditampilkan |
| `index`  | Number | Index untuk animasi delay         |

## Struktur Data Berita

```javascript
{
  id: 1,
  judul: "Judul Berita",
  ringkasan: "<p>Ringkasan berita dalam format HTML</p>",
  foto: "/berita/BERITA_WVplF8VK1H.jpg",
  penulis: "Admin",
  temaBerita: {
    id: 1,
    tema: "Kesehatan Anak"
  },
  bidang: null
}
```

## Fitur Utama

### 1. Penanganan Gambar

- Menggunakan URL API untuk mengambil gambar
- Fallback image jika gambar tidak ada
- Error handling untuk gambar yang gagal dimuat

### 2. Pembersihan HTML

- Menghapus HTML tags dari ringkasan
- Memotong teks jika terlalu panjang
- Menampilkan teks yang bersih

### 3. Animasi

- Fade-in animation dengan delay bertahap
- Hover effect pada kartu
- Smooth transitions

### 4. Responsivitas

- Grid layout yang responsif
- 1 kolom di mobile, 2 di tablet, 3 di desktop
- Text truncation untuk judul dan ringkasan

## Styling

### Warna

- Background: white
- Shadow: md (hover: lg)
- Badge: blue.500
- Text: gray.800 (judul), gray.600 (ringkasan), gray.500 (meta)

### Spacing

- Padding: 4 (16px) untuk konten
- Margin bottom: 2 (8px) untuk judul, 3 (12px) untuk ringkasan
- Gap: 6 (24px) antar kartu

### Typography

- Judul: lg, bold
- Ringkasan: sm
- Meta: sm

## TODO

- [ ] Implementasi navigasi ke halaman detail berita
- [ ] Tambahkan loading state untuk gambar
- [ ] Tambahkan lazy loading untuk gambar
- [ ] Implementasi share button
- [ ] Tambahkan tanggal publikasi
