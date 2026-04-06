/**
 * Proof-Kit Main Application
 * Handles tab navigation, initialization, and coordination between calculators
 */

// Application state
const appState = {
  currentTab: 'c1',
  data: {}
};

/**
 * Initialize the application
 */
function initApp() {
  // Load persisted data
  appState.data = loadData({
    // C1 defaults
    c1DailyCost: 500,

    // Cost of Delay defaults
    codDailyCost: 500,

    // Meeting Cost defaults
    mcHourlyCost: 62.50
  });

  // Initialize tab navigation
  initTabNavigation();

  // Initialize calculators
  initC1Calculator();
  initCostOfDelayCalculator();
  initMeetingCostCalculator();

  // Set active tab
  switchTab('c1');

  console.log('Proof-Kit initialized successfully');
}

/**
 * Initialize tab navigation
 */
function initTabNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = tab.getAttribute('data-tab');
      switchTab(tabId);
    });
  });
}

/**
 * Switch to a specific tab
 * @param {string} tabId - Tab identifier
 */
function switchTab(tabId) {
  // Update app state
  appState.currentTab = tabId;

  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  // Hide all nav tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Show active tab content
  const activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.add('active');
  }

  // Show active nav tab
  const activeTab = document.getElementById('tab-' + tabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Auto-focus first input
  setTimeout(() => {
    const firstInput = activeContent ? activeContent.querySelector('input') : null;
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type: success, error, info
 * @param {number} duration - Duration in ms
 */
function showToast(message, type = 'info', duration = 3000) {
  if (window.showCopyToast) {
    window.showCopyToast(message, type, duration);
  }
}

/**
 * Get current calculator data
 * @returns {object} Calculator data
 */
function getCurrentData() {
  const currentForm = document.querySelector(`#${appState.currentTab} form`);
  if (!currentForm) return appState.data;

  const formData = new FormData(currentForm);
  const data = {};

  formData.forEach((value, key) => {
    const numValue = parseFloat(value);
    data[key] = isNaN(numValue) ? value : numValue;
  });

  return { ...appState.data, ...data };
}

/**
 * Auto-save all data
 */
function autoSaveAllData() {
  const currentData = getCurrentData();
  if (window.autoSave) {
    window.autoSave(currentData);
  }
}

/**
 * Initialize C1 Calculator
 */
function initC1Calculator() {
  const form = document.getElementById('c1-form');
  const addBtn = document.getElementById('c1-add-obstacle');
  const copyBtn = document.getElementById('c1-copy-results');
  const resetBtn = document.getElementById('c1-reset');

  if (!form) return;

  // Load initial state
  const dailyCostInput = document.getElementById('c1-daily-cost');
  if (dailyCostInput && appState.data.c1DailyCost) {
    dailyCostInput.value = appState.data.c1DailyCost;
  }

  // Add obstacles list (empty initially)
  const obstaclesList = document.getElementById('c1-obstacles');
  const savedObstacles = appState.data.c1Obstacles;
  if (savedObstacles && Array.isArray(savedObstacles)) {
    savedObstacles.forEach(obstacle => {
      addC1ObstacleRow(obstacle);
    });
  } else {
    // Add one empty row by default
    addC1ObstacleRow();
  }

  // Add event listeners
  if (addBtn) {
    addBtn.addEventListener('click', () => addC1ObstacleRow());
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => copyC1Results());
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => resetC1Calculator());
  }

  // Auto-calculate on input
  form.addEventListener('change', updateC1Results);
  form.addEventListener('input', updateC1Results);
}

/**
 * Add a C1 obstacle row
 * @param {object} data - Pre-filled data (optional)
 */
function addC1ObstacleRow(data = {}) {
  const obstaclesList = document.getElementById('c1-obstacles');
  const index = obstaclesList.children.length;

  const row = document.createElement('div');
  row.className = 'entry-container';
  row.innerHTML = `
    <div class="entry-header">
      <span class="entry-number">${index + 1}</span>
      <button type="button" class="entry-remove-btn" onclick="this.closest('.entry-container').remove(); updateC1Results();">Remove</button>
    </div>
    <div class="entry-content">
      <div class="entry-field">
        <label>Obstacle Removed</label>
        <input type="text" class="obstacle-name" placeholder="e.g., Unblocked deployment pipeline" value="${data.name || ''}">
      </div>
      <div class="entry-field">
        <label>Time Saved</label>
        <div class="input-row">
          <input type="number" class="obstacle-time" placeholder="Amount" min="0" value="${data.time || ''}">
          <select class="obstacle-unit">
            <option value="min" ${data.unit === 'min' ? 'selected' : ''}>minutes</option>
            <option value="h" ${data.unit === 'h' ? 'selected' : ''}>hours</option>
            <option value="d" ${data.unit === 'd' ? 'selected' : ''}>days</option>
            <option value="w" ${data.unit === 'w' ? 'selected' : ''}>weeks</option>
          </select>
        </div>
      </div>
      <div class="entry-field">
        <label>People Impacted</label>
        <input type="number" class="obstacle-people" placeholder="Number" min="1" value="${data.people || 1}">
      </div>
    </div>
  `;

  row.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('change', updateC1Results);
    input.addEventListener('input', updateC1Results);
  });

  obstaclesList.appendChild(row);
}

