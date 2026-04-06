/**
 * Unit Conversion System
 * Reused pattern from impediment-value-calculator
 * Handles conversion between minutes, hours, days, weeks, months
 */

const UNITS = [
  {
    id: 'min',
    label: 'minutes',
    min: 1,
    max: 60,
    step: 1,
    toHours: function(value) {
      return value / 60;
    }
  },
  {
    id: 'h',
    label: 'hours',
    min: 0.5,
    max: 8,
    step: 0.5,
    toHours: function(value) {
      return value;
    }
  },
  {
    id: 'd',
    label: 'days',
    min: 0.5,
    max: 7,
    step: 0.5,
    toHours: function(value) {
      return value * 8;  // 8 hours per work day
    }
  },
  {
    id: 'w',
    label: 'weeks',
    min: 1,
    max: 4,
    step: 1,
    toHours: function(value) {
      return value * 40;  // 40 hours per work week
    }
  },
  {
    id: 'm',
    label: 'months',
    min: 1,
    max: 4,
    step: 1,
    toHours: function(value) {
      return value * 160;  // 160 hours per work month (4 weeks * 40 hours)
    }
  }
];

/**
 * Get unit object by ID
 * @param {string} unitId - Unit identifier (min, h, d, w, m)
 * @returns {object} Unit definition object
 */
function getUnit(unitId) {
  return UNITS.find(u => u.id === unitId) || UNITS[1]; // Default to hours
}

/**
 * Convert value from source unit to hours
 * @param {number} value - The value to convert
 * @param {string} fromUnit - Source unit ID
 * @returns {number} Value converted to hours
 */
function convertToHours(value, fromUnit) {
  const unit = getUnit(fromUnit);
  return unit ? unit.toHours(value) : value;
}

/**
 * Convert hours to display format with appropriate unit
 * @param {number} hours - Number of hours to convert
 * @returns {string} Human-readable time string (e.g., "3 days 4 hours")
 */
function formatHoursToReadable(hours) {
  if (hours < 1) {
    return Math.round(hours * 60) + ' min';
  }

  if (hours < 8) {
    return hours.toFixed(1) + ' hours';
  }

  const days = Math.floor(hours / 8);
  const remainingHours = hours % 8;

  if (remainingHours === 0) {
    return days === 1 ? '1 day' : days + ' days';
  }

  return days + ' days ' + remainingHours.toFixed(1) + ' hours';
}

/**
 * Convert hours to weeks of focus time (assuming 40 hours per week)
 * @param {number} hours - Number of hours
 * @returns {string} Human-readable weeks string
 */
function formatHoursToWeeks(hours) {
  const weeks = hours / 40;

  if (weeks < 1) {
    const days = Math.floor(hours / 8);
    return days + ' days';
  }

  if (weeks === 1) {
    return '1 week';
  }

  return weeks.toFixed(1) + ' weeks';
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    UNITS,
    getUnit,
    convertToHours,
    formatHoursToReadable,
    formatHoursToWeeks
  };
}
