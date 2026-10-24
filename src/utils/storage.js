/**
 * Safe localStorage wrapper with JSON serialization and error fallbacks
 */
const STORAGE_PREFIX = 'kode_x_attire_';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`[storage] Error retrieving key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`[storage] Error saving key "${key}":`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      return true;
    } catch (error) {
      console.warn(`[storage] Error removing key "${key}":`, error);
      return false;
    }
  }
};

export default storage;
