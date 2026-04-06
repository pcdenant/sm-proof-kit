# Plan: Proof-Kit Phase 1 Calculators

## Context

The sm-proof-kit is a 4-week survival program for mid-career Scrum Masters to prove their professional value post-layoffs. Phase 1 (MEASURE) requires three interactive calculators that quantify business impact in concrete financial terms. Currently, the specification exists but no technical implementation has begun. This plan covers building three core calculators as a vanilla JavaScript web application to help SMs calculate:

1. **C1 Calculator**: Cost of obstacles removed (quantifies blocker removal value)
2. **Cost of Delay Calculator**: Business impact of unblocked work items
3. **Meeting Cost Calculator**: Savings from optimized/eliminated meetings

## Scope

### What's In Scope
- Build three interactive calculators (C1, Cost of Delay, Meeting Cost) in vanilla JavaScript
- Leverage existing code from impediment-value-calculator and Continuous Improvement Calculator
- Professional UI with dark theme (proven design pattern)
- Dynamic unit conversion system (minutes → hours → days → weeks → months)
- Data persistence via URL params + localStorage (proven pattern from existing tools)
- Copy-to-clipboard functionality for sharing results
- Narrative generation explaining the financial impact in human terms
- Tangible outputs: costs in $ + time saved in hours/days

### What's Out of Scope
- Backend API or database (client-side only)
- Payment/Stripe integration
- Slack integration or automation
- Email sequences or Bottleneck Radar
- Video walkthroughs or coaching content
- Multi-language support (English only for MVP)
- Authentication/user accounts
- PDF export (focus on copy-to-clipboard + URL sharing)

## Architecture

### Tech Stack
- **Language**: Vanilla JavaScript (no build step required, proven reliable)
- **Styling**: CSS (dark theme with custom variables, proven pattern)
- **Data Persistence**: localStorage + URL params (sharing-friendly)
- **Build**: Single HTML file or minimal bundling
- **Patterns**: Reuse from existing calculators (unit conversion, state management, persistence)

### Project Structure
```
proof-kit/
├── index.html                     # Single entry point (or combined HTML)
├── css/
│   ├── styles.css                 # Global theme + custom variables
│   └── components.css             # Component-specific styles
├── js/
│   ├── app.js                     # Main application controller
│   ├── calculators.js             # C1, Cost of Delay, Meeting Cost logic
│   ├── utils/
│   │   ├── units.js              # Unit conversion system (reuse from impediment-calculator)
│   │   ├── formatting.js         # Currency, time, narrative formatting
│   │   ├── persistence.js        # localStorage + URL param handling
│   │   └── clipboard.js          # Copy-to-clipboard utility
│   └── modules/
│       ├── c1.js                 # C1 calculator module
│       ├── costOfDelay.js        # Cost of Delay calculator module
│       └── meetingCost.js        # Meeting Cost calculator module
└── README.md                      # Documentation

Reusable Code Sources:
- impediment-value-calculator (cost-of-obstacles logic, unit system, narrative generation)
- Continuous Improvement Calculator (persistence, URL sharing, dark theme)
```

## Calculator Specifications

### C1 Calculator: Cost of Obstacles Removed
**Base**: Reuse impediment-value-calculator logic and UI patterns

**Input Fields:**
- List of obstacles removed (text, unlimited entries with "add more" button)
- Time saved per obstacle (with unit conversion: minutes ↔ hours ↔ days ↔ weeks)
- Daily cost of engineer/team ($, default USD)
- Number of people impacted (optional, default 1)

**Formula:**
- Time Saved (normalized to hours) = [minutes/60] or [days × 8] or [weeks × 40], etc.
- Cost per Obstacle = (Time Saved in hours / 8) × Daily Cost × Number of People
- Total C1 Value = Sum of all obstacles

**Output:**
- **Total monetary value** ($X.XXK format for readability)
- **Total time saved** (human-readable: "5 days 4 hours")
- **List of obstacles** with individual values and impact
- **Generated narrative**: "I removed X critical obstacles, unfreezing $Y in team capacity (Z days of focused work)"

---

### Cost of Delay Calculator
**Design Principle**: Simplified "Team Cost Approach" - no revenue impact estimation needed

**Input Fields:**
- List of delayed items now unblocked (text, unlimited entries)
- Days the item was delayed (number)
- Team size blocked by this item (number, default 1)
- Daily cost per team member ($, default USD)
- Business criticality (dropdown: Low/Medium/High, multiplier 0.5x/1x/2x)

