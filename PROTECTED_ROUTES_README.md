# Protected Routes Documentation

## Overview

Sistem protected routes telah diimplementasikan untuk melindungi halaman-halaman yang memerlukan autentikasi. Sistem ini mendukung multiple roles per user dan role hierarchy.

## Role Structure

Berdasarkan data dari localStorage, sistem mendukung role berikut:

### Role Hierarchy (Tertinggi ke Terendah):

1. **Super Admin** - Akses penuh ke semua halaman
2. **Admin Dinas Kesehatan** - Akses ke halaman admin
3. **User** - Akses terbatas sesuai permission

### Multiple Roles Support:

User dapat memiliki multiple roles sekaligus. Contoh:

```javascript
[
  { role: { nama: "User" } },
  { role: { nama: "Admin Dinas Kesehatan" } },
  { role: { nama: "Super Admin" } },
];
```

## Komponen

### 1. ProtectedRoute

Komponen utama untuk melindungi halaman yang memerlukan login.

```jsx
// Basic protection
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

// Role-specific protection
<ProtectedRoute requiredRole="User">
  <UserComponent />
</ProtectedRoute>

// Multiple roles protection
<ProtectedRoute requiredRoles={["Admin Dinas Kesehatan", "Super Admin"]}>
  <AdminComponent />
</ProtectedRoute>

// Minimum role protection
<ProtectedRoute minimumRole="User">
  <Component />
</ProtectedRoute>
```

**Props:**

- `requiredRole` - Role spesifik yang dibutuhkan
- `requiredRoles` - Array roles yang dibutuhkan (salah satu)
- `minimumRole` - Role minimum yang dibutuhkan (hierarchy)

### 2. AdminRoute

Komponen khusus untuk halaman yang bisa diakses Admin Dinas Kesehatan dan Super Admin.

```jsx
<AdminRoute>
  <AdminComponent />
</AdminRoute>
```

### 3. UserRoute

Komponen untuk halaman yang bisa diakses user biasa.

```jsx
<UserRoute>
  <UserComponent />
</UserRoute>
```

### 4. SuperAdminRoute

Komponen untuk halaman yang hanya bisa diakses Super Admin.

```jsx
<SuperAdminRoute>
  <SuperAdminComponent />
</SuperAdminRoute>
```

## Implementasi Routes

### Public Routes (Tidak memerlukan login)

- `/` - Home
- `/login` - Halaman login
- `/dinkes/*` - Halaman Dinas Kesehatan
- `/informasi/*` - Halaman PPID
- `/ppid/*` - Halaman Profil PPID

### Protected Routes (Memerlukan login)

- `/pelayanan/permohonan` - Form permohonan (minimal User)
- `/pelayanan/cek-permohonan` - Cek status permohonan (minimal User)

### Admin Routes (Admin Dinas Kesehatan + Super Admin)

- `/bidang/p2p` - Bidang P2P
- `/bidang/sekret` - Bidang Sekretariat
- `/bidang/sdk` - Bidang SDK
- `/bidang/yankes` - Bidang Yankes
- `/bidang/kesmas` - Bidang Kesmas

### User Routes (User biasa)

- `/sop/pengajuan-informasi` - SOP Pengajuan Informasi

### Super Admin Routes (Hanya Super Admin)

- `/admin/super` - Super Admin Dashboard

## Utility Functions

### Role Utils (`src/utils/roleUtils.js`)

```javascript
import {
  hasRole,
  hasAnyRole,
  hasAllRoles,
  hasMinimumRole,
  getHighestRole,
  extractRoleNames,
} from "../utils/roleUtils";

// Cek role spesifik
hasRole(userRoles, "User");

// Cek salah satu role
hasAnyRole(userRoles, ["Admin Dinas Kesehatan", "Super Admin"]);

// Cek semua role
hasAllRoles(userRoles, ["User", "Admin Dinas Kesehatan"]);

// Cek role minimum
hasMinimumRole(userRoles, "User");

// Dapatkan role tertinggi
getHighestRole(userRoles);

// Ekstrak nama-nama role
extractRoleNames(userRoles);
```

## Flow Autentikasi

1. **User mengakses halaman protected**
2. **ProtectedRoute mengecek isAuthenticated**
3. **Jika belum login → Redirect ke /login**
4. **Setelah login berhasil → Redirect kembali ke halaman yang dimaksud**
5. **Cek role-based access → Tampilkan halaman atau pesan error**

## Error Handling

- **401 Unauthorized** - Redirect ke login
- **403 Forbidden** - Tampilkan pesan "Akses Ditolak" dengan detail role
- **Loading State** - Tampilkan spinner saat verifikasi

## Testing

1. **Test tanpa login** - Akses halaman protected, harus redirect ke login
2. **Test dengan login User** - Login dengan role User, cek akses halaman
3. **Test dengan login Admin** - Login dengan role Admin, cek akses halaman
4. **Test dengan login Super Admin** - Login dengan role Super Admin, cek akses semua halaman
5. **Test multiple roles** - Login dengan multiple roles, cek akses sesuai role tertinggi

## Security Features

- ✅ Route protection
- ✅ Multiple roles support
- ✅ Role hierarchy
- ✅ Role-based access control
- ✅ Automatic redirect after login
- ✅ Loading states
- ✅ Detailed error messages
- ✅ Clean URL management
