# Extracted Code Repository Index

This directory contains extracted code and comprehensive documentation from two GitHub repositories, prepared for integration into the proof-kit project.

## Quick Start

1. **New to this extraction?** Start here:
   - Read: `CODE_EXTRACTION_SUMMARY.md` (5-10 min overview)
   - Then: Choose a task below

2. **Ready to implement?**
   - Follow: `IMPLEMENTATION_GUIDE.md` (step-by-step instructions)
   - Reference: Task-specific documentation as needed

3. **Need specific code?**
   - Task 1 (Units & Costs): `EXTRACTED_CODE_TASK1_IMPEDIMENT_CALCULATOR.md`
   - Task 2 (CSS, Storage, Clipboard): `EXTRACTED_CODE_TASK2_CI_CALCULATOR.md`
   - CSS only: `css_styles_complete.css`

---

## File Guide

### Main Documentation
- **`CODE_EXTRACTION_SUMMARY.md`** - Overview of what was extracted from each repo
  - Quick index of all components
  - Conversion rates and formulas
  - Dependencies and requirements
  - Integration checklist

- **`IMPLEMENTATION_GUIDE.md`** - Step-by-step implementation instructions
  - Detailed implementation steps for each task
  - Code examples and integration patterns
  - Customization guide
  - Troubleshooting guide
  - File structure after integration

### Task 1: Impediment Value Calculator
- **Source**: https://github.com/pcdenant/impediment-value-calculator
- **Documentation**: `EXTRACTED_CODE_TASK1_IMPEDIMENT_CALCULATOR.md`

**What was extracted**:
- Unit conversion system (min, hours, days, weeks, months)
- Cost calculation formulas
- Narrative generation logic
- Copy-to-clipboard implementation

**Integration target**:
- `js/utils/units.js` (already exists, can be enhanced)

**Key formulas**:
```
Blocking Cost = persons × hours × hourly_rate
Avoided Cost = persons × additional_hours × hourly_rate
```

### Task 2: Continuous Improvement Calculator
- **Source**: https://github.com/pcdenant/Continuous-Improvement-Calculator
- **Documentation**: `EXTRACTED_CODE_TASK2_CI_CALCULATOR.md`
- **CSS reference**: `css_styles_complete.css`

**What was extracted**:
- Dark theme CSS with custom variables
- localStorage persistence system
- URL parameter handling
- Copy-to-clipboard utility

**Integration targets**:
- `css/styles.css` (new file)
- `js/utils/persistence.js` (new file)
- `js/utils/clipboard.js` (new file)

**Key capabilities**:
- Auto-save form data to localStorage
- Share scenarios via URL parameters
- Copy shareable links with one click
- Modern clipboard API with fallback

---

## Key Conversions & Formulas

### Time Unit Conversions
All units convert to hours as the standard:

```
1 minute = 1/60 hour
1 hour = 1 hour
1 day = 8 hours
1 week = 40 hours (5 × 8)
1 month = 160 hours (4 × 40)
```

### Cost Calculations (Task 1)
```
Blocking Cost = Number of Persons × Duration (hours) × Hourly Rate
Avoided Cost = Number of Persons × Additional Hours × Hourly Rate
```

### Impact Calculations (Task 2)
```
Time-to-Market = -(Lead Time Change) × Daily Cost × Throughput × Months
Productivity = -(Cost per Item Change) × Throughput × Months
Efficiency = -(WIP Change) × Cost per Item × Months
Quality = -(Defects Change) × Cost per Item × Months
```

---

## CSS Theme Colors (Task 2)

Dark theme using CSS custom properties:

| Variable | Color | Use |
|----------|-------|-----|
| `--bg` | #0a0e14 | Main background |
| `--surface` | #1a1f29 | Card/panel background |
| `--border` | #2d3340 | Borders |
| `--text-primary` | #e6e8eb | Main text |
| `--text-secondary` | #8b92a0 | Secondary text |
| `--accent` | #00d4aa | Primary accent (teal) |
| `--danger` | #ff6b6b | Errors/negative values |
| `--success` | #6bcf7f | Success/positive values |

---

## Data Persistence (Task 2)

### How it works
1. User enters data
2. Auto-saved to browser localStorage
3. Page reload restores data from localStorage
4. User can share scenario via URL
5. Opening shared URL loads data from URL params (priority)

### Storage
- **Key**: `ci-calculator-data`
- **Format**: JSON object
- **Storage**: Browser localStorage (~10MB limit)

### URL Sharing
```
Example: https://example.com/calc?teamSize=7&blendRate=125&hoursPerDay=6.5
- Loads data from URL parameters
- Takes priority over localStorage
- No server/backend needed
```

---

## Integration Paths

### Path A: Complete Integration (Both Tasks)
1. Implement Task 1 unit/cost logic
2. Implement Task 2 CSS/persistence/clipboard
3. Create calculation function that uses both
4. Full featured calculator with auto-save

**Time estimate**: 2-3 hours

