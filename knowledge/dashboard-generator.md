# Dynatrace Demo Dashboard Generator — Knowledge Base

**Installed version: __INSTALLED_VERSION__** | [Check for updates](https://www.npmjs.com/package/dt-copilot-agents)

> **Version check (run once per session):** Run `npm view dt-copilot-agents version`. If newer than above, show: `🚀 Update available: __INSTALLED_VERSION__ → <latest> — run: npx dt-copilot-agents@latest install`

## Purpose
Generate and deploy persona-specific dashboards for any scenario: pre-sales demos, live production insights, synthetic data ingestion, or discovery-driven creation. Supports CIO, CTO, CEO, CISO, SRE, IT Head, Application Ops, MLOps, Platform Engineering, VP Engineering, and more.

## When to Use
- Preparing for a customer meeting with any persona (CIO, CTO, CISO, SRE, IT Head, etc.)
- Need a quick demo dashboard with realistic business + technical data
- Connecting to a customer's live Dynatrace tenant to show real data
- Ingesting synthetic data and building dashboards that query it live
- Building a proof-of-concept for a Dynatrace pitch
- Creating industry-specific or role-specific dashboards
- Demonstrating Dynatrace value to different stakeholders in the same organization

---

## Mode Selection — Start Here

**Identify the mode before proceeding.** This determines data source, DQL strategy, and workflow.

| Mode | Trigger Phrases | Data Source | Time |
|---|---|---|---|
| **1. Demo Mode** *(default)* | "meeting", "prospect", "pitch", "pre-sales", "quick demo" | Inline synthetic `data record()` | < 5 min |
| **2. Live Tenant Mode** | "real data", "production", "actual tenant", "their Dynatrace", "live metrics" | Real metrics/logs from tenant via DQL | < 10 min |
| **3. Synthetic Ingest Mode** | "ingest", "inject data", "persistent demo", "synthetic but live queries" | Generated data ingested via API → queried live | < 20 min |
| **4. Interview-First Mode** | "interview me", "ask me questions", "help me figure out", "discovery mode" | User-driven discovery → any data source | < 15 min |
| **5. POC Value Story** | "MTTR", "correlation", "business observability", "proactive", "POC value", "prove value", "root cause story" | Real tenant data via MCP (Mode 2 extension) | < 15 min |

**Default: Mode 1** — if no mode is specified and no tenant context exists, use Mode 1.

**Auto-detection heuristics:**
- MCP is connected + user mentions "dashboard" → suggest Mode 2 (can use real data)
- User says "meeting tomorrow" / "prospect" → Mode 1
- User says "show me their actual latency" → Mode 2
- User says "ingest some data first" → Mode 3
- User asks "what should be on the dashboard?" or is unsure → Mode 4

---

## Workflow

### Phase 1: Research (< 2 minutes)

1. **Identify the company and business line** from user input
2. **Web research** the company:
   - Official website for business facts (capacity, plants, products, brands, regions)
   - Industry-specific metrics and KPIs
   - Real product names, plant locations, partner/brand names
3. **Determine the dashboard archetype** based on the business:

| Business Type | KPI Strip | Section 2 | Section 3 | Section 4 |
|---|---|---|---|---|
| **E-Commerce / Marketplace** | GMV, Orders, Conversion%, Active Users | Channel mix, Category GMV, Sessions trend, Top products | Retail network, Brand revenue, Services, Expansion | Supply chain, Fulfillment, Delivery metrics, Recent orders |
| **Manufacturing / Industrial** | Production MT, OEE%, Capacity Util%, Energy Intensity | Plant production, Product mix, Production trend, Capacity table | Quality (FPY), Sustainability (energy/water/CO2), Trends, Water donut | Downtime, Maintenance, Raw material stock, Alerts |
| **SaaS / Platform** | MRR, Active Users, Churn%, API Uptime | Feature usage, Revenue by plan, DAU trend, Top accounts | API latency, Error rates, Response time table, Request volume | Incidents, Deployment frequency, SLA compliance, Recent events |
| **Financial Services** | AUM, Transactions, STP Rate%, System Uptime | Channel volume, Product mix, Transaction trend, Top branches | API perf, Error rate, Response time, Request volume | Fraud alerts, Reconciliation, Settlement, Recent transactions |
| **Retail / Omnichannel** | Revenue, Footfall, Basket Size, Online Share% | Store performance, Category revenue, Traffic trend, Top SKUs | POS uptime, App sessions, Loyalty engagement, Inventory | Fulfillment, Returns, CSAT, Recent orders |

### Persona Archetypes

The **persona** determines which metrics matter, what language to use, and what decisions the dashboard enables. Combine persona + industry archetype to generate the right dashboard.

If the user doesn't specify a persona, **default to CIO**. If they specify both persona and industry, combine them.

#### Executive Personas

| Persona | Header | KPI Strip (4 tiles) | Section 2 | Section 3 | Section 4 | Language Style |
|---|---|---|---|---|---|---|
| **CEO** | `👔 CEO Business Impact Center` | Revenue Impact (₹), Customer Experience Score, Business Continuity %, Digital Revenue Share % | Revenue by business unit (bar), Digital vs traditional mix (donut), Revenue trend (line), Top revenue generators (table) | Customer impact — sessions affected, NPS correlation, user satisfaction trend, customer segment health (table) | Risk register, business continuity status, competitive benchmark, executive alerts | Board-level language, ₹/$ values, business outcomes only, no technical jargon |
| **CIO** | `🏛️ CIO Command Center` | Primary Business Metric, Volume/Count, System Health %, SLA/Quality % | Business performance breakdown (bar), Category/segment mix (donut), Trend over time (line), Top entities (table) | Platform health — latency, errors, response times, request volume | Operations — maintenance, fulfillment, alerts, recent events | Strategic IT language, business-IT alignment, transformation metrics |
| **CTO** | `⚙️ CTO Technology Command Center` | Platform Uptime %, Deployment Frequency, Tech Debt Score, API Success Rate % | Architecture health by service (bar), Technology stack distribution (donut), Deployment velocity trend (line), Service dependency health (table) | Innovation metrics — feature lead time, experiment throughput, modernization progress trend, tech radar (table) | Platform reliability — incidents, DORA metrics, tech debt backlog, recent deployments | Technical strategy language, architecture decisions, innovation velocity |
| **CISO** | `🛡️ CISO Security Command Center` | Security Score, Open Vulnerabilities, Mean Time to Remediate (days), Compliance Score % | Vulnerabilities by severity (bar), Attack surface by category (donut), Security incidents trend (line), Top risk assets (table) | Compliance — framework coverage by standard (bar), audit findings (table), compliance trend (line), data classification (donut) | Threat landscape — active threats (table), incident response status (pie), MITRE ATT&CK coverage (bar), recent security events | Security language, risk quantification, compliance frameworks, zero-trust references |

#### Technical / Operations Personas

| Persona | Header | KPI Strip (4 tiles) | Section 2 | Section 3 | Section 4 | Language Style |
|---|---|---|---|---|---|---|
| **SRE** | `🔧 SRE Reliability Dashboard` | Error Budget Remaining %, P99 Latency (ms), MTTR (min), Incident Count (24h) | SLO status by service (bar), Error budget burn by team (donut), Latency percentiles trend (line), SLO compliance (table) | Incident management — incidents by severity (bar), on-call rotation (table), MTTR trend (line), incident category (pie) | Toil & automation — toil hours by category (table), change failure rate (pie), capacity headroom (bar), recent incidents | SRE language — error budgets, SLOs/SLIs, toil, blast radius, blameless, reliability |
| **IT Head / VP Infrastructure** | `🖥️ IT Infrastructure Command Center` | Infrastructure Uptime %, Active Hosts, Storage Utilization %, Network Health Score | Host health by datacenter (bar), OS distribution (donut), CPU/Memory utilization trend (line), Top hosts by load (table) | Cost & capacity — cloud spend by service (bar), cost allocation (table), capacity forecast trend (line), reserved vs on-demand (donut) | Operations — patching compliance (table), maintenance windows (pie), ticket backlog (bar), recent infrastructure events | Infrastructure language, capacity planning, cost optimization, availability |
| **Application Ops** | `📱 Application Operations Center` | App Availability %, Avg Response Time (ms), Error Rate %, Active User Sessions | Response time by service (bar), Error distribution by type (donut), Apdex score trend (line), Slowest endpoints (table) | Release health — deployment success by app (bar), version distribution (table), crash rate trend (line), feature flag status (donut) | Dependencies — downstream health (table), database query performance (pie), external API status (bar), recent app events | APM language — Apdex, response time, throughput, error rate, user sessions |
| **MLOps / AI Ops** | `🤖 MLOps AI Operations Center` | Model Accuracy %, Avg Inference Latency (ms), Token Cost ($/day), Model Drift Score | Model performance by endpoint (bar), Token usage by model (donut), Inference latency trend (line), Top models by volume (table) | Cost & efficiency — cost per 1K tokens by provider (bar), GPU utilization (table), cost trend (line), model size distribution (donut) | Quality & safety — hallucination rate by model (table), data drift status (pie), prompt injection attempts (bar), recent AI events | ML language — inference, tokens, embeddings, drift, RLHF, guardrails, RAG, fine-tuning |
| **Platform Engineering** | `🏗️ Platform Engineering Dashboard` | Developer Satisfaction (DSAT) %, Self-Service Adoption %, Avg Build Time (min), Platform Availability % | IDP adoption by team (bar), Service catalog usage (donut), CI/CD pipeline duration trend (line), Golden path compliance (table) | Developer experience — onboarding time by team (bar), template usage (table), developer wait time trend (line), toolchain satisfaction (donut) | Platform health — build failures (table), infrastructure provisioning time (pie), API gateway status (bar), recent platform events | Platform engineering language — golden paths, IDP, self-service, paved roads, developer experience |
| **VP Engineering** | `📊 VP Engineering — Delivery & Quality` | Deployment Frequency (/day), Lead Time for Changes (hrs), Change Failure Rate %, Sprint Velocity | DORA metrics by team (bar), Code quality distribution (donut), Velocity trend (line), Team performance (table) | Quality gates — test coverage by service (bar), bug density (table), escaped defects trend (line), technical debt by area (donut) | Team health — team capacity (table), sprint burndown status (pie), cross-team dependencies (bar), recent engineering events | Engineering management language — DORA, velocity, sprint, quality gates, tech debt |

#### Persona Selection Logic

1. If user says **"SRE dashboard for Tata Steel"** → use SRE persona + Manufacturing industry
2. If user says **"dashboard for Grasim CIO"** → use CIO persona + determine industry from research
3. If user says **"CISO dashboard"** (no company) → use CISO persona + generic enterprise context
4. If user says **"dashboard for Infosys"** (no persona) → default to CIO persona + SaaS/IT Services industry
5. If user says **"MLOps dashboard for a bank"** → use MLOps persona + Financial Services industry

#### Header Format by Persona

```
# {EMOJI} {COMPANY} — {BUSINESS_LINE}
## {PERSONA_TITLE} | {SUBTITLE}

**{TAGLINE — what this dashboard answers for this persona}**
```

Examples:
- `# 🔧 Tata Steel — Steel Manufacturing\n## SRE Reliability Dashboard | Production Systems\n\n**Tracking SLOs, error budgets, and incident response across 26 plants**`
- `# 🛡️ HDFC Bank — Digital Banking\n## CISO Security Command Center | Threat & Compliance\n\n**Real-time security posture across 6,300+ branches and digital channels**`
- `# 🤖 Infosys — Enterprise AI Services\n## MLOps AI Operations Center | Model Fleet Health\n\n**Monitoring inference performance, token economics, and model drift across client deployments**`

### Phase 1.5: Guided Interview (OPTIONAL — < 1 minute)

#### Gate Logic — Read This First

**Simple prompt (e.g. "CIO dashboard for HDFC Bank") → SKIP the gate entirely. Build immediately with smart defaults.** Do not ask any questions. Just say: "Building your [Persona] dashboard for [Company]..." and proceed to Phase 2.

**Only show the gate when** the prompt contains explicit signals of needing customization:
- Words like "meeting", "tomorrow", "prospect", "pitch", "present" → show Meeting Brief option
- Words like "customize", "specific", "focus on", "I need" → show Customize option
- Words like "real data", "their tenant", "production" → switch to Mode 2 entirely (no gate)
- Words like "interview", "help me figure out" → switch to Mode 4 entirely (no gate)

**When to show the gate:**
> I've researched **{Company}** and identified it as a **{Industry}** business. I'll build a **{Persona}** dashboard.
>
> **Quick generate, or tailor it?**
> 1. ⚡ **Build now** — smart defaults from my research
> 2. 🎯 **Customize** — 5 quick questions (~60 seconds)
> 3. 🗣️ **Meeting brief** — tell me about the meeting and I'll design the story arc

**If the user picks Build now (or says "skip", "go ahead", "just do it", "yes", etc.)** → jump to Phase 2 immediately.

**If the user picks Meeting brief** → ask the Meeting Intelligence questions below.

**If the user picks Customize** → ask all 5 questions **in a single message** so the user can reply once:

---

#### Meeting Intelligence Questions (for Meeting Brief mode or Mode 4)

Ask these as a single block — the user can answer any or skip:

**🎯 Tell me about the meeting — answer what you know:**

**1. Meeting goal** — What outcome do you need from this meeting?
   - First contact / discovery
   - Business case / ROI discussion
   - Proof of Value review
   - Renewal / expansion discussion
   - Executive Business Review (EBR)
   - Competitive displacement
   _(Pick one or describe freely)_

**2. Attendees** — Who will be in the room?
   _e.g. "CIO + VP Engineering + Head of Infrastructure" or "CISO and her team"_

**3. Known pain points** — What keeps them up at night?
   _e.g. "They had 3 major outages last quarter", "They're worried about cloud spend", "Security audit findings"_

**4. What should they feel/decide after?**
   _e.g. "Urgency to deploy", "Confidence in our platform", "Approve the budget", "Choose us over Datadog"_

**5. Story arc** — Is there a before/after narrative?
   _e.g. "Show chaos before Dynatrace → calm after", "Show risk they're exposed to right now"_

**6. Competitive context** — Are they evaluating alternatives?
   _e.g. "Currently on Splunk", "Evaluating Datadog and New Relic too"_

#### How Meeting Intelligence Shapes the Dashboard

| Answer | What Changes |
|---|---|
| **Meeting goal: Renewal** | Section 4 shows value delivered (uptime improvements, incidents resolved, cost saved) |
| **Meeting goal: PoV** | Section 3 shows a "before vs after" with dramatic numbers |
| **Meeting goal: Competitive** | KPIs benchmark against industry peers, tile 1 tagline highlights differentiation |
| **Pain point: Outages** | Section 3 = SLO/incident tiles, recent events show resolved incidents |
| **Pain point: Cost** | Section 3 = cost optimization tiles, budget vs actual |
| **Pain point: Security** | Section 3 = vulnerability/compliance tiles |
| **Feel: Urgency** | Use red/yellow threshold colors more aggressively, "active issues" language |
| **Feel: Confidence** | Use green thresholds, uptime trends going up, "resolved" events |
| **Competitive: Datadog** | Add deployment frequency and DORA metrics (Dynatrace strength) |

---

**📋 Quick customization — answer as many as you like (or skip any with "default"):**

**1. Top KPIs** — Which 4 metrics matter most for your KPI strip?
   _Suggested based on research:_ `{list 6-8 KPI options from persona archetype + research}`
   _(Pick 4, or say "default" to use my suggestions)_

**2. Key Regions / Business Units** — Which locations or divisions should be featured?
   _Found in research:_ `{list discovered regions/plants/BUs}`
   _(Pick 4-8, reorder by priority, or say "default")_

**3. Primary Concern** — What's the #1 thing this dashboard should highlight?
   - Cost Optimization
   - Reliability & Uptime
   - Security & Compliance
   - Growth & Revenue
   - Customer Experience
   - Operational Efficiency
   _(Pick one, or say "default" for balanced view)_

**4. Audience & Tone** — Who will see this dashboard?
   - Board / C-Suite presentation (high-level, business language, no jargon)
   - Leadership review (balanced business + tech)
   - Engineering / Ops daily use (technical detail, SLOs, latencies)
   - Customer demo (visually impressive, storytelling)
   _(Pick one, or say "default")_

**5. Anything specific?** — Any pain points, scenarios, or context to highlight?
   _Example: "we had a major outage last month", "cost optimization is the board's #1 priority", "focus on AI/ML workloads"_
   _(Free text, or say "skip")_

---

#### How Interview Answers Shape the Dashboard

| Answer | What Changes |
|---|---|
| **Top KPIs** | Tiles 2-5 use the user's chosen metrics instead of archetype defaults |
| **Key Regions/BUs** | Bar charts (tiles 7, 12, 19) and tables (10, 13, 17) prioritize selected regions |
| **Primary Concern** | Section 3-4 themes tilt toward the concern (e.g., "Cost" → add cost/energy tiles; "Reliability" → add SLO/incident tiles; "Security" → add vulnerability/compliance tiles) |
| **Audience & Tone** | Adjusts jargon level, data density, markdown header language, and whether to use ₹/$ or abstract scores |
| **Specific context** | Feeds into section themes, "recent events" table narratives, and markdown tagline |

**For any question answered with "default" or skipped** → use the persona archetype defaults from the tables above.

#### Concern → Section Theme Mapping

| Primary Concern | Section 3 Theme | Section 4 Theme |
|---|---|---|
| **Cost Optimization** | Cost breakdown by unit/service, budget vs actual, cost trend, spend distribution | Waste/idle resources, optimization opportunities, forecasted spend, recent cost alerts |
| **Reliability & Uptime** | SLO status by service, error budget burn, latency percentiles, SLO compliance table | Incidents by severity, MTTR trend, change failure rate, recent incidents |
| **Security & Compliance** | Vulnerabilities by severity, compliance coverage, security trend, risk assets | Active threats, incident response, MITRE coverage, recent security events |
| **Growth & Revenue** | Revenue by segment, customer acquisition, growth trend, top accounts | Conversion funnel, churn analysis, expansion revenue, recent transactions |
| **Customer Experience** | User satisfaction by channel, NPS/CSAT scores, session quality trend, top issues | User journey completion, error impact on users, performance by region, recent user complaints |
| **Operational Efficiency** | Process throughput by unit, automation rate, cycle time trend, capacity table | Backlog status, SLA compliance, resource utilization, recent operational events |

**Platform compatibility:** This interview is pure conversational text — works identically in VS Code Copilot, Claude Code, Cursor, Windsurf, ChatGPT, and any chat-based AI interface. No IDE-specific APIs or tools required.

### Phase 2: Build Dashboard JSON (< 3 minutes)

4. **Create the dashboard JSON** file with exactly **20 tiles** following this structure:

```
Tile 1:  Markdown header (emoji + company + business line + tagline)
Tile 2:  KPI singleValue #1 (primary business metric)
Tile 3:  KPI singleValue #2 (volume/count metric)
Tile 4:  KPI singleValue #3 (health/efficiency %)
Tile 5:  KPI singleValue #4 (quality/SLA metric)
Tile 6:  Markdown section header — Section 2
Tile 7:  categoricalBarChart (breakdown by region/channel/plant)
Tile 8:  donutChart (mix by category/product/segment)
Tile 9:  lineChart or areaChart (trend over time) — TIMESERIES
Tile 10: table (top N with multiple columns)
Tile 11: Markdown section header — Section 3
Tile 12: categoricalBarChart (quality/performance breakdown)
Tile 13: table (multi-column comparison)
Tile 14: lineChart (trend over time) — TIMESERIES
Tile 15: donutChart or pieChart (composition)
Tile 16: Markdown section header — Section 4
Tile 17: table (operational detail)
Tile 18: pieChart (status/composition breakdown)
Tile 19: categoricalBarChart or table (additional breakdown)
Tile 20: table (recent events/orders/alerts — live feed style)
```

5. **SMART LAYOUT SELECTION — choose the right variant based on context:**

#### Layout Variant Selector

| Scenario | Use Variant | Key Characteristics |
|---|---|---|
| Executive / C-suite presentation | **A: Panorama** | Big KPIs (h=5), wide bar charts (w=14), spacious feel |
| Standard demo or balanced view | **B: Standard** *(default)* | 12+8 asymmetric columns, h=7 data tiles |
| Technical deep-dive (SRE, Ops, Eng) | **C: Dense** | Compact KPIs (h=3), shorter tiles (h=6), more information density |
| Meeting with ONE critical message | **D: Hero** | Tile 2 = w=10 h=6 hero KPI, others arranged around it |
| Trend-heavy story (growth, degradation) | **E: Trend-First** | Time-series tiles get w=14, reference charts get w=6 |

**Selection rules:**
- Persona is CEO/CIO/CISO + meeting is board/C-suite → **Variant A**
- Persona is SRE/Platform Eng/VP Eng → **Variant C**
- Meeting goal is renewal/PoV with one key win → **Variant D** (hero tile = the key metric)
- Dashboard is trend-driven (growth story, degradation, SLO trend) → **Variant E**
- Everything else → **Variant B** (Standard)

---

#### Variant A: Panorama (Executive / C-suite)

```json
"layouts": {
  "1":  {"x":0,  "y":0,  "w":20, "h":3},
  "2":  {"x":0,  "y":3,  "w":5,  "h":5},
  "3":  {"x":5,  "y":3,  "w":5,  "h":5},
  "4":  {"x":10, "y":3,  "w":5,  "h":5},
  "5":  {"x":15, "y":3,  "w":5,  "h":5},
  "6":  {"x":0,  "y":8,  "w":20, "h":1},
  "7":  {"x":0,  "y":9,  "w":14, "h":8},
  "8":  {"x":14, "y":9,  "w":6,  "h":8},
  "9":  {"x":0,  "y":17, "w":6,  "h":8},
  "10": {"x":6,  "y":17, "w":14, "h":8},
  "11": {"x":0,  "y":25, "w":20, "h":1},
  "12": {"x":0,  "y":26, "w":14, "h":8},
  "13": {"x":14, "y":26, "w":6,  "h":8},
  "14": {"x":0,  "y":34, "w":6,  "h":8},
  "15": {"x":6,  "y":34, "w":14, "h":8},
  "16": {"x":0,  "y":42, "w":20, "h":1},
  "17": {"x":0,  "y":43, "w":7,  "h":7},
  "18": {"x":7,  "y":43, "w":7,  "h":7},
  "19": {"x":14, "y":43, "w":6,  "h":7},
  "20": {"x":0,  "y":50, "w":20, "h":8}
}
```

---

#### Variant B: Standard (Default — balanced)

```json
"layouts": {
  "1":  {"x":0,  "y":0,  "w":20, "h":2},
  "2":  {"x":0,  "y":2,  "w":5,  "h":4},
  "3":  {"x":5,  "y":2,  "w":5,  "h":4},
  "4":  {"x":10, "y":2,  "w":5,  "h":4},
  "5":  {"x":15, "y":2,  "w":5,  "h":4},
  "6":  {"x":0,  "y":6,  "w":20, "h":1},
  "7":  {"x":0,  "y":7,  "w":12, "h":7},
  "8":  {"x":12, "y":7,  "w":8,  "h":7},
  "9":  {"x":0,  "y":14, "w":8,  "h":7},
  "10": {"x":8,  "y":14, "w":12, "h":7},
  "11": {"x":0,  "y":21, "w":20, "h":1},
  "12": {"x":0,  "y":22, "w":12, "h":7},
  "13": {"x":12, "y":22, "w":8,  "h":7},
  "14": {"x":0,  "y":29, "w":8,  "h":7},
  "15": {"x":8,  "y":29, "w":12, "h":7},
  "16": {"x":0,  "y":36, "w":20, "h":1},
  "17": {"x":0,  "y":37, "w":7,  "h":7},
  "18": {"x":7,  "y":37, "w":7,  "h":7},
  "19": {"x":14, "y":37, "w":6,  "h":7},
  "20": {"x":0,  "y":44, "w":20, "h":8}
}
```

---

#### Variant C: Dense (Technical — SRE, Ops, VP Eng)

```json
"layouts": {
  "1":  {"x":0,  "y":0,  "w":20, "h":2},
  "2":  {"x":0,  "y":2,  "w":4,  "h":3},
  "3":  {"x":4,  "y":2,  "w":4,  "h":3},
  "4":  {"x":8,  "y":2,  "w":4,  "h":3},
  "5":  {"x":12, "y":2,  "w":8,  "h":3},
  "6":  {"x":0,  "y":5,  "w":20, "h":1},
  "7":  {"x":0,  "y":6,  "w":12, "h":6},
  "8":  {"x":12, "y":6,  "w":8,  "h":6},
  "9":  {"x":0,  "y":12, "w":8,  "h":6},
  "10": {"x":8,  "y":12, "w":12, "h":6},
  "11": {"x":0,  "y":18, "w":20, "h":1},
  "12": {"x":0,  "y":19, "w":12, "h":6},
  "13": {"x":12, "y":19, "w":8,  "h":6},
  "14": {"x":0,  "y":25, "w":8,  "h":6},
  "15": {"x":8,  "y":25, "w":12, "h":6},
  "16": {"x":0,  "y":31, "w":20, "h":1},
  "17": {"x":0,  "y":32, "w":7,  "h":6},
  "18": {"x":7,  "y":32, "w":7,  "h":6},
  "19": {"x":14, "y":32, "w":6,  "h":6},
  "20": {"x":0,  "y":38, "w":20, "h":7}
}
```

---

#### Variant D: Hero (Single critical message — meeting-specific)

Use when the meeting revolves around ONE key number (uptime achievement, MTTR improvement, cost saved, vulnerabilities found). Tile 2 is the hero — double width, double height.

```json
"layouts": {
  "1":  {"x":0,  "y":0,  "w":20, "h":2},
  "2":  {"x":0,  "y":2,  "w":10, "h":6},
  "3":  {"x":10, "y":2,  "w":5,  "h":3},
  "4":  {"x":15, "y":2,  "w":5,  "h":3},
  "5":  {"x":10, "y":5,  "w":10, "h":3},
  "6":  {"x":0,  "y":8,  "w":20, "h":1},
  "7":  {"x":0,  "y":9,  "w":12, "h":7},
  "8":  {"x":12, "y":9,  "w":8,  "h":7},
  "9":  {"x":0,  "y":16, "w":8,  "h":7},
  "10": {"x":8,  "y":16, "w":12, "h":7},
  "11": {"x":0,  "y":23, "w":20, "h":1},
  "12": {"x":0,  "y":24, "w":12, "h":7},
  "13": {"x":12, "y":24, "w":8,  "h":7},
  "14": {"x":0,  "y":31, "w":8,  "h":7},
  "15": {"x":8,  "y":31, "w":12, "h":7},
  "16": {"x":0,  "y":38, "w":20, "h":1},
  "17": {"x":0,  "y":39, "w":7,  "h":7},
  "18": {"x":7,  "y":39, "w":7,  "h":7},
  "19": {"x":14, "y":39, "w":6,  "h":7},
  "20": {"x":0,  "y":46, "w":20, "h":8}
}
```
_Hero examples: "99.97% uptime this quarter" (renewal), "67% MTTR reduction" (PoV), "142 critical vulnerabilities unpatched" (risk presentation)._

---

#### Variant E: Trend-First (Growth or degradation story)

```json
"layouts": {
  "1":  {"x":0,  "y":0,  "w":20, "h":2},
  "2":  {"x":0,  "y":2,  "w":5,  "h":4},
  "3":  {"x":5,  "y":2,  "w":5,  "h":4},
  "4":  {"x":10, "y":2,  "w":5,  "h":4},
  "5":  {"x":15, "y":2,  "w":5,  "h":4},
  "6":  {"x":0,  "y":6,  "w":20, "h":1},
  "7":  {"x":0,  "y":7,  "w":8,  "h":7},
  "8":  {"x":8,  "y":7,  "w":12, "h":7},
  "9":  {"x":0,  "y":14, "w":14, "h":7},
  "10": {"x":14, "y":14, "w":6,  "h":7},
  "11": {"x":0,  "y":21, "w":20, "h":1},
  "12": {"x":0,  "y":22, "w":6,  "h":7},
  "13": {"x":6,  "y":22, "w":14, "h":7},
  "14": {"x":0,  "y":29, "w":14, "h":7},
  "15": {"x":14, "y":29, "w":6,  "h":7},
  "16": {"x":0,  "y":36, "w":20, "h":1},
  "17": {"x":0,  "y":37, "w":7,  "h":7},
  "18": {"x":7,  "y":37, "w":7,  "h":7},
  "19": {"x":14, "y":37, "w":6,  "h":7},
  "20": {"x":0,  "y":44, "w":20, "h":8}
}
```
_Time-series tiles (9, 14) get w=14. The trend is always the widest element on its row._

---

**Content-aware width rules (grid = 20 units):**
- `categoricalBarChart` / `table` → **w=12–14** (needs label/column space)
- `donutChart` / `pieChart` → **w=6–8** (compact circular charts)
- `lineChart` / `areaChart` → **w=8–14** (wider for trend-heavy dashboards)
- Pair widths to sum to 20: bar(12)+donut(8), chart(14)+donut(6), line(8)+table(12)
- Alternate wide-left/wide-right across rows for visual variety

**FORBIDDEN widths (if you see these, the layout is WRONG):**
- w=20 on any data tile (tiles 2-5, 7-10, 12-15, 17-19) = WRONG
- w=10+10 on any row = WRONG (too symmetric, looks boring)
- Any tile alone on a row (except headers and tile 20) = WRONG
- **Post-check: verify every pair of adjacent tiles on a row sums to w=20**

**POST-GENERATION LAYOUT VALIDATION — MANDATORY before saving the file:**
1. ✅ KPI tiles: tiles per row × widths = 20 (e.g. 4×5, or 5×4, or 2+5+5+5+3)
2. ✅ Every data-tile row has exactly 2 or 3 tiles summing to w=20
3. ✅ NO data tile has w=20 (only markdown headers and tile 20 bottom feed)
4. ✅ NO row uses w=10+10
5. ✅ Adjacent tiles don't overlap (x + w of left tile = x of right tile)

**If ANY check fails, fix the layout before proceeding.**

6. **Data source depends on mode:**
   - **Mode 1 (Demo)**: ALL queries use `data record(...)` inline DQL — NEVER use `fetch logs` or `fetch events`
   - **Mode 2 (Live Tenant)**: Use real DQL — `fetch metrics`, `timeseries`, `fetch logs`, `smartscapeNodes`
   - **Mode 3 (Ingest)**: Use `fetch logs`, `fetch bizevents`, `timeseries` pointing to ingested metric keys

---

## DQL Data Rules — CRITICAL

### fieldsRename — NEVER use string literals

`fieldsRename` parameters must be **field identifiers**, NOT quoted strings. This is a DQL syntax requirement.

```dql
// ❌ WRONG — causes "must be a field identifier" error
| fieldsRename subsidiary = "Subsidiary", revenue = "Revenue (₹ Cr)"

// ✅ RIGHT — use fieldsAdd to create new named fields, then remove old ones
| fieldsAdd Subsidiary = subsidiary, Revenue = revenue
| fieldsRemove subsidiary, revenue

// ✅ SIMPLEST — just keep original field names (recommended for demo dashboards)
| fieldsKeep subsidiary, revenue, growth, customers
```

**For demo dashboards, prefer keeping original field names** — they are readable enough and avoid this pitfall entirely.

### Static tiles (singleValue, bar, donut, pie, table):
```dql
data record(field1="value1", field2=123),
     record(field1="value2", field2=456)
| sort field2 desc
| fieldsKeep field1, field2
```

### Time-series tiles (lineChart, areaChart) — MUST follow these rules:
- **Timestamps MUST be within 3 hours of `now()`** — use `now()-165m` through `now()-15m`
- **Interval must be 15m or 30m** for the default dashboard timeframe
- **Always cast to `toDouble()` before `makeTimeseries`**
- **Generate 6-12 data points per series** for a good-looking chart

```dql
data record(timestamp=now()-165m, series="A", val=120),
     record(timestamp=now()-150m, series="A", val=135),
     record(timestamp=now()-135m, series="A", val=128),
     record(timestamp=now()-120m, series="A", val=142),
     record(timestamp=now()-105m, series="A", val=131),
     record(timestamp=now()-90m, series="A", val=138),
     record(timestamp=now()-75m, series="A", val=125),
     record(timestamp=now()-60m, series="A", val=140),
     record(timestamp=now()-45m, series="A", val=133),
     record(timestamp=now()-30m, series="A", val=137),
     record(timestamp=now()-15m, series="A", val=130)
| fieldsAdd val = toDouble(val)
| makeTimeseries metric_name = avg(val), by: {series}, interval: 15m
```

**NEVER use timestamps > 3 hours ago (e.g. `now()-336h`) — makeTimeseries will return empty results with default dashboard timeframe!**

---

## Data Realism Rules

- **Use REAL company data**: actual plant names, product names, brand names, city names, capacity figures from research
- **Numbers must be internally consistent**: totals should roughly match sum of breakdowns
- **Regional distribution should be weighted realistically** (e.g., Maharashtra > Rajasthan for Indian businesses)
- **Include 8-12 categories/regions** for bar charts for visual richness
- **Include 10-15 rows** for the "recent events" table at the bottom
- **Recent events table should have realistic timestamps**: `now()-3m`, `now()-8m`, `now()-15m`, etc.
- **Use industry-standard terminology** (OEE for manufacturing, GMV for marketplace, MRR for SaaS)

---

## Visualization Types Reference

| Tile Type | `visualization` value | Best for |
|---|---|---|
| Single number | `singleValue` | KPI headlines |
| Vertical bars | `categoricalBarChart` | Comparisons across categories |
| Donut | `donutChart` | Part-of-whole (revenue mix, category share) |
| Pie | `pieChart` | Status breakdown (fulfillment, incidents) |
| Line | `lineChart` | Trends over time (response time, production rate) |
| Stacked area | `areaChart` | Volume over time (sessions, requests) |
| Data table | `table` | Multi-column detail (top-N, recent events) |

## singleValue Threshold Colors

```json
// Green when high is good (uptime, OEE)
[{"color":"#dc172a","value":0},{"color":"#f5d565","value":80},{"color":"#6bcb77","value":95}]

// Blue for neutral metrics (revenue, count)
[{"color":"#14a8f5","value":0}]

// Inverted — green when LOW is good (error rate, latency)
[{"color":"#6bcb77","value":0},{"color":"#f5d565","value":50},{"color":"#dc172a","value":80}]
```

## Color Reference
- Red: `#dc172a` (critical / bad)
- Yellow: `#f5d565` (warning)
- Green: `#6bcb77` (good / healthy)
- Blue: `#14a8f5` (neutral / informational)

---

## Dashboard JSON Schema

```json
{
  "name": "Dashboard Name",
  "content": {
    "layouts": {
      "1":  {"x":0, "y":0, "w":20, "h":2},
      "2":  {"x":0, "y":2, "w":5,  "h":4},
      "... etc — flat object, tile ID → {x,y,w,h} ...": {}
    },
    "tiles": {
      "1": {
        "content": "# 🏭 Company — Business Line\n## CIO Command Center",
        "type": "markdown"
      },
      "2": {
        "query": "data record(value=127.43)\n| fieldsKeep value",
        "title": "KPI Title",
        "type": "data",
        "visualization": "singleValue",
        "visualizationSettings": {
          "singleValue": {"autoscale":true,"label":"Label","showLabel":true},
          "thresholds": [{"color":"#14a8f5","value":0}]
        }
      }
    },
    "variables": [],
    "version": 21
  }
}
```

---

## Authentication — Interactive Setup

The agent MUST check prerequisites and **ask the user interactively** for any missing details. Never silently skip or use placeholder values.

### Step A: Install DTCTL (if missing)

Run `dtctl version`. If the command fails (not found):
1. Detect the OS
2. Install automatically:
   - **macOS/Linux**: `brew install dynatrace-oss/tap/dtctl` or `curl -fsSL https://raw.githubusercontent.com/dynatrace-oss/dtctl/main/install.sh | sh`
   - **Windows**: `irm https://raw.githubusercontent.com/dynatrace-oss/dtctl/main/install.ps1 | iex`
3. Verify with `dtctl version`

### Step B: Configure DTCTL Context (ask user for tenant)

Run `dtctl config current-context`. If no context exists or auth has expired:
1. **Ask the user**: _"What is your Dynatrace tenant ID? (e.g. `abc12345` from `abc12345.apps.dynatrace.com`)"_
2. Create the context:
   ```bash
   dtctl config set-context <name> --environment https://<TENANT_ID>.apps.dynatrace.com
   dtctl config use-context <name>
   ```
3. Authenticate via browser SSO:
   ```bash
   dtctl auth login
   ```
   This opens the browser — the user logs in and the token is stored automatically.
4. **Alternative** — if the user provides a token instead:
   ```bash
   dtctl auth login --token <TOKEN> --context <name>
   ```

### Step C: Configure MCP Server (optional — ask if user wants DQL verification)

After deployment, ask: _"Would you like to connect a Dynatrace MCP server for DQL verification? (yes/no)"_

If yes:
1. Use the tenant ID from Step B (don't ask again)
2. **Open the browser** to the token generation page — let the user create a token without leaving the flow:
   - macOS: `open "https://<TENANT_ID>.apps.dynatrace.com/ui/apps/dynatrace.classic.tokens"`
   - Linux: `xdg-open "https://<TENANT_ID>.apps.dynatrace.com/ui/apps/dynatrace.classic.tokens"`
   - Windows: `Start-Process "https://<TENANT_ID>.apps.dynatrace.com/ui/apps/dynatrace.classic.tokens"`
3. Tell the user: _"I've opened the Dynatrace Access Tokens page in your browser. Create a token with scopes: **Read entities, Read settings, Read SLO**. Paste the token here when ready."_
4. **Wait for the user** to paste the token
5. Write the MCP config file in the project root with the user's actual values:

   **For Claude Code** — write `.mcp.json`:
   ```json
   {
     "mcpServers": {
       "dynatrace": {
         "type": "http",
         "url": "https://<TENANT_ID>.apps.dynatrace.com/platform-reserved/mcp-gateway/v0.1/servers/dynatrace-mcp/mcp",
         "headers": {
           "Authorization": "Bearer <TOKEN>"
         }
       }
     }
   }
   ```

   **For Cursor** — write `.cursor/mcp.json` (same structure, without `type` field)

   **For Windsurf** — configure via Windsurf MCP settings

   **For VS Code** — write to user `mcp.json` (File → Preferences → MCP Servers) with `${input:DT_PLATFORM_TOKEN}` prompt pattern, OR use MCP Gallery one-click install:
   1. Open Command Palette → **MCP: Add Server**
   2. Search for **"Dynatrace"** and install
   3. It opens a browser for SSO authentication — zero tokens needed

#### Local MCP Server (Fallback)

If remote MCP is unavailable:
```bash
npx @dynatrace-oss/dynatrace-mcp-server
```
See [@dynatrace-oss/dynatrace-mcp-server](https://www.npmjs.com/package/@dynatrace-oss/dynatrace-mcp-server) for full setup.

---

## Validate, Deploy & Verify

### Pre-Deploy Validation — MANDATORY

**Before deploying, validate EVERY DQL query via MCP `verify_dql`.** This catches syntax errors (like `fieldsRename` with string literals) before the dashboard reaches the tenant.

1. For each of the 15-16 data tiles, extract the DQL query and run it through `verify_dql` (or `execute_dql` for a subset)
2. Fix any errors found — common issues:
   - `fieldsRename` with string literals → remove or use `fieldsAdd`
   - Missing `toDouble()` cast before `makeTimeseries`
   - Timestamps outside 3-hour window
3. **Do NOT deploy until all queries pass validation**

If MCP is not connected, use `dtctl query -f -` with a here-string to validate queries via the CLI:
```powershell
# PowerShell
dtctl query -f - --context sprint -o json @'
data record(field1="value1", field2=123)
| fieldsKeep field1, field2
'@
```
```bash
# Bash
dtctl query -f - --context sprint -o json <<'EOF'
data record(field1="value1", field2=123)
| fieldsKeep field1, field2
EOF
```

### Deploy

1. **Save** the dashboard JSON to the working directory as `<company-slug>-dashboard.json`
2. **Deploy** with DTCTL (uses your current DTCTL context — set with `dtctl config use-context <name>`):
   ```bash
   dtctl apply -f <filename>.json
   ```
   Or specify a context explicitly: `dtctl apply -f <filename>.json --context <context-name>`
3. **Capture the dashboard ID** from the output
4. **Add the ID** back into the JSON file for future updates

### Post-Deploy Verification

5. **Execute** at least one timeseries query and one table query via `execute_dql` to confirm they return actual data (not empty results)
6. **Report the dashboard URL** — get your tenant URL from `dtctl config current-context`:
   ```
   https://<YOUR_TENANT>.apps.dynatrace.com/ui/apps/dynatrace.dashboards/#/dashboard/<DASHBOARD_ID>
   ```

---

## Hard Constraints

- **Mode 1 only: NEVER use `fetch logs` or `fetch events`** — demo mode uses inline `data record()` only. Mode 2 and 3 use real DQL.
- **NEVER use timestamps older than 3 hours** in timeseries queries (Mode 1 only — Mode 2/3 can use any timeframe)
- **ALWAYS use `toDouble()` cast** before `makeTimeseries` aggregation
- **Dashboard grid is 20 units wide**, version must be `21`
- **DTCTL deploys to your current context** — override with `--context <name>` if needed
- **Target: Mode 1 in < 5 min, Mode 2 in < 10 min, Mode 3 in < 20 min, Mode 4 in < 15 min**
- **NEVER use `@dynatrace-sdk/client-classic-environment-v2`** patterns
- **DO NOT generate fewer than 20 tiles** — the dashboard must look rich and complete
- **DO NOT skip the research phase** — dashboards with generic data look fake in CIO meetings
- **NEVER put one tile per row** — use the smart layout variants above. Every row must have 2+ tiles summing to w=20.
- **NEVER use `fieldsRename` with string literals** — `fieldsRename foo = "Bar"` is a DQL syntax error. Keep original field names or use `fieldsAdd` + `fieldsRemove`.
- **ALWAYS validate ALL DQL queries via MCP `verify_dql` BEFORE deploying** — do NOT deploy first and fix later.

---

## Examples of Past Dashboards

1. **Birla Pivot B2B E-Commerce** — Marketplace KPIs (GMV ₹127.43 Cr, 2,847 Orders), channel/region/category mix, platform health (API latency, error rates), supply chain (fulfillment, SLA, payment methods)
2. **Grasim VSF & Chemicals Manufacturing** — Production KPIs (186,420 MT, 87.4% OEE), 12 real plants (Nagda, Vilayat, Kharach, Harihar...), product mix, quality (FPY), sustainability (energy/water/CO2), downtime analysis
3. **Birla Opus Paints E-Commerce + Retail** — Digital revenue (₹48.72 Cr), e-commerce channels (Website, App, Amazon, Flipkart), Imagine Machine tool, 6 paint plants (Panipat 230 MLPA, Cheyyar 206 MLPA...), retail network (8,740 dealers)

---

## Mode 2: Live Tenant Mode — Real Production Data

Use when the customer already has Dynatrace and you want their real metrics, services, hosts, and problems in the dashboard. This is the highest-value mode — the customer sees their own data, their own service names, their own problems.

### Prerequisites

- MCP server connected — verify with `get_environment_info`
- If MCP unavailable: use dtctl context (`dtctl config current-context`)
- dtctl context must point to the customer's tenant

---

### Phase 2.1: Discovery — Understand the Tenant (MANDATORY, < 3 min)

**Never skip discovery.** You must know what's on the tenant before building tiles. Run ALL of these via MCP `execute_dql` (or `dtctl query`):

#### Step 1 — What services exist and are they active?
```dql
timeseries requests = sum(dt.service.request.count), by: {dt.entity.service, service.name}, from: now()-1h
| sort max(requests), desc
| limit 15
```
→ Tells you: top services by traffic, their entity IDs, their names.

#### Step 2 — What hosts/infrastructure exists?
```dql
timeseries cpu = avg(dt.host.cpu.usage), by: {dt.entity.host, host.name}, from: now()-1h
| sort max(cpu), desc
| limit 15
```
→ Tells you: hosts with activity, CPU patterns.

#### Step 3 — Are there open problems right now?
Use MCP tool: `list_problems(status="ACTIVE", timeframe="24h")`
→ Tells you: current incidents to highlight in dashboard.

#### Step 4 — Are there logs?
```dql
fetch logs, from: now()-1h
| summarize count = count(), by: {log.level}
```
→ Tells you: if logs exist and what levels. If count > 0, you can use log-based tiles.

#### Step 5 — What's the error picture?
```dql
timeseries failures = avg(dt.service.request.failure_rate), by: {dt.entity.service, service.name}, from: now()-1h
| sort max(failures), desc
| limit 10
```
→ Tells you: which services have errors — these become the focus tiles.

**Record the results.** You need: service names, entity IDs (`SERVICE-XXXX`, `HOST-XXXX`), metric ranges, whether logs exist, active problems.

---

### Phase 2.2: Build Tiles with Real DQL

Use these validated DQL patterns. Replace Mode 1 `data record()` with these.

#### KPI Tiles (singleValue)

**Total active services:**
```dql
fetch dt.entity.service, from: now()-5m
| filter isNotNull(entity.detected_name)
| summarize count = count()
```

**Overall error rate %:**
```dql
timeseries val = avg(dt.service.request.failure_rate), from: now()-1h
| summarize error_rate = round(avg(arrayAvg(val)), decimals: 2)
```

**P50 response time (ms):**
```dql
timeseries val = avg(dt.service.request.response_time.geometric_mean), from: now()-1h
| summarize avg_ms = round(avg(arrayAvg(val)) / 1000, decimals: 0)
```

**Active problems count:**
```dql
fetch dt.davis.problems, from: now()-24h
| filter status == "OPEN"
| summarize count = count()
```

#### Bar Chart — Service Request Volume
```dql
timeseries requests = sum(dt.service.request.count), by: {dt.entity.service, service.name}, from: now()-3h
| summarize total = sum(arraySum(requests)), by: {service.name}
| sort total, desc
| limit 12
| fieldsKeep service.name, total
```

#### Bar Chart — Host CPU by Host
```dql
timeseries cpu = avg(dt.host.cpu.usage), by: {dt.entity.host, host.name}, from: now()-3h
| summarize avg_cpu = round(avg(arrayAvg(cpu)), decimals: 1), by: {host.name}
| sort avg_cpu, desc
| limit 12
| fieldsKeep host.name, avg_cpu
```

#### Donut — Error Rate by Service
```dql
timeseries failures = avg(dt.service.request.failure_rate), by: {dt.entity.service, service.name}, from: now()-3h
| summarize error_rate = round(avg(arrayAvg(failures)), decimals: 2), by: {service.name}
| sort error_rate, desc
| limit 8
| fieldsKeep service.name, error_rate
```

#### Line Chart — Response Time Trend (timeseries)
```dql
timeseries p50 = avg(dt.service.request.response_time.geometric_mean), by: {dt.entity.service, service.name}, from: now()-3h, interval: 15m
| sort max(p50), desc
| limit 5
```

#### Line Chart — Request Rate Trend (timeseries)
```dql
timeseries requests = sum(dt.service.request.count), by: {dt.entity.service, service.name}, from: now()-3h, interval: 15m
| sort max(requests), desc
| limit 5
```

#### Table — Top Services with RED Metrics
```dql
timeseries req = sum(dt.service.request.count), err = avg(dt.service.request.failure_rate), rt = avg(dt.service.request.response_time.geometric_mean), by: {dt.entity.service, service.name}, from: now()-1h
| summarize requests = round(sum(arraySum(req)), decimals: 0), error_pct = round(avg(arrayAvg(err)), decimals: 2), response_time_ms = round(avg(arrayAvg(rt)) / 1000, decimals: 0), by: {service.name}
| sort requests, desc
| limit 15
| fieldsKeep service.name, requests, error_pct, response_time_ms
```

#### Table — Host Health
```dql
timeseries cpu = avg(dt.host.cpu.usage), mem = avg(dt.host.memory.usage.pct), by: {dt.entity.host, host.name}, from: now()-1h
| summarize avg_cpu = round(avg(arrayAvg(cpu)), decimals: 1), avg_mem = round(avg(arrayAvg(mem)), decimals: 1), by: {host.name}
| sort avg_cpu, desc
| limit 15
| fieldsKeep host.name, avg_cpu, avg_mem
```

#### Table — Recent Problems (live feed)
```dql
fetch dt.davis.problems, from: now()-24h
| filter isNotNull(title)
| sort start_time, desc
| fieldsKeep title, severity, status, start_time, affected_entities
| limit 15
```

#### Table — Error Log Summary
```dql
fetch logs, from: now()-3h
| filter log.level == "ERROR" or log.level == "CRITICAL"
| summarize count = count(), by: {log.source, service.name}
| sort count, desc
| limit 15
| fieldsKeep service.name, log.source, count
```

---

### Phase 2.3: Persona → Metric Focus

| Persona | KPI Tiles | Section 2 | Section 3 | Section 4 |
|---|---|---|---|---|
| **CIO** | Active services, Overall error rate, Avg response time, Open problems | Service request volume (bar), Error rate by service (donut), Response time trend (line), Top services RED table | Host CPU (bar), Host health table, Request rate trend (line), Problem severity (donut) | Recent problems (table), Log errors (table), Availability summary (bar) |
| **SRE** | Error rate %, P50 response time, Active incidents, SLO compliance | Error rate by service (bar), Failure rate trend (line), Top errors table, Request volume donut | Host CPU (bar), Memory usage table, Infra trend (line), Resource pressure donut | Recent problems (table), Recent deployments, Error logs |
| **IT Head** | Host count, Avg CPU %, Avg memory %, Active alerts | CPU by host (bar), Memory by host (bar), CPU trend (line), Host health table | Problem breakdown (donut), Error rate (bar), Response time trend (line), Service health table | Recent problems (table), Log errors, Infrastructure events |
| **App Ops** | Request rate, Error rate %, Avg response time, Service count | Request volume by service (bar), Error distribution (donut), Response time trend (line), RED metrics table | Top slow services (bar), Error rate trend (line), Throughput table, Error severity donut | Recent deployments (table), Problem feed (table), Error logs |
| **Platform Eng** | Service count, Host count, Error rate %, Open problems | Service request volume (bar), Host CPU (bar), Request trend (line), Top services table | Error rate by service (bar), Memory usage table, Error trend (line), Problem donut | Recent problems (table), Deployment events, Log errors |

---

### Phase 2.4: Validation Gate (MANDATORY before deploy)

**Validate EVERY query before building the dashboard JSON:**

1. Run each tile's DQL via `execute_dql`
2. If result has rows → ✅ use it
3. If result is empty → ⚠️ fall back to `data record()` with tile title suffix `" (estimated)"`
4. If DQL errors → fix syntax, re-run

**Never deploy a dashboard with unvalidated queries** — empty tiles destroy the demo.

```
Validation checklist:
□ KPI 1 → non-null value
□ KPI 2 → non-null value
□ KPI 3 → non-null value
□ KPI 4 → non-null value
□ Bar chart tile → >= 3 rows
□ Donut tile → >= 2 rows
□ Line chart → >= 6 data points
□ Table tile → >= 5 rows
□ Problems table → any rows (ok if 0 — means healthy)
```

---

### Phase 2.5: Build & Deploy

Same as Mode 1 Phase 3 (deploy with dtctl), with these differences:
- **All validated tiles use real DQL** — no `data record()`
- **Unvalidated/empty tiles use `data record()` fallback** with `" (estimated)"` in title
- **Default timeframe**: `from: now()-3h` for all queries
- **Dashboard title** should include tenant name and timestamp: `"ServiceName — SRE Live Dashboard (31 May 2026)"`

---

## POC Value Story Dashboards (Mode 2 Extension)

Use during a Dynatrace POC when the customer already has the platform installed. These dashboards don't just show data — they **prove a specific business outcome**. Each value story has a different tile structure, different discovery queries, and different narrative.

**Trigger phrases:**
- "MTTR dashboard", "show incident response improvement"
- "correlation dashboard", "root cause story", "show how DT connects problems"
- "business observability", "tie IT to business", "business impact dashboard"
- "proactive monitoring", "shift left", "catch problems before users"
- "POC value dashboard", "prove value", "value story"

**When triggered:** Use Mode 2 (MCP connected, real data). Run value-story-specific discovery queries first.

---

### Value Story 1: MTTR Improvement

**The story:** "Dynatrace cuts your mean time to resolve incidents by finding root cause automatically — not hours of log searching."

**Discovery queries (run first):**
```dql
// How many problems in last 7 days?
fetch dt.davis.problems, from: now()-7d
| summarize total = count(), open = countIf(status == "OPEN"), by: {severity}
| sort total, desc
```
```dql
// What is the average resolution time?
fetch dt.davis.problems, from: now()-7d
| filter isNotNull(end_time)
| fieldsAdd duration_min = toLong((end_time - start_time) / 1000 / 60)
| summarize avg_mttr = avg(duration_min), max_mttr = max(duration_min), count = count()
```
```dql
// Which services cause the most problems?
fetch dt.davis.problems, from: now()-7d
| filter isNotNull(affected_entities)
| summarize problem_count = count(), by: {affected_entities}
| sort problem_count, desc
| limit 10
```

**Dashboard tile structure (20 tiles):**
```
Tile 1:  Header — "🔧 <Company> — MTTR & Incident Response | Dynatrace POC Value Story"
Tile 2:  KPI — Total problems (7d)
Tile 3:  KPI — Avg MTTR (minutes)
Tile 4:  KPI — % problems auto-resolved by Davis
Tile 5:  KPI — Open problems right now

Tile 6:  Section — "📊 Incident Landscape"
Tile 7:  categoricalBarChart — Problems by severity (CRITICAL/HIGH/MEDIUM) — w=12
Tile 8:  donutChart — Problem root cause category (infra/service/deployment/resource) — w=8
Tile 9:  lineChart — Problem count trend (last 7 days, daily) — w=8
Tile 10: table — Top problem-causing services (service, count, avg MTTR, last seen) — w=12

Tile 11: Section — "⏱️ Resolution Time Analysis"
Tile 12: categoricalBarChart — MTTR by service (which services take longest to resolve) — w=12
Tile 13: table — Longest incidents (title, severity, duration, root cause) — w=8
Tile 14: lineChart — MTTR trend over last 7 days (improving or worsening?) — w=8
Tile 15: donutChart — Problems caught by monitoring vs reported by users — w=12

Tile 16: Section — "🔗 Root Cause Intelligence"
Tile 17: table — Recent problems with Davis root cause evidence — w=7
Tile 18: pieChart — Problem status breakdown (OPEN/CLOSED/RESOLVED) — w=7
Tile 19: categoricalBarChart — Deployments that triggered problems — w=6
Tile 20: table — Full incident feed (last 20 problems, title, severity, start, status, MTTR) — w=20
```

**Narrative to put in Tile 1 markdown:**
```
## 🔧 <Company> — Incident Response | Dynatrace POC
### Mean Time to Resolve — Before vs After Dynatrace

**This dashboard answers: "How fast do we detect, diagnose, and resolve incidents?"**
*Davis AI identifies root cause automatically — no manual log correlation required.*
```

**DQL for key tiles:**

Avg MTTR KPI:
```dql
fetch dt.davis.problems, from: now()-7d
| filter isNotNull(end_time)
| fieldsAdd duration_min = toLong((end_time - start_time) / 1000 / 60)
| summarize avg_mttr = round(avg(duration_min), decimals: 0)
```

MTTR trend (timeseries — use data record for demo fallback since problems don't have uniform timestamps):
```dql
fetch dt.davis.problems, from: now()-7d
| filter isNotNull(end_time)
| fieldsAdd duration_min = toLong((end_time - start_time) / 1000 / 60)
| fieldsAdd day = formatTimestamp(start_time, format: "yyyy-MM-dd")
| summarize avg_mttr = round(avg(duration_min), decimals: 0), by: {day}
| sort day, asc
```

Recent incidents feed:
```dql
fetch dt.davis.problems, from: now()-7d
| sort start_time, desc
| fieldsAdd duration_min = toLong((end_time - start_time) / 1000 / 60)
| fieldsKeep title, severity, status, start_time, duration_min, affected_entities
| limit 20
```

---

### Value Story 2: Correlation & Root Cause

**The story:** "When something breaks, Dynatrace instantly shows you the chain — from the symptom (user sees error) all the way to the root cause (a deployment changed a config on service X which caused a cascade)."

**Discovery queries (run first):**
```dql
// What are the most error-prone services?
timeseries failures = avg(dt.service.request.failure_rate), by: {dt.entity.service, service.name}, from: now()-24h
| summarize avg_failure = round(avg(arrayAvg(failures)), decimals: 2), by: {service.name}
| sort avg_failure, desc
| limit 10
```
```dql
// Any deployment events in last 24h?
fetch events, from: now()-24h
| filter event.type == "CUSTOM_DEPLOYMENT" or event.category == "DEPLOYMENT"
| summarize count = count(), by: {event.name, dt.entity.service}
| sort count, desc
| limit 10
```
```dql
// Correlated log errors at same time as problems
fetch logs, from: now()-3h
| filter log.level == "ERROR" or log.level == "CRITICAL"
| summarize count = count(), by: {service.name, log.source}
| sort count, desc
| limit 15
```

**Dashboard tile structure (20 tiles):**
```
Tile 1:  Header — "🔗 <Company> — Correlation & Root Cause | Dynatrace POC Value Story"
Tile 2:  KPI — Services with errors (24h)
Tile 3:  KPI — Overall error rate %
Tile 4:  KPI — Deployments in last 24h
Tile 5:  KPI — Open problems (potential root causes)

Tile 6:  Section — "🚨 Error Landscape — Where Are Problems?"
Tile 7:  categoricalBarChart — Error rate by service (top offenders) — w=12
Tile 8:  donutChart — Error distribution by type (5xx, timeout, dependency) — w=8
Tile 9:  lineChart — Error rate trend (last 24h, 30min intervals) — w=8
Tile 10: table — Top error services with request count, error count, error % — w=12

Tile 11: Section — "🔄 Deployment → Impact Correlation"
Tile 12: categoricalBarChart — Services with recent deployments (count) — w=12
Tile 13: table — Deployment events (service, version, time, who deployed) — w=8
Tile 14: lineChart — Response time before/after latest deployment (trend) — w=8
Tile 15: donutChart — Problem root cause category (deployment/infra/resource/external) — w=12

Tile 16: Section — "📋 Evidence Chain — Logs, Traces, Problems"
Tile 17: table — Error log summary (service, error message pattern, count) — w=7
Tile 18: pieChart — Log levels distribution (ERROR/WARN/INFO) — w=7
Tile 19: categoricalBarChart — P99 latency by service (where is it slow?) — w=6
Tile 20: table — Recent problems with affected services and root cause evidence — w=20
```

**DQL for key tiles:**

Response time trend (correlation — show spike at deployment time):
```dql
timeseries rt = avg(dt.service.request.response_time.geometric_mean), by: {dt.entity.service, service.name}, from: now()-24h, interval: 30m
| sort max(rt), desc
| limit 5
```

Error rate trend:
```dql
timeseries err = avg(dt.service.request.failure_rate), by: {dt.entity.service, service.name}, from: now()-24h, interval: 30m
| sort max(err), desc
| limit 5
```

Log error patterns:
```dql
fetch logs, from: now()-3h
| filter log.level == "ERROR"
| summarize count = count(), by: {service.name, log.source}
| sort count, desc
| limit 15
| fieldsKeep service.name, log.source, count
```

---

### Value Story 3: Business Observability

**The story:** "IT metrics are meaningless to the business. This dashboard connects your system health directly to business outcomes — when checkout latency spikes, revenue drops. Davis tells you both."

**Discovery queries (run first):**
```dql
// Are there business events / custom metrics?
fetch bizevents, from: now()-24h
| summarize count = count(), by: {event.type}
| sort count, desc
| limit 10
```
```dql
// User session / RUM data?
fetch dt.entity.application
| summarize count = count(), by: {entity.detected_name, dt.entity.application}
| limit 10
```
```dql
// Service request volume (proxy for business activity)
timeseries requests = sum(dt.service.request.count), by: {dt.entity.service, service.name}, from: now()-24h, interval: 1h
| sort max(requests), desc
| limit 5
```

**Dashboard tile structure (20 tiles):**
```
Tile 1:  Header — "💼 <Company> — Business Observability | Dynatrace POC Value Story"
Tile 2:  KPI — Total transactions / requests (24h) — business volume proxy
Tile 3:  KPI — Error rate % — directly impacts business outcomes
Tile 4:  KPI — Avg response time (ms) — user experience proxy
Tile 5:  KPI — Open problems — current business risk

Tile 6:  Section — "📈 Business Activity vs IT Health"
Tile 7:  categoricalBarChart — Request volume by service (business activity by capability) — w=12
Tile 8:  donutChart — Traffic distribution (which services drive most business) — w=8
Tile 9:  lineChart — Request volume + error rate overlay (business activity vs errors) — w=8
Tile 10: table — Top services: requests, errors, response time, business impact — w=12

Tile 11: Section — "🎯 User Experience Impact"
Tile 12: categoricalBarChart — Response time by service (what users feel) — w=12
Tile 13: table — Slowest user-facing endpoints (endpoint, P50, P95, P99) — w=8
Tile 14: lineChart — Response time trend (are users getting faster or slower service?) — w=8
Tile 15: donutChart — Request outcome (success vs errors vs slow) — w=12

Tile 16: Section — "⚡ IT Events → Business Impact"
Tile 17: table — Problems with business-impact language (title, severity, affected users) — w=7
Tile 18: pieChart — Problem severity distribution (CRITICAL/HIGH = revenue risk) — w=7
Tile 19: categoricalBarChart — Error rate by service (revenue-risk ranking) — w=6
Tile 20: table — Event feed: deployments, problems, anomalies with business context — w=20
```

**Key differentiator for this dashboard:**
- Tile titles use business language: "Checkout Service" not "checkout-svc-prod-k8s"
- KPI subtitles explain business impact: "↑ 1ms latency = ↓ 0.5% conversion"
- Section 2 framing: "Business Activity" not "Service Metrics"
- If BizEvents exist → use them for real business KPIs (orders, revenue, sessions)
- If no BizEvents → use service request counts as business activity proxy, label clearly

**BizEvents KPI (if available):**
```dql
fetch bizevents, from: now()-24h
| filter event.type == "com.ecommerce.order" or event.type contains "order" or event.type contains "transaction"
| summarize total = count(), by: {event.type}
| sort total, desc
| limit 1
```

---

### Value Story 4: Proactive Monitoring (Shift Left)

**The story:** "Dynatrace catches 73% of problems before users report them. Here's the evidence from your own environment."

**Discovery queries (run first):**
```dql
// Anomaly events (Davis detected, not user-reported)
fetch events, from: now()-7d
| filter event.category == "RESOURCE_CONTENTION" or event.category == "PERFORMANCE" or event.type == "RESOURCE_CONTENTION_EVENT"
| summarize count = count(), by: {event.type, event.category}
| sort count, desc
```
```dql
// Problems auto-closed vs user-reported
fetch dt.davis.problems, from: now()-7d
| summarize auto_resolved = countIf(root_cause_entity != ""), user_reported = countIf(root_cause_entity == ""), total = count()
```

**Dashboard tile structure (20 tiles):**
```
Tile 1:  Header — "🔮 <Company> — Proactive Monitoring | Dynatrace POC Value Story"
Tile 2:  KPI — Problems detected by Davis AI (7d)
Tile 3:  KPI — % detected before user impact
Tile 4:  KPI — Anomalies detected (7d)
Tile 5:  KPI — Avg detection time (minutes before impact)

Tile 6:  Section — "🤖 Davis AI Detection vs Reactive"
Tile 7:  categoricalBarChart — Problem detection source (Davis AI vs manual/alert vs user report) — w=12
Tile 8:  donutChart — Proactive vs reactive problem resolution — w=8
Tile 9:  lineChart — Anomaly detection trend (7d) — w=8
Tile 10: table — Top auto-detected problems (title, detected time, root cause, severity) — w=12

Tile 11: Section — "📉 Impact Prevention"
Tile 12: categoricalBarChart — Problem categories caught proactively by service — w=12
Tile 13: table — Problems with estimated user impact prevented — w=8
Tile 14: lineChart — Alert noise vs Davis signal (7d trend) — w=8
Tile 15: donutChart — Problem type distribution (performance/availability/error) — w=12

Tile 16: Section — "📋 Evidence of Value"
Tile 17: table — MTTD (mean time to detect) by service — w=7
Tile 18: pieChart — Problem severity distribution — w=7
Tile 19: categoricalBarChart — Services with most proactive detections — w=6
Tile 20: table — Full problem feed with Davis root cause evidence — w=20
```

---

### POC Value Story — Mode Selection Logic

Add these triggers to Mode Selection:

| Trigger | Value Story | Primary Audience |
|---|---|---|
| "MTTR", "incident response", "resolution time", "how fast we fix" | Value Story 1 — MTTR | SRE, IT Head, CIO |
| "correlation", "root cause", "blast radius", "what caused", "deployment impact" | Value Story 2 — Correlation | CTO, App Ops, SRE |
| "business observability", "business impact", "tie IT to business", "revenue impact" | Value Story 3 — Business Obs | CEO, CIO, CTO |
| "proactive", "shift left", "before users", "AI detection", "Davis value" | Value Story 4 — Proactive | CIO, SRE, IT Head |
| "logs", "log management", "log analytics", "log value", "log story", "DQL logs", "grep logs", "log search", "log cost" | Value Story 5 — Log Analytics | App Ops, SRE, CTO, Platform Eng |

**Example prompts:**
```
MTTR improvement POC dashboard — bank customer, MCP connected
Show the correlation value story for a manufacturing customer
Business observability dashboard — e-commerce, real data
Prove proactive monitoring value for a telco CIO
Log analytics value story for a bank — show how DT logs beats ELK
Logs POC dashboard — HDFC Bank, show DQL power vs grep
POC value dashboard — HDFC Bank, focus on MTTR and correlation
```

---

### Value Story 5: Log Analytics & Intelligence

**The story:** "Your engineers spend hours grepping through millions of log lines across 12 different tools. Dynatrace ingests ALL logs automatically, correlates them with metrics and traces, and lets you query them like a database — in seconds. And Davis flags log anomalies before you even search."

**Why this resonates with customers:**
- Log sprawl is universal pain — Splunk cost, ELK maintenance, no correlation with APM
- DT Grail stores logs without pre-indexing (schema on read) — instant query, no pipeline config
- DQL is SQL-like — developers already know how to use it
- Log→trace→metric correlation is automatic — no manual join
- Davis detects log anomaly spikes automatically — no alert rules to write

**Discovery queries (run first):**
```dql
// How much log volume is coming in?
fetch logs, from: now()-1h
| summarize count = count(), by: {log.level}
```
```dql
// Which services generate the most logs?
fetch logs, from: now()-1h
| summarize count = count(), by: {service.name, dt.entity.service}
| sort count, desc
| limit 15
```
```dql
// What are the top error patterns?
fetch logs, from: now()-3h
| filter log.level == "ERROR" or log.level == "CRITICAL"
| summarize count = count(), by: {service.name, content}
| sort count, desc
| limit 10
```
```dql
// Log volume trend — is it growing?
fetch logs, from: now()-24h
| makeTimeseries count = count(), interval: 1h
```
```dql
// Are there log anomalies / unusual patterns?
fetch logs, from: now()-3h
| filter log.level == "WARN" or log.level == "ERROR"
| summarize count = count(), by: {service.name, log.level}
| sort count, desc
| limit 20
```

**Dashboard tile structure (20 tiles):**
```
Tile 1:  Header — "📋 <Company> — Log Analytics & Intelligence | Dynatrace POC Value Story"
Tile 2:  KPI — Total log events (last 24h) — scale of ingestion
Tile 3:  KPI — Error log count (last 24h)
Tile 4:  KPI — Services with ERROR logs
Tile 5:  KPI — Log anomaly events (Davis detected)

Tile 6:  Section — "📊 Log Landscape — Scale & Distribution"
Tile 7:  categoricalBarChart — Log volume by service (top 12 log producers) — w=12
Tile 8:  donutChart — Log level distribution (ERROR/WARN/INFO/DEBUG) — w=8
Tile 9:  lineChart — Log volume trend (last 24h, hourly) — w=8
Tile 10: table — Top services: log count, error %, warn %, last error time — w=12

Tile 11: Section — "🚨 Error Intelligence — Find Issues Instantly"
Tile 12: categoricalBarChart — Error log count by service (who is failing?) — w=12
Tile 13: table — Top error patterns (message, service, count, first/last seen) — w=8
Tile 14: lineChart — Error log rate trend (last 24h — spikes = incidents) — w=8
Tile 15: donutChart — Error distribution by service (who owns the problem?) — w=12

Tile 16: Section — "🔗 Log → Metric → Trace Correlation"
Tile 17: table — Services with correlated errors+problems (log errors that became incidents) — w=7
Tile 18: pieChart — Log sources (k8s/application/infrastructure/custom) — w=7
Tile 19: categoricalBarChart — WARN log count by service (leading indicators) — w=6
Tile 20: table — Recent error log feed (timestamp, service, level, message excerpt) — w=20
```

**Narrative for Tile 1 markdown:**
```markdown
## 📋 <Company> — Log Analytics & Intelligence
### From Log Chaos to Instant Insight | Dynatrace POC

**Before Dynatrace:** Hours searching across ELK/Splunk/CloudWatch with no connection to traces or metrics.
**With Dynatrace:** Query ANY log in seconds with DQL. Every log is automatically linked to the service, trace, and infrastructure that generated it. Davis detects log anomalies before your on-call gets paged.
```

**DQL for key tiles:**

Log volume by service (bar chart):
```dql
fetch logs, from: now()-24h
| summarize count = count(), by: {service.name}
| sort count, desc
| limit 12
| fieldsKeep service.name, count
```

Log level distribution (donut):
```dql
fetch logs, from: now()-24h
| summarize count = count(), by: {log.level}
| sort count, desc
| fieldsKeep log.level, count
```

Log volume trend (line chart — timeseries):
```dql
fetch logs, from: now()-24h
| makeTimeseries count = count(), interval: 1h
```

Error count by service (bar chart):
```dql
fetch logs, from: now()-24h
| filter log.level == "ERROR" or log.level == "CRITICAL"
| summarize error_count = count(), by: {service.name}
| sort error_count, desc
| limit 12
| fieldsKeep service.name, error_count
```

Error rate trend (line chart):
```dql
fetch logs, from: now()-24h
| filter log.level == "ERROR"
| makeTimeseries error_count = count(), interval: 1h
```

Top error patterns table:
```dql
fetch logs, from: now()-3h
| filter log.level == "ERROR" or log.level == "CRITICAL"
| summarize count = count(), first_seen = min(timestamp), last_seen = max(timestamp), by: {service.name, content}
| sort count, desc
| limit 15
| fieldsKeep service.name, content, count, first_seen, last_seen
```

Log→problem correlation (services with both log errors AND open problems):
```dql
fetch dt.davis.problems, from: now()-24h
| filter status == "OPEN"
| fieldsKeep title, affected_entities, severity, start_time
| limit 15
```

Recent error log feed (tile 20):
```dql
fetch logs, from: now()-3h
| filter log.level == "ERROR" or log.level == "CRITICAL"
| sort timestamp, desc
| fieldsKeep timestamp, service.name, log.level, content
| limit 20
```

**Key differentiators to highlight in this dashboard:**
- **Scale tile (KPI 2)**: Show total log volume — 500M+ logs/day is a flex, not a problem with Grail
- **Error patterns table**: This is the "aha moment" — customer sees log content grouped and counted without any pipeline config
- **Trend tile**: Show that DT ingests 24h+ of logs with consistent query performance
- **Tile 17 (correlation)**: The killer feature — same problem, visible in logs AND in problems feed, automatically linked

---

### When to Use

- Customer-facing demo environment that needs to look live
- PoV environment where you want to pre-populate data
- Demo that will be shown multiple times (data persists across sessions)
- Showing trends over hours/days (inline `data record()` can only show the last 3h)

### Phase 3.1: Design the Data Model

First, decide what to ingest based on persona + industry:

| Industry | Ingestion Strategy | Key Metric Names |
|---|---|---|
| **Manufacturing** | Custom metrics via MINT + log events for plant status | `custom.plant.oee`, `custom.plant.production_mt`, `custom.energy.kwh_per_ton` |
| **E-Commerce / SaaS** | BizEvents for orders/GMV + custom metrics for platform | `custom.orders.count`, `custom.revenue.inr`, `custom.api.latency_p99` |
| **Financial Services** | BizEvents for transactions + custom metrics for uptime | `custom.transactions.count`, `custom.fraud.detected`, `custom.stp.rate_pct` |
| **SRE / Platform** | Log events for incidents + custom metrics for SLOs | `custom.slo.budget_remaining`, `custom.deployment.frequency`, `custom.mttr.minutes` |

### Phase 3.2: Generate Synthetic Data

Generate data for the past 24-72 hours with realistic patterns:
- Business hours (9am-6pm) should have higher values than off-hours
- Add slight degradation or "incidents" to make the story interesting
- Include realistic noise (±5-10% variance)

**MINT Metric Ingestion Format** (one line per data point):
```
custom.plant.oee,plant=Nagda,product=VSF value=87.4 1748500000000
custom.plant.oee,plant=Vilayat,product=Caustic value=91.2 1748500000000
custom.plant.production_mt,plant=Nagda value=8420.0 1748500000000
```

**BizEvent Format** (one JSON object per event):
```json
{"event.type": "com.company.order.completed", "event.provider": "demo-data", "orderId": "ORD-12345", "amount": 45230.50, "channel": "App", "region": "Maharashtra", "timestamp": "<ISO8601>"}
```

**Log Event Format**:
```json
{"timestamp": "<ISO8601>", "severity": "INFO", "service": "payment-service", "content": "Payment processed successfully", "amount": 45230.50, "status": "SUCCESS"}
```

### Phase 3.3: Ingest the Data

**Option A: Metrics via curl (MINT v2 API)**
```bash
curl -X POST "https://<TENANT_ID>.apps.dynatrace.com/api/v2/metrics/ingest" \
  -H "Authorization: Api-Token <TOKEN>" \
  -H "Content-Type: text/plain; charset=utf-8" \
  --data-raw "custom.plant.oee,plant=Nagda value=87.4 $(date +%s)000"
```
Token scopes needed: `metrics.ingest`

**Option C: BizEvents via curl**
```bash
curl -X POST "https://<TENANT_ID>.apps.dynatrace.com/platform/classic/environment-v2/bizevents/ingest" \
  -H "Authorization: Api-Token <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '[{"event.type": "com.demo.order", "event.provider": "demo-data", "orderId": "ORD-001", "amount": 45000}]'
```
Token scopes needed: `bizevents.ingest`

**Option D: Logs via curl**
```bash
curl -X POST "https://<TENANT_ID>.apps.dynatrace.com/api/v2/logs/ingest" \
  -H "Authorization: Api-Token <TOKEN>" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{"logEntries": [{"timestamp": "<ISO8601>", "content": "Payment processed", "severity": "INFO"}]}'
```
Token scopes needed: `logs.ingest`

### Phase 3.4: Wait for Data to Appear (< 2 minutes)

After ingestion, verify data is queryable:
```dql
// Verify metrics ingested
timeseries avg(custom.plant.oee), by: {plant}, from: now()-1h, to: now()

// Verify BizEvents ingested
fetch bizevents, from: now()-1h, to: now()
| filter event.type == "com.demo.order"
| summarize count()

// Verify logs ingested
fetch logs, from: now()-1h, to: now()
| filter service == "payment-service"
| summarize count()
```

If queries return data → proceed to Phase 3.5.
If empty after 2 minutes → check token scopes and retry ingestion.

### Phase 3.5: Build Dashboard with Live Queries

Now build the 20-tile dashboard using `timeseries`, `fetch bizevents`, `fetch logs` — pointing to the ingested data keys. Follow the same persona archetype structure but with real DQL.

**Example tile queries for ingested data:**
```dql
// KPI: Average OEE
timeseries oee = avg(custom.plant.oee), from: now()-24h, to: now()
| summarize avg(oee[])

// Bar chart: OEE by plant
timeseries oee = avg(custom.plant.oee), by: {plant}, from: now()-1h, to: now()
| summarize avg(oee[]), by: {plant}
| sort `avg(oee[])` desc

// Line chart: Production trend over 24h
timeseries production = sum(custom.plant.production_mt), by: {plant}, from: now()-24h, to: now(), interval: 1h

// Table: Order summary
fetch bizevents, from: now()-24h, to: now()
| filter event.type == "com.demo.order"
| summarize orders = count(), revenue = sum(amount), by: {channel, region}
| sort revenue desc
```

---

## Mode 4: Interview-First Mode — Discovery-Driven Dashboard

Use when the user doesn't know exactly what they want, or when you're meeting a prospect for the first time. The agent leads the discovery conversation, then builds the right dashboard.

### Interview Flow

**Step 1: Context Capture (ask as a single message)**

```
Let's build the perfect dashboard together. I'll ask a few quick questions:

1. **Who is this for?** (company name + person's role, e.g. "HDFC Bank CIO")
2. **What's the occasion?** (first meeting, renewal, PoV review, board presentation, internal use)
3. **What problem are they trying to solve?** (free text — be as specific as possible)
4. **What should someone feel after seeing this dashboard?** (urgency, confidence, clarity, ROI)
5. **Any constraint on data?** (no Dynatrace yet = Mode 1, has Dynatrace = Mode 2, want live queries = Mode 3)
6. **Anything else I should know?** (competitor they're switching from, recent incident, budget cycle, etc.)
```

**Step 2: Persona + Industry Inference**

From the answers, infer:
- **Persona**: from job title (CIO → CIO, VP Eng → VP Engineering, CISO → CISO)
- **Industry**: from company name (research if needed)
- **Primary Concern**: from problem description (map to concern list)
- **Story Arc**: from "what should they feel" → pick arc below
- **Layout Variant**: from occasion + persona → pick A-E above
- **Data Mode**: from constraint answer → pick Mode 1-3

**Step 3: Story Arc Selection**

| "Should feel..." | Story Arc | Dashboard Emphasis |
|---|---|---|
| Urgency | **The Risk Arc** | Show threats, gaps, vulnerabilities, things going wrong NOW |
| Confidence | **The ROI Arc** | Show achievements, uptime, cost saved, problems resolved |
| Clarity | **The Visibility Arc** | Show full picture — everything in one place, organized |
| ROI / Business Value | **The Business Impact Arc** | Tie every metric to ₹/$ impact, not just technical stats |
| Momentum | **The Growth Arc** | Trending charts going up, milestones achieved, next milestones |
| Control | **The Observability Arc** | Full coverage, no blind spots, every service monitored |

**Step 4: Confirm Before Building**

After inferring, summarize for the user:

```
Here's what I'm building:

📊 **Dashboard**: {Persona} dashboard for {Company}
🏭 **Industry**: {Industry type}
📖 **Story**: {Story Arc name} — "{one-sentence story}"
🎨 **Layout**: {Variant name} ({why this variant})
💾 **Data**: {Mode 1/2/3}
🎯 **Hero metric** (tile 2): {the one number that matters most}

**Sections planned:**
- KPI strip: {list 4 KPIs}
- Section 2: {theme + chart types}
- Section 3: {theme + chart types}
- Section 4: {theme + chart types}

**Shall I build this? Or adjust anything?**
```

**Step 5: Build, validate, and deploy** — same as the applicable Mode workflow above.

### Interview Pro Tips

- If the user mentions a **competitor**: add a subtle benchmark in the KPI strip (e.g. "Industry Avg: 99.5%" alongside their "Uptime: 99.97%")
- If the user mentions a **recent incident**: make the recent-events table show it as "resolved" with timestamps — demonstrates Dynatrace caught and resolved it
- If the user says **"they're skeptical"**: use Mode 1 with very realistic numbers and a Hero layout — the specificity of real company data + strong visual hierarchy overcomes skepticism
- If the user says **"they want to see their own data"**: pivot immediately to Mode 2
- If the user says **"we have a demo environment"**: Mode 3 is perfect — ingest once, show live queries multiple times
