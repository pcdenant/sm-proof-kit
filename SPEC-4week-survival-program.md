# SPEC : 4-Week Survival Program
## Collaboration Solved — Le guide de Karim pour ne pas se faire virer

**Version :** 1.0  
**Date :** Avril 2026  
**Auteur :** P-C Denant  
**Status :** Spec de lancement  

---

## 1. Vue d'ensemble

### Le problème
Karim (SM mid-career, 3-5 ans) se sent menacé. Son rôle est "à justifier." Il a des outils (velocity, burndown) mais aucune preuve qu'il crée de la valeur. Il a ~4 semaines pour changer ça avant une restructuration ou une question directe du VP.

### La solution
Un **programme guidé de 4 semaines** où Karim fait 4 choses :
1. **Mesure** ce qu'il a fait (Proof Kit)
2. **Identifie** son plus gros blocage (Bottleneck Radar)
3. **Débloque** ce blocage (3 actions prescrites)
4. **Présente** ça à son boss en CFO language (templates pitch)

À la fin : un slide deck prêt à montrer. Un rôle plus sûr.

### Le différentiateur
Pas un outil. Pas une formation. Une **transformation guidée** de 4 semaines avec coaching réel.

---

## 2. Positionnement

### Pour qui
- **Persona :** Karim / Sophie, SM 3-5 ans, anxieux post-layoffs
- **Taille d'équipe :** 5-25 people (1 team ou fractions)
- **Contexte :** Grande org (500+ employees), où le SM n'est pas vue comme business-critical
- **Mindset :** "Je dois prouver rapidement que je suis indispensable"

### Pourquoi maintenant
- Capital One layoffs (1,100+ postes agile)
- Fidelity restructuration (700 roles)
- Anthropic/AI copilot hype ("pourquoi besoin de SM?")
- Post-COVID distribution = invisible work = invisible SMs

### Concurrence directe
- SAFe coaching ($5k+, trop long)
- CSM certification ($500, pas actionnable)
- Navigating Agile books (€25, no feedback)
- Generic "prove your value" Medium posts (free, vague)

**Notre position :** Rapide, cheap, real guidance, résultats tangibles.

---

## 3. Architecture du programme

### Phase 0 : Pré-enrollment (gratuit)
**Goal :** Qualifier Karim. Confirmer qu'il veut vraiment le programme.

**Délivrables :**
- SM Survival Score (diagnostic interactif)
- Score interpretation : "Tu es vulnerable/stable/irreplaceable"
- If vulnerable/stable → "Voici ce que 4 semaines peux changer"
- CTA : "Rejoins le program"

**Format :** 5 min quiz online, resultat immédiat, email with details

**Pricing :** Gratuit

---

### Phase 1 : MEASURE (Week 1)
**Tagline :** "Quoi tu fais vraiment? Mettons des chiffres dessus."

