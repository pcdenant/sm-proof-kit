# Implementation Guide: Code Integration from Extracted Repositories

This guide provides step-by-step instructions for integrating the extracted code into the proof-kit project.

---

## Overview

**Two separate code extractions**:
1. **Task 1**: Unit conversion and cost calculation (impediment-value-calculator)
2. **Task 2**: CSS theme, persistence, and clipboard utilities (Continuous-Improvement-Calculator)

**Total extracted files**: 5 main components ready to integrate

---

## Task 1: Unit Conversion & Cost Calculations

### Source
- Repository: https://github.com/pcdenant/impediment-value-calculator
- Documentation: `EXTRACTED_CODE_TASK1_IMPEDIMENT_CALCULATOR.md`

### Current State
- `js/utils/units.js` already exists in the project
- It contains a similar but slightly different implementation

### Implementation Steps

#### Option A: Review & Decide
1. Open `/js/utils/units.js` (existing)
2. Compare with Task 1 extracted code
3. Choose which version to keep or merge
4. Key differences to check:
   - Function naming (toH vs toHours)
   - Locale handling (French vs English)
   - Unit label formatting

#### Option B: Enhance Existing
If keeping current units.js:
1. Review the calculation formulas in Task 1 doc
2. Implement cost calculation logic:
   ```javascript
   // Cost = persons × hours × hourly_rate
   function calculateBlockingCost(persons, hours, hourlyRate) {
       return Math.round(persons * hours * hourlyRate);
   }
   
   function calculateAvoidedCost(persons, additionalHours, hourlyRate) {
       return Math.round(persons * additionalHours * hourlyRate);
   }
   ```
3. Add narrative generation functions from Task 1 doc

#### Option C: Copy Complete Implementation
If wanting Task 1's version:
1. Backup current `js/utils/units.js`
2. Copy the complete implementation from Task 1 doc
3. Adapt language and locale as needed
4. Test with existing code

### Key Functions to Integrate

**Essential**:
- Unit conversion definitions (minute, hour, day, week, month)
- `convertToHours(value, unitId)` - standardize to hours
- `formatHoursToReadable(hours)` - human-readable time display
- Cost calculation: `persons × hours × rate`

**Optional but Useful**:
- Narrative generation (long/short form)
- Currency support (EUR/CAD extensible)
- Copy-to-clipboard for narratives

### Testing
```javascript
// Test unit conversion
console.assert(convertToHours(1, 'd') === 8, 'Day conversion failed');
console.assert(convertToHours(40, 'min') === (40/60), 'Minute conversion failed');

// Test formatting
console.assert(formatHoursToReadable(20) === '2 days 4 hours', 'Format failed');

// Test cost calculation
console.assert(calculateBlockingCost(3, 20, 65) === 3900, 'Cost calculation failed');
```

---

## Task 2: Dark Theme CSS, Persistence & Clipboard

### Source
- Repository: https://github.com/pcdenant/Continuous-Improvement-Calculator
- Documentation: `EXTRACTED_CODE_TASK2_CI_CALCULATOR.md`
- Complete CSS: `css_styles_complete.css`

### Implementation Steps

### Step 1: Create CSS File

```bash
touch /home/user/sm-proof-kit/css/styles.css
```

Copy complete content from `css_styles_complete.css` into new file.

**Key CSS features**:
- Custom property variables for easy theming
- Dark theme (dark background, light text, teal accent)
- Input field styling with focus states
- Summary item styling (positive/negative coloring)
- Toast notification styles
- Responsive design (mobile, tablet, desktop)
- Print styles