/**
 * Update C1 Calculator results
 */
function updateC1Results() {
  const dailyCost = parseFloat(document.getElementById('c1-daily-cost').value) || 0;
  const obstacles = [];
  let totalValue = 0;
  let totalHours = 0;

  document.querySelectorAll('#c1 .entry-container').forEach(container => {
    const name = container.querySelector('.obstacle-name').value;
    const time = parseFloat(container.querySelector('.obstacle-time').value) || 0;
    const unit = container.querySelector('.obstacle-unit').value;
    const people = parseFloat(container.querySelector('.obstacle-people').value) || 1;

    if (name && time > 0) {
      const hours = convertToHours(time, unit);
      const value = (hours / 8) * dailyCost * people;
      totalValue += value;
      totalHours += hours;

      obstacles.push({
        name,
        time,
        unit,
        people,
        hours,
        value,
        hoursReadable: formatHoursToReadable(hours)
      });
    }
  });

  // Update results
  const resultsPanel = document.getElementById('c1-results');
  if (obstacles.length > 0) {
    resultsPanel.classList.remove('hidden');

    document.getElementById('c1-total-value').textContent = formatCurrency(totalValue);
    document.getElementById('c1-days-saved').textContent = formatHoursToReadable(totalHours);
    document.getElementById('c1-narrative').textContent = generateC1Narrative(totalValue, totalHours, obstacles.length);

    const breakdown = obstacles.map(obs => formatObstacleBreakdown(obs)).join('');
    document.getElementById('c1-breakdown').innerHTML = `<h4>Obstacle Breakdown:</h4>${breakdown}`;
  } else {
    resultsPanel.classList.add('hidden');
  }

  // Save state
  autoSaveAllData();
}

/**
 * Copy C1 results
 */
function copyC1Results() {
  const narrative = document.getElementById('c1-narrative').textContent;
  const value = document.getElementById('c1-total-value').textContent;
  const time = document.getElementById('c1-days-saved').textContent;
  const text = `C1 Calculator Results\n${value} in value created\n${time} of focus time unfrozen\n\n${narrative}`;

  if (window.copyToClipboard) {
    window.copyToClipboard(text, {
      onSuccess: () => showToast('Results copied to clipboard!', 'success')
    });
  }
}

/**
 * Reset C1 calculator
 */
function resetC1Calculator() {
  if (confirm('Clear all C1 data?')) {
    document.getElementById('c1-form').reset();
    document.getElementById('c1-obstacles').innerHTML = '';
    document.getElementById('c1-results').classList.add('hidden');
    addC1ObstacleRow();
    autoSaveAllData();
  }
}

/**
 * Initialize Cost of Delay Calculator
 */
