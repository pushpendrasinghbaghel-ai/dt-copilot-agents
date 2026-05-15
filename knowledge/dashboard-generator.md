# Dynatrace Demo Dashboard Generator — Knowledge Base

## Purpose
Generate and deploy realistic persona-specific dashboards with synthetic inline data for customer demos. Supports any executive or technical persona — CIO, CTO, CEO, CISO, SRE, IT Head, Application Ops, MLOps, Platform Engineering, VP Engineering, and more. Dashboards render instantly with zero ingestion dependencies.

## When to Use
- Preparing for a customer meeting with any persona (CIO, CTO, CISO, SRE, IT Head, etc.)
- Need a quick demo dashboard with realistic business + technical data
- Building a proof-of-concept for a Dynatrace pitch
- Creating industry-specific or role-specific dashboards
- Demonstrating Dynatrace value to different stakeholders in the same organization

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

5. **Layout — CRITICAL: Use this layout grid.** The grid is 20 units wide. Tiles MUST be placed side-by-side to use screen real estate well. Use **content-aware widths** — bar charts and tables get more space, donuts and pies get less.

```json
"layouts": {
  "0": {
    "content": {
      "1":  {"h":2,"w":20,"x":0,"y":0},
      "2":  {"h":4,"w":5,"x":0,"y":2},
      "3":  {"h":4,"w":5,"x":5,"y":2},
      "4":  {"h":4,"w":5,"x":10,"y":2},
      "5":  {"h":4,"w":5,"x":15,"y":2},
      "6":  {"h":1,"w":20,"x":0,"y":6},
      "7":  {"h":7,"w":12,"x":0,"y":7},
      "8":  {"h":7,"w":8,"x":12,"y":7},
      "9":  {"h":7,"w":8,"x":0,"y":14},
      "10": {"h":7,"w":12,"x":8,"y":14},
      "11": {"h":1,"w":20,"x":0,"y":21},
      "12": {"h":7,"w":12,"x":0,"y":22},
      "13": {"h":7,"w":8,"x":12,"y":22},
      "14": {"h":7,"w":8,"x":0,"y":29},
      "15": {"h":7,"w":12,"x":8,"y":29},
      "16": {"h":1,"w":20,"x":0,"y":36},
      "17": {"h":7,"w":7,"x":0,"y":37},
      "18": {"h":7,"w":7,"x":7,"y":37},
      "19": {"h":7,"w":6,"x":14,"y":37},
      "20": {"h":8,"w":20,"x":0,"y":44}
    },
    "type": "grid"
  }
}
```

**Layout rules:**
- Row 1 (y=0): Full-width header (w=20)
- Row 2 (y=2): 4 KPI cards side-by-side (w=5 each, x=0/5/10/15)
- Sections 2-3: **Asymmetric 2-column layout** — alternate wider/narrower to match content:
  - Row with bar chart (w=12) + donut/pie (w=8)
  - Row with line/area chart (w=8) + table (w=12)
  - Alternates wide-left/wide-right for visual variety
- Section 4: 3-column layout (w=7, w=7, w=6)
- Bottom: Full-width events table (w=20)

**Content-aware width guide (grid = 20 units):**

| Tile Content | Recommended Width | Why |
|---|---|---|
| `categoricalBarChart` | **w=12** (wide) | Long category labels need horizontal space |
| `table` (multi-column) | **w=12** (wide) | Columns need room; avoids horizontal scroll |
| `donutChart` / `pieChart` | **w=8** (narrow) | Circular charts are compact; labels fit in legend |
| `lineChart` / `areaChart` | **w=8–12** | Time axis is readable at w=8; use w=12 if many series |
| `singleValue` (KPI) | **w=5** | 4-across in KPI strip |
| `markdown` (section header) | **w=20** | Full-width divider |

**Pair tiles so widths sum to 20 in each row:**
- Bar chart (w=12) + Donut (w=8) ✅
- Table (w=12) + Pie (w=8) ✅
- Line chart (w=8) + Table (w=12) ✅
- Bar chart (w=12) + Line chart (w=8) ✅
- Two tables (w=10 + w=10) ✅
- Three tiles (w=7 + w=7 + w=6) ✅

**❌ BAD LAYOUT — NEVER DO THIS:**
```json
// WRONG: Every tile on its own row = wasted space, ugly, unprofessional
"7":  {"h":7,"w":20,"x":0,"y":7},
"8":  {"h":7,"w":20,"x":0,"y":14},
"9":  {"h":7,"w":20,"x":0,"y":21},
"10": {"h":7,"w":20,"x":0,"y":28}
```

**Post-generation layout check — verify before saving:**
1. ✅ KPI tiles: 4 tiles at w=5 (x=0/5/10/15)
2. ✅ Section tiles: every row has 2+ tiles, widths sum to 20
3. ✅ NO data tile has w=20 (only markdown headers and the bottom events table)
4. ✅ Adjacent tiles don't overlap (x + w of left tile = x of right tile)

6. **ALL queries use `data record(...)` inline DQL** — NEVER use `fetch logs`, `fetch events`, or any data source that requires ingestion.

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
      "0": {
        "content": { "... tile positions (see grid above) ..." },
        "type": "grid"
      }
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

- **NEVER use `fetch logs` or `fetch events`** — demo dashboards use inline `data record()` only
- **NEVER use timestamps older than 3 hours** in timeseries queries
- **ALWAYS use `toDouble()` cast** before `makeTimeseries` aggregation
- **Dashboard grid is 20 units wide**, version must be `21`
- **DTCTL deploys to your current context** — override with `--context <name>` if needed
- **Target: complete dashboard in under 5 minutes** from request to deployed URL
- **NEVER use `@dynatrace-sdk/client-classic-environment-v2`** patterns
- **DO NOT generate fewer than 20 tiles** — the dashboard must look rich and complete
- **DO NOT skip the research phase** — dashboards with generic data look fake in CIO meetings
- **NEVER put one tile per row** — use the layout grid from above. KPIs go 4-across (w=5), charts go 2-across with asymmetric widths (w=12+8 or w=8+12), section 4 goes 3-across (w=7+7+6). Bar charts and tables get w=12, donuts and pies get w=8. Verify every row has 2+ tiles and widths sum to 20.
- **NEVER use `fieldsRename` with string literals** — `fieldsRename foo = "Bar"` is a DQL syntax error. Keep original field names or use `fieldsAdd` + `fieldsRemove`.
- **ALWAYS validate ALL DQL queries via MCP `verify_dql` BEFORE deploying** — do NOT deploy first and fix later. Every data tile query must pass verification.

---

## Examples of Past Dashboards

1. **Birla Pivot B2B E-Commerce** — Marketplace KPIs (GMV ₹127.43 Cr, 2,847 Orders), channel/region/category mix, platform health (API latency, error rates), supply chain (fulfillment, SLA, payment methods)
2. **Grasim VSF & Chemicals Manufacturing** — Production KPIs (186,420 MT, 87.4% OEE), 12 real plants (Nagda, Vilayat, Kharach, Harihar...), product mix, quality (FPY), sustainability (energy/water/CO2), downtime analysis
3. **Birla Opus Paints E-Commerce + Retail** — Digital revenue (₹48.72 Cr), e-commerce channels (Website, App, Amazon, Flipkart), Imagine Machine tool, 6 paint plants (Panipat 230 MLPA, Cheyyar 206 MLPA...), retail network (8,740 dealers)