**Fonts required** (add to HTML `<head>`):
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
```

### Step 2: Create Persistence Module

```bash
touch /home/user/sm-proof-kit/js/utils/persistence.js
```

Copy from `EXTRACTED_CODE_TASK2_CI_CALCULATOR.md` → "File: js/utils/persistence.js" section.

**Key functions**:
- `getAllValues()` - Get form data
- `setAllValues(values)` - Set form data
- `saveToLocalStorage()` - Save data
- `loadFromLocalStorage()` - Load from storage
- `loadFromURL()` - Load from query params
- `generateShareableURL()` - Create share link
- `initializePersistence()` - Initialize on page load
- `setupAutoSave()` - Attach auto-save listeners

### Step 3: Create Clipboard Module

```bash
touch /home/user/sm-proof-kit/js/utils/clipboard.js
```

Copy from `EXTRACTED_CODE_TASK2_CI_CALCULATOR.md` → "File: js/utils/clipboard.js" section.

**Key functions**:
- `showToast(message, duration)` - Show notification
- `copyToClipboard(text)` - Modern + fallback
- `copyToClipboardFallback(text)` - Legacy support
- `copyShareableLink(url)` - Share URL with toast
- `copyWithMessage(text, success, failure)` - Generic copy
- `copyResult(label, value)` - Copy calculation
- `copyBreakdown(breakdown)` - Copy detailed calc

### Step 4: Update HTML

Add to your main HTML file:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/styles.css">
    
    <title>Your App Title</title>
</head>
<body>
    <!-- Toast container (required) -->
    <div id="toast"></div>
    
    <!-- Main container -->
    <div class="container">
        <header>
            <h1>Your Application</h1>
            <p class="subtitle">Description here</p>
        </header>
        
        <!-- Your form inputs -->
        <div class="grid">
            <div class="section">
                <h2 class="section-title">Configuration</h2>
                <div class="input-group">
                    <label for="teamSize">Team Size</label>
                    <input type="number" id="teamSize" value="7">
                </div>
                <!-- More inputs... -->
            </div>
        </div>
        
        <!-- Summary area -->
        <div class="summary">
            <h2 class="summary-title">Results</h2>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-label">Total Savings</div>
                    <div class="summary-value" id="totalSavings">-</div>
                </div>
            </div>
        </div>
        
        <!-- Action buttons -->
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button class="btn" id="saveShareLink">Share Scenario</button>
            <button class="btn btn-secondary" id="clearData">Clear Data</button>
        </div>
    </div>
    
    <!-- Scripts -->
    <script src="js/utils/persistence.js"></script>
    <script src="js/utils/clipboard.js"></script>
    <script src="js/utils/units.js"></script>
    
    <script>
        // Initialize on page load
        window.addEventListener('DOMContentLoaded', () => {
            // Load saved data or URL params
            initializePersistence();
            setupAutoSave();
            
            // Setup button listeners
            document.getElementById('saveShareLink').addEventListener('click', () => {
                const url = generateShareableURL();
                copyShareableLink(url);
            });
            
            document.getElementById('clearData').addEventListener('click', clearSavedData);
            
            // Initial calculation
            if (typeof calculate === 'function') {
                calculate();
            }
        });
        
        // Your calculation function
        function calculate() {
            // Your logic here
            // Uses persistence module to auto-save
            saveToLocalStorage();
        }
    </script>
</body>
</html>
```

### Step 5: Wire Up Calculations

In your main calculation script:

```javascript
// Listen to all inputs for changes
document.addEventListener('input', (e) => {
    if (e.target.matches('input[type="number"], input[type="date"]')) {
        saveToLocalStorage();  // Auto-save
        calculate();           // Recalculate
    }
});

// Example calculation function
function calculate() {
    const teamSize = parseInt(document.getElementById('teamSize').value);
    const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value);
    const blendRate = parseFloat(document.getElementById('blendRate').value);
    
    // Use your formulas
    const dailyCost = blendRate * hoursPerDay * teamSize;
    
    // Update UI
    document.getElementById('totalSavings').textContent = '$' + Math.round(dailyCost).toLocaleString();
    updateSummaryStyles();
    
    // Auto-save
    saveToLocalStorage();
}

// Update positive/negative styling
function updateSummaryStyles() {
    const value = parseInt(document.getElementById('totalSavings').textContent);
    const item = document.querySelector('.summary-item');
    
    if (value > 0) {
        item.classList.add('positive');
        item.classList.remove('negative');
    } else if (value < 0) {
        item.classList.add('negative');
        item.classList.remove('positive');
    }
}
```

---

## Integration Checklist

### Task 1: Unit System
- [ ] Review existing `js/utils/units.js`
- [ ] Compare with Task 1 extracted implementation
- [ ] Decide: keep, merge, or replace
- [ ] Test unit conversions
- [ ] Implement cost calculation formulas
- [ ] Test cost calculations