function initCostOfDelayCalculator() {
  const form = document.getElementById('cost-of-delay-form');
  const addBtn = document.getElementById('cod-add-item');
  const copyBtn = document.getElementById('cod-copy-results');
  const resetBtn = document.getElementById('cod-reset');

  if (!form) return;

  // Load initial state
  const dailyCostInput = document.getElementById('cod-daily-cost');
  if (dailyCostInput && appState.data.codDailyCost) {
    dailyCostInput.value = appState.data.codDailyCost;
  }

  // Add items list
  const itemsList = document.getElementById('cod-items');
  const savedItems = appState.data.codItems;
  if (savedItems && Array.isArray(savedItems)) {
    savedItems.forEach(item => {
      addCostOfDelayRow(item);
    });
  } else {
    addCostOfDelayRow();
  }

  // Add event listeners
  if (addBtn) {
    addBtn.addEventListener('click', () => addCostOfDelayRow());
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => copyCostOfDelayResults());
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => resetCostOfDelayCalculator());
  }

  // Auto-calculate
  form.addEventListener('change', updateCostOfDelayResults);
  form.addEventListener('input', updateCostOfDelayResults);
}

/**
 * Add a Cost of Delay item row
 */
function addCostOfDelayRow(data = {}) {
  const itemsList = document.getElementById('cod-items');
  const index = itemsList.children.length;

  const row = document.createElement('div');
  row.className = 'entry-container';
  row.innerHTML = `
    <div class="entry-header">
      <span class="entry-number">${index + 1}</span>
      <button type="button" class="entry-remove-btn" onclick="this.closest('.entry-container').remove(); updateCostOfDelayResults();">Remove</button>
    </div>
    <div class="entry-content">
      <div class="entry-field">
        <label>Item</label>
        <input type="text" class="cod-item-name" placeholder="e.g., Feature X release" value="${data.name || ''}">
      </div>
      <div class="entry-field">
        <label>Days Delayed</label>
        <input type="number" class="cod-days" placeholder="Number" min="0" value="${data.days || ''}">
      </div>
      <div class="entry-field">
        <label>Team Size Blocked</label>
        <input type="number" class="cod-team-size" placeholder="Number" min="1" value="${data.teamSize || 1}">
      </div>
      <div class="entry-field">
        <label>Business Criticality</label>
        <select class="cod-criticality">
          <option value="0.5" ${data.criticality === '0.5' ? 'selected' : ''}>Low (0.5x)</option>
          <option value="1" ${data.criticality === '1' ? 'selected' : ''}>Medium (1x)</option>
          <option value="2" ${data.criticality === '2' ? 'selected' : ''}>High (2x)</option>
        </select>
      </div>
    </div>
  `;

  row.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('change', updateCostOfDelayResults);
    input.addEventListener('input', updateCostOfDelayResults);
  });

  itemsList.appendChild(row);
}

/**
 * Update Cost of Delay results
 */
function updateCostOfDelayResults() {
  const dailyCost = parseFloat(document.getElementById('cod-daily-cost').value) || 0;
  const items = [];
  let totalImpact = 0;
  let totalDays = 0;
  let totalPeople = 0;

  document.querySelectorAll('#cost-of-delay .entry-container').forEach(container => {
    const name = container.querySelector('.cod-item-name').value;
    const days = parseFloat(container.querySelector('.cod-days').value) || 0;
    const teamSize = parseFloat(container.querySelector('.cod-team-size').value) || 1;
    const criticality = parseFloat(container.querySelector('.cod-criticality').value) || 1;

    if (name && days > 0) {
      const value = days * teamSize * dailyCost * criticality;
      totalImpact += value;
      totalDays += days;
      totalPeople += teamSize;

      items.push({
        name,
        days,
        teamSize,
        criticality,
        value
      });
    }
  });

  // Update results
  const resultsPanel = document.getElementById('cod-results');
  if (items.length > 0) {
    resultsPanel.classList.remove('hidden');

    document.getElementById('cod-total-impact').textContent = formatCurrency(totalImpact);
    document.getElementById('cod-days-prevented').textContent = totalDays + ' days';
    document.getElementById('cod-narrative').textContent = generateCostOfDelayNarrative(totalImpact, totalDays, items.length, totalPeople);

    const breakdown = items.map(item => formatCostOfDelayBreakdown(item)).join('');
    document.getElementById('cod-breakdown').innerHTML = `<h4>Item Breakdown:</h4>${breakdown}`;
  } else {
    resultsPanel.classList.add('hidden');
  }

  autoSaveAllData();
}