**Formula:**
- Cost per Item = Days Delayed × Team Size × Daily Cost × Criticality Multiplier
- Total Cost of Delay = Sum of all items

**Output:**
- **Total business impact** ($X.XXK format)
- **Days of delay prevented** (aggregated)
- **List of items** with individual impact
- **Generated narrative**: "Unblocking these items prevented $Y in productivity loss across X team members over Z days"

---

### Meeting Cost Calculator
**Design Principle**: Show both financial and time impact (tangible metrics)

**Input Fields:**
- List of meetings optimized/eliminated (text, unlimited entries)
- Meeting frequency (dropdown: Daily/Weekly/Bi-weekly/Monthly - with times/year calculated)
- Number of attendees (number)
- Average hourly cost per attendee ($, default USD)
- Duration (minutes)
- Improvement type (dropdown: Optimized - 25% time, Optimized - 50% time, Eliminated)

**Formula:**
- Annual Cost = Hourly Cost × Duration (hours) × Attendees × Annual Frequency
- Time Saved (annual) = Duration (minutes) × Attendees × Annual Frequency × Improvement %
- Savings = Annual Cost × Improvement %

**Output:**
- **Total annual savings** ($X,XXX format)
- **Total focus time recovered** (human-readable: "120 hours/year = 3 weeks of focus time")
- **List of meetings** with cost + time breakdown
- **Generated narrative**: "Optimizing these meetings saves $X annually and recovers Y weeks of focus time for deep work"

## Code Reuse Strategy

This project leverages two existing production-grade calculators to avoid reinventing the wheel:

### From impediment-value-calculator (https://github.com/pcdenant/impediment-value-calculator)
- **Unit Conversion System**: The elegant dynamic slider system (minutes ↔ hours ↔ days ↔ weeks ↔ months)
- **Calculation Logic**: Core formula structure for cost calculations
- **Narrative Generation**: Pattern for creating human-readable output from data
- **Bento Layout**: Professional card-based UI design
- **Accessibility**: Semantic HTML patterns, keyboard navigation

### From Continuous Improvement Impact Calculator (https://github.com/pcdenant/Continuous-Improvement-Calculator)
- **Data Persistence**: localStorage + URL params for sharing (proven, production-ready)
- **Dark Theme**: CSS custom variables system (easily themeable)
- **Real-time Feedback**: Event-driven calculation updates
- **Copy-to-Clipboard**: Modern implementation with fallback
- **IIFE Module Pattern**: Clean code organization without dependencies

## Implementation Roadmap

1. **Phase 1: Project Setup & Code Reuse Preparation**
   - Create directory structure (index.html, css/, js/)
   - Copy and adapt code from existing calculators
   - Initial git commit

2. **Phase 2: C1 Calculator**
   - Adapt impediment-value-calculator for C1
   - Implement time-unit conversion
   - Add narrative generation

3. **Phase 3: Cost of Delay Calculator**
   - Build simplified Team Cost Approach
   - Implement criticality multiplier
   - Add narrative generation

4. **Phase 4: Meeting Cost Calculator**
   - Build dual output ($ + time)
   - Implement frequency calculations
   - Add narrative generation

5. **Phase 5: UI Integration & Polish**
   - Create tab navigation system
   - Standardize styling
   - Implement real-time calculations

6. **Phase 6: Data Persistence & Sharing**
   - Implement localStorage
   - Implement URL param encoding
   - Test sharing workflow

7. **Phase 7: Testing & Quality Assurance**
   - Manual testing with realistic data
   - Cross-browser testing
   - Accessibility verification

## Success Criteria
- ✅ All three calculators function correctly per specs
- ✅ Formulas are simple enough SMs can understand them (no mystery inputs)
- ✅ Output is TANGIBLE ($ + time, not just "agile buzzwords")
- ✅ UI matches production quality of existing calculators
- ✅ Data persistence works (localStorage + URL sharing)
- ✅ Narratives are compelling and business-focused
- ✅ Application is deployable as static HTML (no server needed)

## Key Design Principles
1. **Tangible Outputs**: Every calculator shows both $ AND time. No abstract metrics.
2. **Accessible Inputs**: Formulas must make intuitive sense to mid-career SMs without finance training
3. **Narrative Generation**: Each result includes human-readable summary explaining the impact
4. **Smart Formatting**: Large numbers ($1.2M), time durations (3 weeks), percentages - all readable
5. **One-Click Sharing**: URL/copy-to-clipboard lets SMs easily share with managers/peers
