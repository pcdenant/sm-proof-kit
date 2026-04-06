/**
 * Clipboard Utilities
 * Handle copy-to-clipboard functionality with fallback support
 */

/**
 * Copy text to clipboard with modern and fallback support
 * @param {string} text - Text to copy
 * @param {object} options - Options {onSuccess, onError, toastElement}
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text, options = {}) {
  const { onSuccess, onError, showToast = true } = options;

  try {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      if (showToast) {
        showCopyToast('Copied to clipboard!', 'success');
      }
      if (onSuccess) onSuccess();
      return true;
    }
  } catch (err) {
    console.warn('Clipboard API failed, trying fallback:', err);
  }

  // Fallback for older browsers
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);

    // Select and copy
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (success) {
      if (showToast) {
        showCopyToast('Copied to clipboard!', 'success');
      }
      if (onSuccess) onSuccess();
      return true;
    }
  } catch (err) {
    console.error('Fallback clipboard method failed:', err);
  }

  if (showToast) {
    showCopyToast('Failed to copy. Please try again.', 'error');
  }
  if (onError) onError();
  return false;
}

/**
 * Copy text and show user message dialog
 * @param {string} text - Text to copy
 * @param {string} message - Message to show user
 * @returns {Promise<boolean>} Success status
 */
async function copyWithMessage(text, message) {
  const success = await copyToClipboard(text);
  if (!success) {
    // Fallback: show modal with text for manual copy
    showManualCopyDialog(text, message);
  }
  return success;
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'info'
 * @param {number} duration - Duration in milliseconds
 */
function showCopyToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);

  // Remove after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, duration);
}

/**
 * Show manual copy dialog (fallback when clipboard fails)
 * @param {string} text - Text to copy manually
 * @param {string} title - Dialog title
 */
function showManualCopyDialog(text, title = 'Copy this text') {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 24px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  `;

  content.innerHTML = `
    <h3 style="margin-top: 0; color: #333;">${title}</h3>
    <textarea readonly style="
      width: 100%;
      height: 150px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      resize: none;
    ">${text}</textarea>
    <div style="margin-top: 16px; text-align: right;">
      <button onclick="this.closest('div').parentElement.remove()" style="
        padding: 8px 16px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      ">Close</button>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Close on Escape
  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', closeOnEscape);
    }
  };
  document.addEventListener('keydown', closeOnEscape);
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    copyToClipboard,
    copyWithMessage,
    showCopyToast,
    showManualCopyDialog
  };
}
