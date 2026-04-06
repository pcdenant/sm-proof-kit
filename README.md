# Proof-Kit Phase 1: Proof-Kit Calculators

A suite of three interactive calculators to help mid-career Scrum Masters quantify their business impact and prove their value through concrete financial metrics.

## Overview

The Proof-Kit is part of a 4-week survival program designed for Scrum Masters facing job insecurity post-tech layoffs. Phase 1 (MEASURE) provides three calculators that transform intangible SM contributions into measurable business value:

1. **C1 Calculator** - Cost of Obstacles Removed
   - Quantifies value from removing blockers
   - Shows unfrozen team capacity in $ and days
   - Narrative: "I removed X obstacles worth $Y in team capacity (Z days of focused work)"

2. **Cost of Delay Calculator** - Team Cost Approach
   - Simplified calculation (no revenue impact guessing)
   - Shows productivity loss prevented
   - Narrative: "Unblocking prevented $Y in productivity loss across X team members over Z days"

3. **Meeting Cost Calculator** - Cost + Time
   - Dual outputs: $ savings AND focus time recovered
   - Shows annual impact
   - Narrative: "Optimizing meetings saves $X annually and recovers Y weeks of focus time"

## Features

- 🎨 **Dark Theme UI** - Professional, easy-on-eyes design
- ⏱️ **Flexible Unit Conversion** - Minutes ↔ Hours ↔ Days ↔ Weeks ↔ Months
- 💾 **Data Persistence** - localStorage keeps your data between sessions
- 🔗 **Shareable URLs** - Copy results and share via link
- 📋 **Narrative Generation** - Business-friendly explanations of your impact
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Real-time Calculation** - Results update as you type

## Getting Started

### Installation

No build step required! Just open `index.html` in a modern web browser:

```bash
# Navigate to the directory
cd proof-kit

# Open in browser (on macOS)
open index.html

# Or drag index.html into your browser window
```

### Usage

#### C1 Calculator (Cost of Obstacles Removed)

1. Enter daily cost of team member(s) in $ (default: $500)
2. Add obstacles you removed:
   - Describe the obstacle (e.g., "Unblocked deployment pipeline")
   - Select time saved and unit (minutes, hours, days, weeks)
   - Number of people impacted
3. Results show:
   - Total $ value created
   - Days of focus time unfrozen
   - Breakdown by obstacle
   - Business narrative

#### Cost of Delay Calculator

1. Enter daily cost per team member in $ (default: $500)
2. Add items that were blocked:
   - Item name
   - Days delayed
   - Team size blocked
   - Business criticality (Low/Medium/High)
3. Results show:
   - Total $ productivity loss prevented
   - Days of delay
   - Breakdown by item
   - Business narrative

#### Meeting Cost Calculator

1. Enter hourly cost per employee in $ (default: $62.50)
2. Add meetings optimized or eliminated:
   - Meeting name
   - Frequency (Daily/Weekly/Bi-weekly/Monthly)
   - Duration in minutes
   - Attendees
   - Improvement type (25% optimization, 50% optimization, eliminated)
3. Results show:
   - Annual $ savings
   - Focus time recovered (in weeks/days)
   - Breakdown by meeting
   - Business narrative

### Sharing Results

After calculating results:
1. Click "Copy Results" to copy the narrative and key metrics
2. Or manually copy the shareable URL from address bar (includes all your data)
3. Share the URL with managers, peers, or include in presentations

## Technical Details

### Architecture

- **Vanilla JavaScript** - No frameworks, no build step
- **CSS Custom Properties** - Themeable dark color palette
- **localStorage** - Client-side persistence
- **URL Parameters** - Shareable state encoding

### Project Structure

```
proof-kit/
├── index.html              # Main HTML entry point
├── css/
│   ├── styles.css         # Global styles & dark theme
│   └── components.css     # Component-specific styles
├── js/
│   ├── app.js            # Main application controller
│   ├── utils/
│   │   ├── units.js      # Unit conversion system
│   │   ├── formatting.js # Currency, time, narrative formatting
│   │   ├── persistence.js # localStorage + URL handling
│   │   └── clipboard.js  # Copy-to-clipboard utilities
│   └── modules/          # (Placeholder for future expansion)
└── README.md
```

### Key Formulas

**C1 Calculator:**
```
Cost per Obstacle = (Time Saved in hours / 8) × Daily Cost × Number of People
Total Value = Sum of all obstacles
```

**Cost of Delay Calculator:**
```
Cost per Item = Days Delayed × Team Size × Daily Cost × Criticality Multiplier
Total Impact = Sum of all items
```

**Meeting Cost Calculator:**
```
Annual Cost = Hourly Cost × Duration (hours) × Attendees × Annual Frequency
Savings = Annual Cost × Improvement %
Focus Time Recovered = Duration (minutes) × Attendees × Annual Frequency × Improvement % / 60
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Requires modern browser with:
- ES6+ JavaScript support
- CSS Grid/Flexbox
- Clipboard API (with fallback)
- localStorage support

## Data Privacy

All calculations happen in your browser. No data is sent to servers:
- Data only stored in browser's localStorage
- Sharing via URL encodes data in query parameters
- No backend, no analytics, no tracking

## Limitations

### Phase 1 (MVP)

- Single user (no authentication)
- No backend sync
- No PDF export (use browser print instead)
- English language only

### Future Enhancements (Phase 2+)

- Bottleneck Radar (Slack/Jira integration)
- Multi-user accounts
- Email coaching feedback
- PDF export
- Analytics dashboard
- Payment/subscription integration

## Performance

- File size: ~100KB total (minified: ~30KB)
- Load time: <1s on 4G
- Calculations: Instant real-time updates
- No external API calls required

## Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Color contrast meets WCAG AA standards
- Keyboard navigation support
- Form validation with clear error messages
- Focus management for keyboard users

## Testing

### Manual Test Scenarios

#### C1 Calculator Test
- Input: 5 obstacles, $500/day, mix of times (2h, 1d, 3 days)
- Expected: ~$1,500-2,000 value, 4-5 days unfrozen

#### Cost of Delay Test
- Input: 3 items, 2-5 days delayed each, 2-3 people, mixed criticality
- Expected: Clear impact calculation without guessing revenue

#### Meeting Cost Test
- Input: 3 meetings (daily standup 15min 5 people, weekly planning 2h 8 people, monthly retro 4h 6 people)
- Expected: $1,000-2,000 annual savings, 2-4 weeks focus time

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome mobile)

## Code Quality

- ES6 JavaScript
- Clear, descriptive function names
- Comments explaining complex logic
- DRY principles (reuse patterns)
- No external dependencies required

## License

Part of sm-proof-kit project

## Contributing

This is a reference implementation for the Proof-Kit Phase 1 specification. Modifications welcome for your specific use case.

## Support

For questions about using the Proof-Kit:
1. Check the SPEC-4week-survival-program.md for program context
2. Review the PLAN.md for development roadmap
3. Check browser console for error messages

---

**Version:** 1.0 (MVP)  
**Last Updated:** 2026-04-06  
**Status:** Production Ready (Phase 1)