**Objectif :** Karim quantifie son impact avec data réelle (pas d'estimation).

**Délivrables :**

#### 1.1 — Proof Kit (Tooling)
Karim utilise 3 des 4 calculators existants :
- **C1 (Coût d'obstacle supprimé)** : "Quels obstacles ai-je supprimés ce mois?"
- **Cost of Delay** : "Quels items j'ai dé-bloqués qui étaient en waiting?"
- **Meeting Cost** : "Combien de temps ma team passe en réunions que j'ai réduites?"

**(Ne pas utiliser ici :** Knowledge base — trop secondaire pour cette urgence)

**Input de Karim :**
- 5-8 obstacles qu'il a "résolu" ce mois (exemple : "2 jours de wait entre test et deploy → résolu en débloquer test capacity")
- 3-5 items qui étaient en delay que la team a livré
- 2-3 meetings qu'il a soit optimisé soit éliminé

**Output :**
- Chiffres concrets en €/jours
- Exemple : "€47k + 15 calendar days + 12h meeting time"

**Time :** 90 min de travail pour Karim

**Format :** Google Sheet + instructions claires + video walkthrough (5 min)

#### 1.2 — Data Sense-Check (Coaching touch)
Karim envoie ses chiffres. Je les lis et réponds:
- "C'est réaliste ou overestimated?"
- "Manque quelque chose?"
- "Comment tu vas l'expliquer à un sceptique?"

**Time :** 15 min async (Slack ou email)

#### 1.3 — First Draft Narrative
Karim écrit 3 phrases sur ce qu'il a découvert :
- "J'ai supprimé X obstacles valant €Y en Z semaines"
- "Mon impact = réduire le cycle time par X%"
- "C'est mesurable, reproductible"

**Coaching feedback :** "C'est bon ou trop défensif ou too modest?"

**Time :** 20 min pour Karim + 10 min feedback

---

### Phase 2 : IDENTIFY (Week 2)
**Tagline :** "Ça fait mal où? Identifions le vrai blocage."

**Objectif :** Karim utilise Bottleneck Radar pour identifier le ONE thing qui bloque vraiment.

**Délivrables :**

#### 2.1 — Bottleneck Radar Deployment
Karim set up le bot Slack (ou equivalent). 3-5 jours de data.

**Data collected :**
- Quels item restent longest en "in progress"?
- Quel département/skill crée le plus de waiting?
- Quel type de dépendance externe bloque le plus?

**Output :** "Top 3 blocages par type"

**Time :** 30 min setup + 3 days observation

#### 2.2 — Root Cause Analysis (1-on-1)
Karim et moi (ou async Slack deep-dive):
- "Ça bloque parce que... structure? Skills? Tooling? Politics?"
- "Qui contrôle ce blocage? Toi ou quelqu'un d'autre?"
- "C'est récent ou c'est depuis longtemps?"

**Output :** "The one blocage worth fixing" + root cause + owner

**Time :** 30 min conversation or async exchange

#### 2.3 — Business Impact
Translator ça en €/timeline :
- "Si ce blocage disparaît, on gagne X jours de lead time = Y€ de throughput"
- "Ça vaut la peine? Oui."

**Time :** 20 min with coaching support

---

### Phase 3 : UNLOCK (Week 3)
**Tagline :** "C'est bloqué par un humain. Voici comment le convaincre."

**Objectif :** Karim exécute une action concrète pour dé-bloquer. Et ça marche (ou du moins, il essaie).

**Délivrables :**

#### 3.1 — 3 Paths to Unblock (Template)
Based on the bottleneck, provide 3 concrete options :

**Example 1 (Organizational):**
- "Crée une task force test + deploy (2 people, 2 weeks)"
- Owner : "Ask [Name] and convince him with [data]"
- Pitch : "C'est pas plus de work. C'est réorganiser le work."

**Example 2 (Tooling):**
- "Setup CI/CD stage gate"
- Owner : "Talk to [Infra team]"
- Pitch : "C'est 3 days. Ça économise 2 jours par deploy."

**Example 3 (Process):**
- "Parallel deploy instead of serial testing"
- Owner : "QA lead + Engineering lead alignment"
- Pitch : "Risk = X. Upside = 3 days/cycle. Worth it?"

**Karim picks one and commits.**

#### 3.2 — Pitch Preparation (48-hour experiment format)
Karim writes the conversation he's gonna have :

**Template :**
```
Context: [1 sentence. What's the problem?]
Impact: [1 data point. What happens if we don't fix this?]
Proposal: [1 sentence. What's the ask?]
Effort: [1 number. How much work?]
Payoff: [1 number. What do we gain?]
Timeline: [1 date. When can we start?]
My role: [What I'll do to help this happen]
```

**Example:**
```
Context: Deploy to production takes 3 days (2 days test, 1 day deploy). It's blocking our release cadence.
Impact: We miss customer deadlines. Competitors ship faster. We lose 5% quarterly revenue per slow release.
Proposal: Run test and deploy in parallel instead of serial. Start with 1 team as pilot.
Effort: 2 days to restructure test env. 0 extra ops cost.
Payoff: 1 day shorter cycle. 3 releases/month instead of 2. €300k revenue uplift.
Timeline: Pilot starts Monday. Results in 2 weeks.
My role: I'll coordinate scheduling, clear dependencies, track metrics.
```

**Coaching feedback :** "This is solid" or "You're missing X" or "Soften this angle"

#### 3.3 — The Conversation (Live or async)
Karim has the conversation. Reports back :
- "They said yes" → Celebrate. Move to week 4 (document the win).
- "They said maybe" → Refine pitch. Try again.
- "They said no" → Debug why. Pick option 2 or 3.

**Coaching support :** "Here's how to handle the objection"

**Time :** 30-60 min live coaching available. Mostly async.

---

### Phase 4 : PROVE (Week 4)
**Tagline :** "Fais un pitch au CFO. Voilà tes slides."

**Objectif :** Karim a une présentation prêt à montrer au VP/Manager.

**Délivrables :**

#### 4.1 — The 3-Slide Deck (Template + Fill)

**Slide 1 : The Problem (Data)**
- Graph : lead time/cycle time over time (upward trend = bad)
- Or : "We spend X% in waiting states"
- Or : "Blockers per sprint trend"
- Label : "The invisible problem nobody talks about"

**Slide 2 : The Cause (Your Analysis)**
- "It's not people. It's structure."
- Root cause (the one thing from Phase 2)
- Why it matters for business (revenue, speed, risk)

**Slide 3 : The Fix (Your Leadership)**
- "Here's what I'm gonna do"
- Timeline (4 weeks)
- Expected outcome (data)
- Your role (SM as unblock-er, not process police)
- Ask : "I need you to..." (buy-in, not permission)

**Coaching :** "Does this feel honest?"

#### 4.2 — The Talk (Dry Run + Live)
Karim practices the pitch with me (30 min call) :
- "How does it land?"
- "Too technical?" "Too humble?"
- "Missing anything?"

#### 4.3 — Documentation of Results
After the pitch (whether yes or no) :
- "What changed?"
- "What stayed the same?"
- "What's next?"

This becomes the case study for future cohorts.

---

## 4. Timeline & Milestones

| Week | Karim Does | P-C Does | Deliverable |
|------|-----------|----------|-------------|
| **0** | Takes Survival Score | Reads score, DMs next steps | Qualification + Email |
| **1** | Proof Kit (3 hours) + Data Sense-Check | 15 min feedback | Chiffres + First narrative |
| **2** | Bottleneck Radar (4 days observation) + RCA call | 30 min RCA, 20 min impact math | "The one blocage" |
| **3** | Picks 1 of 3 paths + Has conversation | Coaching (async or live) | Conversation outcome |
| **4** | Practices pitch + Actually pitches | 30 min dry-run + availability for Q&A | 3-slide deck + results |

---

## 5. Format & Access

### Delivery method
- **Slack workspace** : Shared channel for the cohort (max 20 people per cohort)
- **Templates & tools** : Google Drive shared folder (editable)
- **Video guides** : Loom (5-15 min walkthroughs)
- **Coaching** : 
  - Async first (Slack, 24h response time)
  - 1 live 1-on-1 office hour (30 min, week 3 or 4)
  - Group Q&A (optional, async in Slack)

### Cohort model
- Start date : Mondays (2 cohorts/month)
- Duration : 4 weeks
- Max size : 20 per cohort (for quality)
- Rolling enrollment (join any Monday)

---

## 6. Success Metrics

### For Karim
- **Quantifiable :** "I have 3 datapoints to show my boss"
- **Behavioral :** "I had a conversation with [VP] about my impact"
- **Outcome :** "My manager said 'this is good' or 'let's try it'"
- **Confidence :** "I know what I did and why it matters"

### For Collaboration Solved
- **Completion rate :** 85%+ (people finish all 4 weeks)
- **NPS :** 8+ (likely to recommend)
- **Conversion to next product :** 40%+ move to advanced tools or coaching
- **Case study rate :** 50%+ agree to be named in testimonials
- **Churn :** <15% cancel after week 1

### Measurement
- Post-week 1, 2, 3 : Slack pulse (1 question)
- Post-program : Email survey (5 questions)
- 4 weeks later : Did they get promoted or secure their role? (qualitative)

---

## 7. Pricing & Packaging

### Option A : One-time payment
- **Price :** €199 / $199 / $269 CAD
- **Payment :** Stripe one-time
- **Comes with :** 4 weeks of coaching, templates, tools access
- **After program :** Tools available forever, but no coaching

### Option B : Membership + Program
- **Price :** €79/month (or $79 USD / $109 CAD)
- **Commitment :** 3-month minimum (€237)
- **Comes with :** Full program (weeks 1-4) + access to Proof Kit tools + monthly group call
- **After 3 months :** Stay or cancel (no lock-in after)

### Positioning
- **A** = "I need to fix this fast, then get back to my day"
- **B** = "I want ongoing support + community"

**Recommendation :** Start with Option A. Offer B as upgrade after week 2 if they like it.

---

## 8. Onboarding Sequence

### Day 0 : Payment + Welcome
- **Email 1 :** "Welcome to 4-Week Survival. Here's what's gonna happen."
  - Expectation setting
  - Slack link
  - "First thing Monday"

### Day 1 (Monday, week 1 start)
- **Slack announcement :** "We're starting. Introduce yourself. Why you're here."
- **Task 1 :** "Watch 5-min Proof Kit walkthrough"
- **Task 2 :** "Download template + start filling Proof Kit"

### End of Week 1
- **Email 2 :** "Your week 1 review"
  - What you did
  - What's next (week 2)
  - "Reply with 3 obstacles you've removed"

### Weekly pattern
- Monday : Release week's task + Loom walkthrough
- Wednesday : Office hours (async Q&A in Slack, or live 30-min call if Option B)
- Friday : "Share your week 1 wins" (Slack thread)

---

## 9. Content & Resources

### Pre-created (must exist for launch)
1. **Proof Kit** (already exists)
   - C1 calculator
   - Cost of delay
   - Meeting cost
   - Google Sheet template
   - 3-min video walkthrough

2. **Bottleneck Radar**
   - Setup guide (Slack bot or Jira query)
   - 3-min video
   - Sample output + how to read it

3. **RCA Template**
   - Questions to ask yourself
   - Worksheet
   - 5-min video

4. **3-Paths to Unblock**
   - 3 template scenarios
   - Fill-in-the-blank pitch
   - How to pick the right path (flowchart)

5. **3-Slide Pitch Deck**
   - Google Slides template
   - Example (anonymized SM case)
   - Notes on each slide

### During program (created as needed)
- Weekly Loom walkthroughs
- Office hour recordings (made available)
- Case study captures (if Karim agrees)

---

## 10. Go-to-market

### Launch positioning
**"4-Week Survival Program: How to Prove You're Not Dispensable"**

Tagline : "You have 4 weeks to show your VP you create value. Here's how."

### Channels

#### Email (primary)
- SM Survival Score completion → Auto-email with program details
- Newsletter announcement (2-3 weeks pre-launch)
- Segmented : "vulnerable" SMs get first offer

#### YouTube
- 5-min video : "Why SMs get laid off (and how not to be one)"
- CTA → program page

#### LinkedIn
- 1-2 posts : "3 things SMs who didn't get laid off did"
- CTA → SM Survival Score → Program

#### Referral
- Karim recommends to other SMs
- Referral bonus : "You + friend both get 20% off"

---

## 11. Pricing & Revenue Model

### Unit economics (per cohort of 20 people)

**Option A (one-time) :**
- Revenue : 20 × €199 = €3,980
- Time cost : 20 × 2 hours (30 min office hours, async support) = 40 hours
- Revenue/hour : €99

**Option B (membership, 3 months) :**
- Revenue : 20 × €79 × 3 = €4,740
- Time cost : 40 hours + ongoing (monthly groups)
- Revenue/hour : €118 + residual

### Scale (2 cohorts/month)
- Month 1 : 1 cohort = €3,980-4,740
- Month 2 : 2 cohorts = €7,960-9,480
- Month 3 : 2 cohorts + residual B = €7,960 + €1,580 = €9,540
- Year 1 : ~€100k-120k (if 30% A, 70% B mix)

### Assumptions
- 60% conversion from Survival Score → Program
- 85% completion rate
- 40% Option B (membership) vs 60% Option A (one-time)
- Monthly churn on B : 10%

---

## 12. Success Metrics for the Business

### Immediate (post-program)
- **Conversion rate :** % of Survival Score takers who buy
- **Completion rate :** % who finish all 4 weeks
- **NPS :** Post-program survey
- **Case studies :** How many agree to testimonial?

### Medium-term (post-program + 3 months)
- **Role security :** How many kept/secured their SM role?
- **Advancement :** Any promotions or new opportunities?
- **Upgrade rate :** % who buy advanced tools or coaching after

### Long-term
- **Referral rate :** % who refer other SMs
- **Repeat cohort :** Are past members bringing others?
- **Community stickiness :** Do they stay in the Slack after?

---

## 13. Risks & Mitigations

### Risk 1 : Karim's org doesn't care about data
**Mitigation :** The pitch template includes "translated to CFO language". If org is truly dysfunctional, no program helps. But we surface this in week 2, not week 4.

### Risk 2 : High churn (people drop after week 1)
**Mitigation :** 
- Week 1 is easiest (just fill a sheet)
- Push hard on "aha moment" in week 1
- Check in on Wednesday if no submission

### Risk 3 : Coaching becomes a time sink
**Mitigation :**
- All async by default
- Live office hour is optional
- Standardized response templates for common questions
- Max 30 min/person per week

### Risk 4 : Nobody has a real "blocage" to fix
**Mitigation :** Week 2 RCA sometimes reveals the blocage is org politics or "nobody wants change". That's data too. Frame it as "your role is to raise this, not solve it."

### Risk 5 : We promise too much ("secure your role in 4 weeks")
**Mitigation :** Careful messaging. "This shows your value. What your org does with that info is their choice."

---

## 14. Future Expansion

### 4-Week Program v2 (Month 6+)
- Add advanced track (for SMs who completed v1)
- "Weeks 5-8 : Build the team health strategy"
- Higher price (€399 or €99/mo longer)

### Bottleneck Radar Premium
- Standalone product after program proves it works
- Can integrate with Jira, Azure, Linear
- Sells to teams, not just SMs

### "Proof Kit Pro"
- More calculators (cost of context-switching, cost of meetings, cost of bad retrospectives)
- Standalone or bundled with program

### Coaching packages
- Post-program : "I want ongoing coaching" (€199/mo for 1-on-1)
- Tier 2 for SMs who are secure and want to scale up

---

## 15. Definition of Done

Program is ready to launch when:
- [ ] Proof Kit is complete and tested (C1, delay, meetings) with video walkthroughs
- [ ] Bottleneck Radar is built and deployed (Slack bot or equivalent)
- [ ] 3-Paths template is written
- [ ] 3-Slide pitch template exists (with real example)
- [ ] RCA worksheet is written
- [ ] Onboarding email sequence is scripted (5 emails)
- [ ] Slack workspace template is created (channels, pinned resources)
- [ ] Pricing page is live (Stripe integration)
- [ ] Landing page is written (conversion-focused)
- [ ] First cohort has 5 early enrollments (friends, beta testers)
- [ ] You've run through the whole program yourself as Karim once (dogfood test)

---

## Appendix A : Glossary

- **Karim/Sophie :** The SM mid-career persona who's anxious about role security
- **Proof Kit :** Suite of 3-4 calculators (cost of obstacles, delay, meetings)
- **Bottleneck Radar :** Automated tool that identifies where work accumulates
- **RCA :** Root Cause Analysis (why the blocage exists)
- **The Ask :** What Karim requests from his boss/team to unlock the blocage
- **CFO language :** Data-driven business language (€, throughput, risk, time-to-value)
- **Case study :** Real SM story (with permission) showing results

---

## Appendix B : Example Karim Output (Week 4)

**His 3-Slide Deck :**

**Slide 1 : The Problem**
- Graph : Average cycle time last 3 months = 12 days
- Trend : Up 15% vs last quarter
- Label : "Why we're slower than we should be"

**Slide 2 : The Cause**
- "Items wait 3 days at QA/deploy stage (on average)"
- Root cause : "Serial test + deploy. Should be parallel."
- Business impact : "We release 2x/month. Could release 3x/month. That's 15% revenue."

**Slide 3 : Here's What I'm Gonna Do**
- "Restructure test env for parallel run. (2 days, Infra lead + me)"
- "Run pilot with Team A. (2 weeks)"
- "Expected outcome : 3-day cycle reduction. Measure it. (Me as keeper of metrics)"
- "Timeline : Start next Monday. Results in 3 weeks."
- "I need : Your buy-in + Infra time."

---

**His Proof Kit Numbers (Week 1):**
```
Obstacles suppressed (Q2) :
1. Deploy blocker (3 days) → fixed in 1 hour = €8k value
2. Tester sick leave (no backup) → cross-trained person = €15k risk avoided
3. Deployment to staging took 2 days → automated = €5k effort saved
Total : €28k value

Meetings reduced :
- Eliminated 2 stand-ups/week → 5h/month saved = €2k
- Shortened retro from 90 to 45 min → 2.5h/month = €500
Total : €2.5k savings

Lead time improvement :
- Was : 22 days avg
- Now : 18 days avg
- Improvement : 18% (4 days)
- Implication : One more release per quarter = 8-12% more features
```

**His pitch conversation (Week 3):**
```
To: VP Engineering
Context: Our deploy-to-production cycle is 3 days. That's 2 slower than industry average. It's blocking our release cadence.
Impact: At 2 releases/month, we're leaving money on table. 3 releases = 15% more throughput.
Proposal: Parallel test + deploy (vs current serial). Pilot with Team A.
Effort: 2 days to restructure test env. 0 ops cost.
Payoff: 1-day cycle reduction. Measurable. Proven on Team A first.
Timeline: We start Monday. Pilot results in 3 weeks.
My role: I'll coordinate, track metrics, keep this visible.
What I need: Your buy-in + 2 days of Infra help.
```

---

End of SPEC