### Task 2: UI & Persistence
- [ ] Create `css/styles.css` from `css_styles_complete.css`
- [ ] Create `js/utils/persistence.js`
- [ ] Create `js/utils/clipboard.js`
- [ ] Add Google Fonts link to HTML
- [ ] Add `<div id="toast"></div>` to HTML
- [ ] Update HTML with proper structure
- [ ] Import all scripts in correct order
- [ ] Test CSS theme loads
- [ ] Test form input IDs match persistence code
- [ ] Test localStorage auto-save
- [ ] Test URL parameter loading
- [ ] Test copy-to-clipboard

### Testing
- [ ] Test unit conversions with various inputs
- [ ] Test cost calculations with different values
- [ ] Test localStorage persistence (disable/enable)
- [ ] Test URL sharing (copy link, open in new window)
- [ ] Test clipboard copy (multiple times)
- [ ] Test toast notifications appear and disappear
- [ ] Test responsive design (mobile/tablet/desktop)
- [ ] Test clear data function
- [ ] Browser compatibility: Chrome, Firefox, Safari, Edge

---

## Data Flow

```
User Input
    ↓
    ├→ saveToLocalStorage() (auto-save)
    ├→ calculate()
    └→ Update UI with results
         ↓
    User clicks "Share"
         ↓
    generateShareableURL()
         ↓
    copyShareableLink()
         ↓
    Show toast notification
         ↓
    User shares URL with others
         ↓
    Other user opens URL
         ↓
    loadFromURL() (priority over localStorage)
         ↓
    Scenario replicated
```

---

## Customization Guide

### Change Theme Colors

Edit `css/styles.css` `:root` variables:

```css
:root {
    --bg: #0a0e14;              /* Main background */
    --surface: #1a1f29;         /* Card background */
    --border: #2d3340;          /* Borders */
    --text-primary: #e6e8eb;    /* Main text */
    --text-secondary: #8b92a0;  /* Secondary text */
    --accent: #00d4aa;          /* Primary accent */
    --accent-dim: #00aa88;      /* Dimmed accent */
    --danger: #ff6b6b;          /* Errors */
    --warning: #ffd93d;         /* Warnings */
    --success: #6bcf7f;         /* Success */
}
```

### Change Storage Key

In `js/utils/persistence.js`:

```javascript
// Change this line:
localStorage.setItem('ci-calculator-data', JSON.stringify(values));

// To:
localStorage.setItem('your-app-data', JSON.stringify(values));
```

### Change Default Values

In `js/utils/persistence.js`, update `clearSavedData()`:

```javascript
function clearSavedData() {
    if (confirm('Clear all data?')) {
        localStorage.removeItem('your-app-data');
        
        // Update these to your defaults
        document.getElementById('teamSize').value = 10;
        document.getElementById('blendRate').value = 150;
        
        // etc...
    }
}
```

### Change Toast Position

Edit in `css/styles.css`:

```css
#toast {
    bottom: 2rem;  /* Change to top: 2rem; for top position */
    right: 2rem;   /* Change to left: 2rem; for left position */
}
```

### Add Custom Input Types

For new input types, add to persistence functions:

```javascript
function getAllValues() {
    return {
        // ... existing fields
        newField: document.getElementById('newField').value,
    };
}

function setAllValues(values) {
    // ... existing code
    if (values.newField) {
        document.getElementById('newField').value = values.newField;
    }
}
```

---

## Troubleshooting

### localStorage Not Working
**Symptom**: Data not saved between page reloads

**Checks**:
1. Not in private/incognito mode?
2. localStorage quota exceeded? (check console)
3. Cookies/storage disabled in browser?
4. Different domain/port breaks localStorage?

**Solution**:
```javascript
// Test localStorage
try {
    localStorage.setItem('test', 'value');
    localStorage.removeItem('test');
    console.log('localStorage works');
} catch(e) {
    console.error('localStorage error:', e);
}
```

### Copy Button Not Working
**Symptom**: Clipboard copy fails silently

**Checks**:
1. HTTPS required for Clipboard API (except localhost)
2. User hasn't granted permission?
3. Browser doesn't support Clipboard API?

**Solution**:
```javascript
// Test Clipboard API
if (navigator.clipboard) {
    console.log('Clipboard API available');
} else {
    console.log('Using fallback method');
}
```

### URL Parameters Not Loading
**Symptom**: Shared URL doesn't reload data