/**
 * Copy Cost of Delay results
 */
function copyCostOfDelayResults() {
  const narrative = document.getElementById('cod-narrative').textContent;
  const impact = document.getElementById('cod-total-impact').textContent;
  const days = document.getElementById('cod-days-prevented').textContent;
  const text = `Cost of Delay Results\n${impact} productivity loss prevented\n${days} of delay prevented\n\n${narrative}`;

  if (window.copyToClipboard) {
    window.copyToClipboard(text, {
      onSuccess: () => showToast('Results copied to clipboard!', 'success')
    });
  }
}

/**
 * Reset Cost of Delay calculator
 */
function resetCostOfDelayCalculator() {
  if (confirm('Clear all Cost of Delay data?')) {
    document.getElementById('cost-of-delay-form').reset();
    document.getElementById('cod-items').innerHTML = '';
    document.getElementById('cod-results').classList.add('hidden');
    addCostOfDelayRow();
    autoSaveAllData();
  }
}

/**
 * Initialize Meeting Cost Calculator
 */
function initMeetingCostCalculator() {
  const form = document.getElementById('meeting-cost-form');
  const addBtn = document.getElementById('mc-add-meeting');
  const copyBtn = document.getElementById('mc-copy-results');
  const resetBtn = document.getElementById('mc-reset');

  if (!form) return;

  // Load initial state
  const hourlyCostInput = document.getElementById('mc-hourly-cost');
  if (hourlyCostInput && appState.data.mcHourlyCost) {
    hourlyCostInput.value = appState.data.mcHourlyCost;
  }

  // Add meetings list
  const meetingsList = document.getElementById('mc-meetings');
  const savedMeetings = appState.data.mcMeetings;
  if (savedMeetings && Array.isArray(savedMeetings)) {
    savedMeetings.forEach(meeting => {
      addMeetingRow(meeting);
    });
  } else {
    addMeetingRow();
  }

  // Add event listeners
  if (addBtn) {
    addBtn.addEventListener('click', () => addMeetingRow());
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => copyMeetingCostResults());
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => resetMeetingCostCalculator());
  }

  // Auto-calculate
  form.addEventListener('change', updateMeetingCostResults);
  form.addEventListener('input', updateMeetingCostResults);
}

/**
 * Add a Meeting Cost row
 */
function addMeetingRow(data = {}) {
  const meetingsList = document.getElementById('mc-meetings');
  const index = meetingsList.children.length;

  const row = document.createElement('div');
  row.className = 'entry-container';
  row.innerHTML = `
    <div class="entry-header">
      <span class="entry-number">${index + 1}</span>
      <button type="button" class="entry-remove-btn" onclick="this.closest('.entry-container').remove(); updateMeetingCostResults();">Remove</button>
    </div>
    <div class="entry-content">
      <div class="entry-field">
        <label>Meeting Name</label>
        <input type="text" class="mc-meeting-name" placeholder="e.g., Daily standup" value="${data.name || ''}">
      </div>
      <div class="entry-field">
        <label>Frequency</label>
        <select class="mc-frequency">
          <option value="5" ${data.frequency === '5' ? 'selected' : ''}>Daily (5 days/week)</option>
          <option value="1" ${data.frequency === '1' ? 'selected' : ''}>Weekly</option>
          <option value="0.5" ${data.frequency === '0.5' ? 'selected' : ''}>Bi-weekly</option>
          <option value="0.25" ${data.frequency === '0.25' ? 'selected' : ''}>Monthly</option>
        </select>
      </div>
      <div class="entry-field">
        <label>Duration (minutes)</label>
        <input type="number" class="mc-duration" placeholder="e.g., 60" min="0" value="${data.duration || ''}">
      </div>
      <div class="entry-field">
        <label>Attendees</label>
        <input type="number" class="mc-attendees" placeholder="Number" min="1" value="${data.attendees || 1}">
      </div>
      <div class="entry-field">
        <label>Improvement</label>
        <select class="mc-improvement">
          <option value="0.25" ${data.improvement === '0.25' ? 'selected' : ''}>Optimized by 25%</option>
          <option value="0.5" ${data.improvement === '0.5' ? 'selected' : ''}>Optimized by 50%</option>
          <option value="1" ${data.improvement === '1' ? 'selected' : ''}>Eliminated</option>
        </select>
      </div>
    </div>
  `;

  row.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('change', updateMeetingCostResults);
    input.addEventListener('input', updateMeetingCostResults);
  });

  meetingsList.appendChild(row);
}

