/**
 * Formatting Utilities
 * Handle currency, numbers, and narrative generation for proof-kit calculators
 */

/**
 * Format number as USD currency with K/M suffixes for readability
 * @param {number} value - The number to format
 * @returns {string} Formatted currency string (e.g., "$47.2K")
 */
function formatCurrency(value) {
  if (value >= 1000000) {
    return '$' + (value / 1000000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return '$' + (value / 1000).toFixed(1) + 'K';
  }
  return '$' + Math.round(value);
}

/**
 * Format number with thousands separator
 * @param {number} value - The number to format
 * @returns {string} Formatted number (e.g., "1,234,567")
 */
function formatNumber(value) {
  return Math.round(value).toLocaleString('en-US');
}

/**
 * Format percentage
 * @param {number} value - The decimal value (0.5 = 50%)
 * @returns {string} Formatted percentage (e.g., "50%")
 */
function formatPercent(value) {
  return Math.round(value * 100) + '%';
}

/**
 * C1 Calculator narrative generation
 * @param {number} totalValue - Total monetary value
 * @param {number} totalHours - Total hours saved
 * @param {number} obstacleCount - Number of obstacles removed
 * @returns {string} Human-readable narrative
 */
function generateC1Narrative(totalValue, totalHours, obstacleCount) {
  const days = Math.floor(totalHours / 8);
  const formattedValue = formatCurrency(totalValue);

  if (obstacleCount === 1) {
    return `I removed 1 critical obstacle, unfreezing ${formattedValue} in team capacity (${days} days of focused work).`;
  }

  return `I removed ${obstacleCount} obstacles, unfreezing ${formattedValue} in team capacity (${days} days of focused work).`;
}

/**
 * Cost of Delay narrative generation
 * @param {number} totalImpact - Total business impact prevented
 * @param {number} totalDays - Total days of delay prevented
 * @param {number} itemCount - Number of items unblocked
 * @param {number} avgTeamSize - Average team size
 * @returns {string} Human-readable narrative
 */
function generateCostOfDelayNarrative(totalImpact, totalDays, itemCount, avgTeamSize) {
  const formattedImpact = formatCurrency(totalImpact);

  if (itemCount === 1) {
    return `Unblocking this item prevented ${formattedImpact} in productivity loss across ${avgTeamSize} team member(s) over ${totalDays} days.`;
  }

  return `Unblocking ${itemCount} items prevented ${formattedImpact} in productivity loss across ${avgTeamSize} team member(s) over ${totalDays} days.`;
}

/**
 * Meeting Cost narrative generation
 * @param {number} annualSavings - Annual cost savings
 * @param {number} hoursRecovered - Hours of focus time recovered
 * @param {number} meetingCount - Number of meetings optimized
 * @returns {string} Human-readable narrative
 */
function generateMeetingCostNarrative(annualSavings, hoursRecovered, meetingCount) {
  const formattedSavings = formatCurrency(annualSavings);
  const weeks = hoursRecovered / 40;

  let timeDescription = '';
  if (weeks >= 1) {
    const weeksRounded = weeks.toFixed(1);
    timeDescription = weeksRounded + ' weeks';
  } else {
    const daysRecovered = Math.floor(hoursRecovered / 8);
    timeDescription = daysRecovered + ' days';
  }

  if (meetingCount === 1) {
    return `Optimizing this meeting saves ${formattedSavings} annually and recovers ${timeDescription} of focus time for deep work.`;
  }

  return `Optimizing these ${meetingCount} meetings saves ${formattedSavings} annually and recovers ${timeDescription} of focus time for deep work.`;
}

/**
 * Format obstacle item for display
 * @param {object} item - Obstacle item with name, value, hours
 * @returns {string} HTML string for display
 */
function formatObstacleBreakdown(item) {
  const formattedValue = formatCurrency(item.value);
  const formattedHours = item.hoursReadable || (item.hours + ' hours');

  return `<div class="breakdown-item">
    <div class="breakdown-name">${escapeHtml(item.name)}</div>
    <div class="breakdown-details">
      <span>${formattedValue}</span>
      <span>${formattedHours}</span>
    </div>
  </div>`;
}

/**
 * Format item for Cost of Delay display
 * @param {object} item - Item with name, value
 * @returns {string} HTML string for display
 */
function formatCostOfDelayBreakdown(item) {
  const formattedValue = formatCurrency(item.value);

  return `<div class="breakdown-item">
    <div class="breakdown-name">${escapeHtml(item.name)}</div>
    <div class="breakdown-value">${formattedValue}</div>
  </div>`;
}

/**
 * Format meeting for display
 * @param {object} item - Meeting item with name, value, hoursRecovered
 * @returns {string} HTML string for display
 */
function formatMeetingBreakdown(item) {
  const formattedValue = formatCurrency(item.value);
  const formattedHours = formatHoursToReadable ? formatHoursToReadable(item.hoursRecovered || 0) : item.hoursRecovered;

  return `<div class="breakdown-item">
    <div class="breakdown-name">${escapeHtml(item.name)}</div>
    <div class="breakdown-details">
      <span>${formattedValue}/year</span>
      <span>${formattedHours}</span>
    </div>
  </div>`;
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatCurrency,
    formatNumber,
    formatPercent,
    generateC1Narrative,
    generateCostOfDelayNarrative,
    generateMeetingCostNarrative,
    formatObstacleBreakdown,
    formatCostOfDelayBreakdown,
    formatMeetingBreakdown,
    escapeHtml
  };
}