### Path B: Task 2 Only (UI & Persistence)
1. Implement CSS theme
2. Add localStorage persistence
3. Add clipboard utilities
4. Use existing calculation logic

**Time estimate**: 1-1.5 hours

### Path C: Task 1 Only (Calculations)
1. Review existing units.js
2. Enhance with Task 1 formulas
3. Add narrative generation
4. Keep existing UI

**Time estimate**: 30-45 minutes

---

## What's Included

```
Extracted Code Files:
├── Documentation
│   ├── README_EXTRACTED_CODE.md (this file)
│   ├── CODE_EXTRACTION_SUMMARY.md
│   ├── IMPLEMENTATION_GUIDE.md
│   ├── EXTRACTED_CODE_TASK1_IMPEDIMENT_CALCULATOR.md
│   └── EXTRACTED_CODE_TASK2_CI_CALCULATOR.md
│
└── Reference Code
    └── css_styles_complete.css (ready to copy)

Project Structure (after integration):
├── css/
│   └── styles.css (created from css_styles_complete.css)
├── js/utils/
│   ├── units.js (enhanced from Task 1)
│   ├── persistence.js (created from Task 2)
│   └── clipboard.js (created from Task 2)
```

---

## Quick Reference

### Units Conversion Function
```javascript
const units = {
  'min': { toHours: (v) => v / 60 },
  'h': { toHours: (v) => v },
  'd': { toHours: (v) => v * 8 },
  'w': { toHours: (v) => v * 40 },
  'm': { toHours: (v) => v * 160 }
};

const hours = units['d'].toHours(2);  // 16 hours
```

### Cost Calculation
```javascript
const blockedPersons = 3;
const durationHours = 20;
const hourlyRate = 65;

const blockingCost = blockedPersons * durationHours * hourlyRate;  // 3900
```

### Persistence
```javascript
// Auto-save
saveToLocalStorage();

// Load from storage
loadFromLocalStorage();

// Load from URL
loadFromURL();

// Share via URL
const shareUrl = generateShareableURL();
```

### Copy to Clipboard
```javascript
// Copy with automatic fallback
await copyToClipboard('Text to copy');

// Copy with toast notification
await copyShareableLink(url);
```

---

## Browser Support

**Minimum requirements**:
- Chrome 49+
- Firefox 31+
- Safari 9+
- Edge 15+
- IE 11+ (with CSS Grid limitations)

**Full feature support requires**:
- Clipboard API: Chrome 63+, Firefox 53+, Safari 13.1+
- CSS Grid: All modern browsers
- CSS Variables: All modern browsers except IE 11

**Fallback support**:
- Clipboard: execCommand for older browsers
- CSS Grid: Can be replaced with Flexbox

---

## Getting Help

### Troubleshooting
See "Troubleshooting Guide" in `IMPLEMENTATION_GUIDE.md` for:
- localStorage not working
- Clipboard copy failing
- URL parameters not loading
- Toast notifications missing

### Source Repositories
For original context:
- Impediment Calculator: https://github.com/pcdenant/impediment-value-calculator
- CI Calculator: https://github.com/pcdenant/Continuous-Improvement-Calculator

### Documentation
- **Mozilla Docs**: https://developer.mozilla.org/
- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **Clipboard API**: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard
- **localStorage**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

## Checklist for Successful Integration

### Setup Phase
- [ ] Read `CODE_EXTRACTION_SUMMARY.md`
- [ ] Review relevant task documentation
- [ ] Identify which tasks to implement

### Implementation Phase
- [ ] Follow `IMPLEMENTATION_GUIDE.md` step-by-step
- [ ] Create/update required files
- [ ] Update HTML structure
- [ ] Wire up event listeners

### Testing Phase
- [ ] Test unit conversions
- [ ] Test cost calculations
- [ ] Test localStorage save/load
- [ ] Test URL parameter loading
- [ ] Test clipboard copy
- [ ] Test on multiple browsers

### Deployment Phase
- [ ] Minify CSS and JS
- [ ] Test on production domain
- [ ] Verify HTTPS for Clipboard API
- [ ] Monitor browser console for errors

---

## Notes

1. **Already exists**: `js/utils/units.js` exists in the project. Review before implementing Task 1.

2. **CSS fonts required**: Task 2 uses Google Fonts. Add to HTML `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
   ```

3. **Language localization**: Task 1 code uses French. Adapt language strings as needed.

4. **Email/links in sharing**: URL parameter sharing doesn't require backend or email. Users can copy/paste the URL directly.

---

## Version Information

- **Extraction Date**: April 6, 2026
- **Task 1 Source**: impediment-value-calculator
- **Task 2 Source**: Continuous-Improvement-Calculator
- **Format**: Ready-to-copy code with documentation

---

## Next Steps

1. **Start here**: `CODE_EXTRACTION_SUMMARY.md` (5 min)
2. **Then**: `IMPLEMENTATION_GUIDE.md` (30 min)
3. **Finally**: Implement following the step-by-step guide

**Total integration time**: 1.5 - 3 hours depending on complexity

---

For questions or issues, refer to the task-specific documentation or review the original repositories.
