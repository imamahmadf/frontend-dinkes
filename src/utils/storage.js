// Utility functions untuk menangani localStorage dengan aman

export const safeGetItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing localStorage item '${key}':`, error);
    localStorage.removeItem(key); // Hapus item yang corrupt
    return null;
  }
};

export const safeSetItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error setting localStorage item '${key}':`, error);
    return false;
  }
};

export const safeRemoveItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage item '${key}':`, error);
    return false;
  }
};
