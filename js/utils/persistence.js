/**
 * Data Persistence Utilities
 * Reused pattern from Continuous-Improvement-Calculator
 * Handles localStorage and URL parameter sharing
 */

const STORAGE_KEY = 'proof-kit-data';

/**
 * Save calculator data to localStorage
 * @param {object} data - Object with calculator data
 * @returns {boolean} Success status
 */
function saveToLocalStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
    return false;
  }
}

/**
 * Load calculator data from localStorage
 * @returns {object|null} Stored data or null if not found
 */
function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
    return null;
  }
}

/**
 * Clear localStorage data
 * @returns {boolean} Success status
 */
function clearLocalStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear localStorage:', e);
    return false;
  }
}

/**
 * Load data from URL parameters
 * Gives priority to URL params over localStorage
 * @returns {object|null} Data extracted from URL or null
 */
function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const data = {};
  let hasParams = false;

  params.forEach((value, key) => {
    // Try to parse as number
    const numValue = parseFloat(value);
    data[key] = isNaN(numValue) ? value : numValue;
    hasParams = true;
  });

  return hasParams ? data : null;
}

/**
 * Generate shareable URL with current data
 * @param {object} data - Data to encode in URL
 * @returns {string} Full shareable URL
 */
function generateShareableURL(data) {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      params.set(key, value);
    }
  });

  const baseURL = window.location.pathname;
  return window.location.origin + baseURL + (params.toString() ? '?' + params.toString() : '');
}

/**
 * Load data with priority: URL params > localStorage > defaults
 * @param {object} defaults - Default values object
 * @returns {object} Merged data object
 */
function loadData(defaults = {}) {
  let data = { ...defaults };

  // First try URL params (highest priority)
  const urlData = loadFromURL();
  if (urlData) {
    data = { ...data, ...urlData };
    return data;
  }

  // Then try localStorage
  const storedData = loadFromLocalStorage();
  if (storedData) {
    data = { ...data, ...storedData };
  }

  return data;
}

/**
 * Auto-save data to both localStorage and history
 * Can be called periodically as user types
 * @param {object} data - Data to save
 * @returns {boolean} Success status
 */
function autoSave(data) {
  const saved = saveToLocalStorage(data);

  // Update URL without page reload (for better UX)
  const url = generateShareableURL(data);
  window.history.replaceState(null, '', url);

  return saved;
}

/**
 * Share data via URL - copy to clipboard and show feedback
 * @param {object} data - Data to share
 * @param {function} onSuccess - Callback on success
 * @returns {Promise<boolean>} Success status
 */
async function shareViaURL(data, onSuccess) {
  const url = generateShareableURL(data);

  try {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    if (onSuccess) {
      onSuccess(url);
    }
    return true;
  } catch (e) {
    console.error('Failed to copy URL to clipboard:', e);
    return false;
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    STORAGE_KEY,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    loadFromURL,
    generateShareableURL,
    loadData,
    autoSave,
    shareViaURL
  };
}