**Checks**:
1. Field IDs match parameter names?
2. URL properly encoded?
3. URLSearchParams supported?

**Solution**:
```javascript
// Debug URL loading
console.log('Current URL:', window.location.href);
const params = new URLSearchParams(window.location.search);
console.log('Parameters:', Object.fromEntries(params));
```

### Toast Not Showing
**Symptom**: Notifications don't appear

**Checks**:
1. Toast element exists in HTML?
2. CSS loaded?
3. showToast() being called?

**Solution**:
```html
<!-- Ensure this exists -->
<div id="toast"></div>

<script>
// Test toast
console.log('Toast element:', document.getElementById('toast'));
showToast('Test notification');
</script>
```

### Persistence Not Auto-saving
**Symptom**: Data not saved automatically on input change

**Checks**:
1. setupAutoSave() called?
2. Input event listeners attached?
3. Element IDs correct?

**Solution**:
```javascript
// Call on page load
window.addEventListener('DOMContentLoaded', () => {
    setupAutoSave();
    console.log('Auto-save enabled');
});
```

---

## Performance Optimization

### Debounce Auto-save
If saving too frequently causes lag:

```javascript
let saveTimeout;

function setupAutoSave() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(saveToLocalStorage, 500);
        });
    });
}
```

### Lazy Load Non-Essential Scripts
```html
<!-- Load persistence early -->
<script src="js/utils/persistence.js"></script>

<!-- Defer non-critical scripts -->
<script defer src="js/utils/analytics.js"></script>
```

### Minimize CSS
Use minified version in production:
```html
<link rel="stylesheet" href="css/styles.min.css">
```

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge | IE11 |
|---------|--------|---------|--------|------|------|
| CSS Grid | ✓ | ✓ | ✓ | ✓ | ✗ |
| CSS Variables | ✓ 49+ | ✓ 31+ | ✓ 9.1+ | ✓ 15+ | ✗ |
| localStorage | ✓ | ✓ | ✓ | ✓ | ✓ |
| Clipboard API | ✓ 63+ | ✓ 53+ | ✓ 13.1+ | ✓ 79+ | ✗ |
| execCommand | ✓ | ✓ | ✓ | ✓ | ✓ |
| URLSearchParams | ✓ | ✓ | ✓ | ✓ | ✗ |

**Fallback Strategy**: If IE11 support needed, replace CSS Grid with Flexbox and use execCommand for clipboard.

---

## File Structure After Integration

```
sm-proof-kit/
├── index.html
├── css/
│   └── styles.css                    # NEW from Task 2
├── js/
│   └── utils/
│       ├── units.js                  # Task 1 (existing, possibly updated)
│       ├── persistence.js            # NEW from Task 2
│       └── clipboard.js              # NEW from Task 2
├── EXTRACTED_CODE_TASK1_*.md         # Documentation
├── EXTRACTED_CODE_TASK2_*.md         # Documentation
├── CODE_EXTRACTION_SUMMARY.md        # This summary
├── IMPLEMENTATION_GUIDE.md           # This guide
└── css_styles_complete.css           # Reference copy
```

---

## Next Steps

1. **Immediate** (15-30 min):
   - Copy CSS file
   - Create persistence and clipboard modules
   - Update HTML with required elements

2. **Short-term** (30-60 min):
   - Wire up form inputs
   - Test localStorage and URL params
   - Test clipboard functionality

3. **Medium-term** (1-2 hours):
   - Implement Task 1 unit/cost logic
   - Create calculation functions
   - Test all formulas

4. **Optional** (as needed):
   - Customize colors/theme
   - Add more input fields
   - Implement additional calculations
   - Add export/print functionality

---

## Support Resources

- **CSS Variables Guide**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **Clipboard API**: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
- **localStorage**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **URLSearchParams**: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

---

**Integration Complete When**:
- All CSS styles load correctly
- Form inputs auto-save on change
- Data persists across page reloads
- URL sharing works (can replicate scenario)
- Clipboard copy works on all buttons
- Cost calculations match formulas
- Unit conversions work correctly
- All browsers pass testing

---

**Last Updated**: April 6, 2026  
**Source Repositories**:
- https://github.com/pcdenant/impediment-value-calculator
- https://github.com/pcdenant/Continuous-Improvement-Calculator
