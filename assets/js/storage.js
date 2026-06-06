/**
 * Storage Utility
 * Simple localStorage wrapper with JSON serialization and error handling.
 */
var Storage = (function () {
  'use strict';

  function isAvailable() {
    try {
      var test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  var available = isAvailable();

  return {
    /**
     * Get a value from localStorage.
     * @param {string} key
     * @param {*} fallback - Default value if key doesn't exist
     * @returns {*}
     */
    get: function (key, fallback) {
      if (!available) return fallback;
      try {
        var raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
      } catch {
        return fallback;
      }
    },

    /**
     * Set a value in localStorage.
     * @param {string} key
     * @param {*} value
     * @returns {boolean} Success
     */
    set: function (key, value) {
      if (!available) return false;
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },

    /**
     * Remove a key from localStorage.
     * @param {string} key
     * @returns {boolean} Success
     */
    remove: function (key) {
      if (!available) return false;
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    },

    /**
     * Clear all localStorage entries.
     * @returns {boolean} Success
     */
    clear: function () {
      if (!available) return false;
      try {
        localStorage.clear();
        return true;
      } catch {
        return false;
      }
    },

    /** Whether localStorage is available */
    isAvailable: available,
  };
})();