/**
 * Update Meeting Cost results
 */
function updateMeetingCostResults() {
  const hourlyCost = parseFloat(document.getElementById('mc-hourly-cost').value) || 0;
  const meetings = [];
  let totalSavings = 0;
  let totalHoursRecovered = 0;

  document.querySelectorAll('#meeting-cost .entry-container').forEach(container => {
    const name = container.querySelector('.mc-meeting-name').value;
    const frequency = parseFloat(container.querySelector('.mc-frequency').value) || 1;
    const duration = parseFloat(container.querySelector('.mc-duration').value) || 0;
    const attendees = parseFloat(container.querySelector('.mc-attendees').value) || 1;
    const improvement = parseFloat(container.querySelector('.mc-improvement').value) || 1;

    if (name && duration > 0) {
      const durationHours = duration / 60;
      const annualFrequency = frequency * 52; // Convert to annual
      const annualCost = hourlyCost * durationHours * attendees * annualFrequency;
      const savings = annualCost * improvement;
      const hoursRecovered = duration * attendees * annualFrequency * improvement / 60;

      totalSavings += savings;
      totalHoursRecovered += hoursRecovered;

      meetings.push({
        name,
        frequency,
        duration,
        attendees,
        improvement,
        value: savings,
        hoursRecovered
      });
    }
  });

  // Update results
  const resultsPanel = document.getElementById('mc-results');
  if (meetings.length > 0) {
    resultsPanel.classList.remove('hidden');

    document.getElementById('mc-annual-savings').textContent = formatCurrency(totalSavings);
    document.getElementById('mc-focus-time').textContent = formatHoursToWeeks(totalHoursRecovered);
    document.getElementById('mc-narrative').textContent = generateMeetingCostNarrative(totalSavings, totalHoursRecovered, meetings.length);

    const breakdown = meetings.map(m => formatMeetingBreakdown(m)).join('');
    document.getElementById('mc-breakdown').innerHTML = `<h4>Meeting Breakdown:</h4>${breakdown}`;
  } else {
    resultsPanel.classList.add('hidden');
  }

  autoSaveAllData();
}

/**
 * Copy Meeting Cost results
 */
function copyMeetingCostResults() {
  const narrative = document.getElementById('mc-narrative').textContent;
  const savings = document.getElementById('mc-annual-savings').textContent;
  const time = document.getElementById('mc-focus-time').textContent;
  const text = `Meeting Cost Results\n${savings} annual savings\n${time} of focus time recovered\n\n${narrative}`;

  if (window.copyToClipboard) {
    window.copyToClipboard(text, {
      onSuccess: () => showToast('Results copied to clipboard!', 'success')
    });
  }
}

/**
 * Reset Meeting Cost calculator
 */
function resetMeetingCostCalculator() {
  if (confirm('Clear all Meeting Cost data?')) {
    document.getElementById('meeting-cost-form').reset();
    document.getElementById('mc-meetings').innerHTML = '';
    document.getElementById('mc-results').classList.add('hidden');
    addMeetingRow();
    autoSaveAllData();
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
