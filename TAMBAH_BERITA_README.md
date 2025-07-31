# Halaman Tambah Berita

## Deskripsi

Halaman ini digunakan untuk menambahkan berita baru ke dalam sistem. Menggunakan ReactQuill sebagai rich text editor untuk konten berita.

## Fitur Utama

### 1. Form Input Lengkap

- **Judul Berita**: Input text untuk judul berita (wajib)
- **Kategori**: Dropdown untuk memilih kategori berita (wajib)
  - Kesehatan
  - Pelayanan
  - Program
  - Umum
- **Penulis**: Input text untuk nama penulis (wajib)
- **Ringkasan**: Textarea untuk ringkasan singkat berita (wajib)
- **Gambar Berita**: Upload gambar dengan preview (opsional)
- **Status**: Dropdown untuk status berita
  - Draft
  - Published
- **Konten**: Rich text editor menggunakan ReactQuill (wajib)

### 2. Rich Text Editor (ReactQuill)

Editor dengan fitur formatting:

- **Header**: H1, H2, H3
- **Text Formatting**: Bold, Italic, Underline, Strike
- **Lists**: Ordered dan Unordered lists
- **Colors**: Text color dan background color
- **Alignment**: Left, Center, Right, Justify
- **Media**: Link dan Image insertion
- **Clean**: Clear formatting

### 3. Validasi Form

- Validasi client-side untuk semua field wajib
- Pesan error yang informatif
- Real-time error clearing saat user mulai mengetik

### 4. UX Features

- **Unsaved Changes Warning**: Alert ketika ada perubahan yang belum disimpan
- **Confirmation Modal**: Konfirmasi sebelum meninggalkan halaman dengan perubahan
- **Loading State**: Loading indicator saat menyimpan
- **Success/Error Toast**: Notifikasi hasil operasi
- **Form Reset**: Reset form setelah berhasil menyimpan

### 5. Responsive Design

- Responsive layout untuk desktop dan mobile
- Custom styling untuk ReactQuill yang sesuai dengan tema Chakra UI

## Dependencies

### NPM Packages

```bash
npm install react-quill --legacy-peer-deps
```

### CSS Files

- `react-quill/dist/quill.snow.css` - Default ReactQuill styles
- `src/styles/quill.css` - Custom styling untuk ReactQuill

## Struktur File

```
src/
├── pages/
│   └── Admin/
│       └── Berita/
│           └── TambahBerita.jsx
├── styles/
│   └── quill.css
└── components/
    └── Admin/
        └── LayoutAdmin.jsx
```

## Penggunaan

### Import Component

```jsx
import TambahBerita from "./pages/Admin/Berita/TambahBerita";
```

### Routing

```jsx
<Route path="/admin/berita/tambah" element={<TambahBerita />} />
```

## State Management

### Form Data

```javascript
const [formData, setFormData] = useState({
  judul: "",
  kategori: "",
  ringkasan: "",
  konten: "",
  gambar: null,
  penulis: "",
  status: "draft",
});
```

### Error Handling

```javascript
const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
```

## API Integration

### Simulasi API Call

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    // Show validation error
    return;
  }

  setIsLoading(true);

  try {
    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success handling
    toast({
      title: "Berita berhasil ditambahkan",
      description: "Berita telah berhasil disimpan ke database",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Reset form dan navigate
    setFormData({...});
    navigate("/admin/berita");
  } catch (error) {
    // Error handling
    toast({
      title: "Error",
      description: "Terjadi kesalahan saat menyimpan berita",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setIsLoading(false);
  }
};
```

## Customization

### ReactQuill Configuration

```javascript
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "color",
  "background",
  "align",
  "link",
  "image",
];
```

### Styling

File `src/styles/quill.css` berisi custom styling untuk ReactQuill yang disesuaikan dengan tema Chakra UI.

## Troubleshooting

### React Version Compatibility

Jika terjadi error dengan React 19, gunakan flag `--legacy-peer-deps`:

```bash
npm install react-quill --legacy-peer-deps
```

### Styling Issues

Pastikan file CSS terimport dengan benar:

```jsx
import "react-quill/dist/quill.snow.css";
import "../../../styles/quill.css";
```

### Form Validation

Jika validasi tidak berfungsi, pastikan:

1. Semua field required memiliki `isRequired` prop
2. Error state diupdate dengan benar
3. Validation function dipanggil sebelum submit

## Future Enhancements

1. **Image Upload**: Integrasi dengan cloud storage untuk gambar
2. **Auto Save**: Auto save draft secara berkala
3. **Preview Mode**: Preview berita sebelum publish
4. **SEO Fields**: Meta title, description, keywords
5. **Tags**: Sistem tagging untuk berita
6. **Scheduling**: Jadwal publish berita
7. **Version Control**: History perubahan berita
