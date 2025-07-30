// Utility functions untuk menangani multiple roles

/**
 * Mengekstrak nama-nama role dari array roles
 * @param {Array} roles - Array roles dari localStorage
 * @returns {Array} Array nama-nama role
 */
export const extractRoleNames = (roles) => {
  if (!roles || !Array.isArray(roles)) {
    return [];
  }

  return roles
    .map((roleItem) => roleItem.role?.nama || roleItem.nama)
    .filter(Boolean);
};

/**
 * Mengecek apakah user memiliki role tertentu
 * @param {Array} roles - Array roles dari localStorage
 * @param {string} requiredRole - Role yang dibutuhkan
 * @returns {boolean} True jika user memiliki role yang dibutuhkan
 */
export const hasRole = (roles, requiredRole) => {
  const roleNames = extractRoleNames(roles);
  return roleNames.includes(requiredRole);
};

/**
 * Mengecek apakah user memiliki salah satu dari roles yang dibutuhkan
 * @param {Array} roles - Array roles dari localStorage
 * @param {Array} requiredRoles - Array roles yang dibutuhkan
 * @returns {boolean} True jika user memiliki salah satu role yang dibutuhkan
 */
export const hasAnyRole = (roles, requiredRoles) => {
  const roleNames = extractRoleNames(roles);
  return requiredRoles.some((role) => roleNames.includes(role));
};

/**
 * Mengecek apakah user memiliki semua roles yang dibutuhkan
 * @param {Array} roles - Array roles dari localStorage
 * @param {Array} requiredRoles - Array roles yang dibutuhkan
 * @returns {boolean} True jika user memiliki semua role yang dibutuhkan
 */
export const hasAllRoles = (roles, requiredRoles) => {
  const roleNames = extractRoleNames(roles);
  return requiredRoles.every((role) => roleNames.includes(role));
};

/**
 * Mendapatkan role tertinggi dari user
 * @param {Array} roles - Array roles dari localStorage
 * @returns {string} Role tertinggi (Super Admin > Admin > User)
 */
export const getHighestRole = (roles) => {
  const roleNames = extractRoleNames(roles);

  if (roleNames.includes("Super Admin")) {
    return "Super Admin";
  } else if (roleNames.includes("Admin Dinas Kesehatan")) {
    return "Admin Dinas Kesehatan";
  } else if (roleNames.includes("User")) {
    return "User";
  }

  return null;
};

/**
 * Role hierarchy untuk menentukan akses
 */
export const ROLE_HIERARCHY = {
  "Super Admin": 3,
  "Admin Dinas Kesehatan": 2,
  User: 1,
};

/**
 * Mengecek apakah user memiliki role yang cukup tinggi
 * @param {Array} roles - Array roles dari localStorage
 * @param {string} minimumRole - Role minimum yang dibutuhkan
 * @returns {boolean} True jika user memiliki role yang cukup tinggi
 */
export const hasMinimumRole = (roles, minimumRole) => {
  const userHighestRole = getHighestRole(roles);
  const userLevel = ROLE_HIERARCHY[userHighestRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[minimumRole] || 0;

  return userLevel >= requiredLevel;
};
