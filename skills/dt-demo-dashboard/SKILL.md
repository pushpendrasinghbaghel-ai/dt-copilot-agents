---
name: dt-demo-dashboard
description: 'Generate and deploy Dynatrace demo dashboards for any persona (CIO, CTO, CEO, CISO, SRE, IT Head, App Ops, MLOps, Platform Eng, VP Eng) with realistic synthetic data. Use when: creating CIO dashboards, SRE dashboards, CISO dashboards, generating demo data, building persona-specific dashboards, customer demo, deploy dashboard to tenant, DTCTL dashboard.'
argument-hint: 'Persona + company, e.g. "SRE dashboard for Tata Steel" or "CISO dashboard for HDFC Bank"'
---

# Dynatrace Demo Dashboard Generator

Generate and deploy realistic persona-specific dashboards with synthetic inline data for customer demos. Supports 10+ personas (CIO, CTO, CEO, CISO, SRE, IT Head, App Ops, MLOps, Platform Eng, VP Eng). Dashboards render instantly with zero ingestion dependencies.

The full persona archetype reference, DQL rules, layout grid, and visualization guide are in `knowledge/dashboard-generator.md`. Read that file for the complete procedure.

## When to Use
- Preparing for a customer CIO/CTO/VP-Eng meeting
- Need a quick demo dashboard with realistic business data
- Building a proof-of-concept for a Dynatrace pitch
- Creating industry-specific dashboards (manufacturing, e-commerce, retail, SaaS, fintech, etc.)

## Procedure

### Phase 1: Research (< 2 minutes)

1. **Identify the company and business line** from user input
2. **Web research** the company using `fetch_webpage`:
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

5. **MANDATORY LAYOUT — COPY THIS GRID VERBATIM.** Do NOT generate your own layout. Do NOT use w=10+10 or w=20 on data tiles.

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

**Content-aware width rules (grid = 20 units):**
- `categoricalBarChart` / `table` → **w=12** (needs label/column space)
- `donutChart` / `pieChart` → **w=8** (compact circular charts)
- `lineChart` / `areaChart` → **w=8–12** (flexible)
- Pair widths to sum to 20: bar(12)+donut(8), chart(8)+table(12)
- Alternate wide-left/wide-right across rows for visual variety
**FORBIDDEN widths (if you see these, the layout is WRONG):**
- w=20 on any data tile (tiles 2-5, 7-10, 12-15, 17-19) = WRONG
- w=10+10 on any row = WRONG (too symmetric, looks boring)
- Any tile alone on a row (except headers and tile 20) = WRONG
- **Post-check: verify tiles 7+8=12+8, 9+10=8+12, 12+13=12+8, 14+15=8+12, 17+18+19=7+7+6**

6. **ALL queries use `data record(...)` inline DQL** — NEVER use `fetch logs`, `fetch events`, or any data source that requires ingestion.

### DQL Data Rules — CRITICAL

#### fieldsRename — NEVER use string literals

`fieldsRename` parameters must be **field identifiers**, NOT quoted strings.

```dql
// ❌ WRONG — causes DQL syntax error
| fieldsRename subsidiary = "Subsidiary", revenue = "Revenue"

// ✅ RIGHT — keep original field names (recommended for demo dashboards)
| fieldsKeep subsidiary, revenue, growth, customers
```

#### Static tiles (singleValue, bar, donut, pie, table):
```dql
data record(field1="value1", field2=123),
     record(field1="value2", field2=456)
| sort field2 desc
| fieldsKeep field1, field2
```

#### Time-series tiles (lineChart, areaChart) — MUST follow these rules:
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

### Data Realism Rules

- **Use REAL company data**: actual plant names, product names, brand names, city names, capacity figures from research
- **Numbers must be internally consistent**: totals should roughly match sum of breakdowns
- **Regional distribution should be weighted realistically** (e.g., Maharashtra > Rajasthan for Indian businesses)
- **Include 8-12 categories/regions** for bar charts for visual richness
- **Include 10-15 rows** for the "recent events" table at the bottom
- **Recent events table should have realistic timestamps**: `now()-3m`, `now()-8m`, `now()-15m`, etc.
- **Use industry-standard terminology** (OEE for manufacturing, GMV for marketplace, MRR for SaaS)

### Visualization Types Reference

| Tile Type | visualization value | Best for |
|---|---|---|
| Single number | `singleValue` | KPI headlines |
| Vertical bars | `categoricalBarChart` | Comparisons across categories |
| Donut | `donutChart` | Part-of-whole (revenue mix, category share) |
| Pie | `pieChart` | Status breakdown (fulfillment, incidents) |
| Line | `lineChart` | Trends over time (response time, production rate) |
| Stacked area | `areaChart` | Volume over time (sessions, requests) |
| Data table | `table` | Multi-column detail (top-N, recent events) |

### singleValue Threshold Colors

```json
// Green when high is good (uptime, OEE)
[{"color":"#dc172a","value":0},{"color":"#f5d565","value":80},{"color":"#6bcb77","value":95}]

// Blue for neutral metrics (revenue, count)
[{"color":"#14a8f5","value":0}]

// Inverted — green when LOW is good (error rate, latency)
[{"color":"#6bcb77","value":0},{"color":"#f5d565","value":50},{"color":"#dc172a","value":80}]
```

### Phase 2.5: Validate ALL DQL Queries (MANDATORY — before deploy)

6b. **Validate EVERY data tile's DQL query** using MCP `verify_dql` before deploying:
   - Run each of the 15-16 data tile queries through `verify_dql` (batch 4-5 at a time)
   - Common errors to catch: `fieldsRename` with string literals, missing `toDouble()`, timestamps > 3h
   - **Fix ALL errors before proceeding to deploy**
   - Execute at least 2 queries (one table, one timeseries) via `execute_dql` to confirm data return
   - If MCP unavailable, validate via `dtctl query -f -` with here-strings

### Phase 3: Deploy (< 1 minute)

7. **Check dtctl is installed** (`dtctl version`). If not, install it:
   - macOS/Linux: `brew install dynatrace-oss/tap/dtctl` or `curl -fsSL https://raw.githubusercontent.com/dynatrace-oss/dtctl/main/install.sh | sh`
   - Windows: `irm https://raw.githubusercontent.com/dynatrace-oss/dtctl/main/install.ps1 | iex`
8. **Check context** (`dtctl config current-context`). If no context or auth expired:
   - **Ask the user** for their Dynatrace tenant ID (e.g. `abc12345` from `abc12345.apps.dynatrace.com`)
   - Create: `dtctl config set-context <name> --environment https://<TENANT_ID>.apps.dynatrace.com`
   - Activate: `dtctl config use-context <name>`
   - Auth: `dtctl auth login` (opens browser for SSO) — or `dtctl auth login --token <TOKEN>` if user provides one
9. **Save** the dashboard JSON to the working directory
10. **Deploy**: `dtctl apply -f <filename>.json`
11. **Capture the dashboard ID** from the output
12. **Add the ID** back into the JSON file for future updates
13. **Verify** — if MCP is connected, run a timeseries query via `execute_dql`. If not connected, **ask the user**: "Would you like to set up a Dynatrace MCP server for DQL verification?" If yes: **open the browser** to the token page (`https://<TENANT_ID>.apps.dynatrace.com/ui/apps/dynatrace.classic.tokens`) using OS-appropriate command (`open`/`xdg-open`/`Start-Process`), tell the user "I've opened the token page — create a token with scopes: Read entities, Read settings, Read SLO. Paste it here.", wait for the token, then write `.mcp.json` with actual tenant ID and token. If no, skip — inline queries are self-contained.
14. **Report the dashboard URL**:
    ```
    https://<TENANT_ID>.apps.dynatrace.com/ui/apps/dynatrace.dashboards/#/dashboard/<DASHBOARD_ID>
    ```

### Phase 4: Summary

13. Present a summary table to the user:

| Section | Tiles |
|---|---|
| **KPI Strip** | List the 4 KPI tiles with values |
| **Section 2** | List the 4 chart/table tiles |
| **Section 3** | List the 4 chart/table tiles |
| **Section 4** | List the 4 chart/table tiles + recent events |

## Key Constraints

- **NEVER use `fetch logs` or `fetch events`** — demo dashboards use inline `data record()` only
- **NEVER use timestamps older than 3 hours** in timeseries queries
- **ALWAYS use `toDouble()` cast** before `makeTimeseries` aggregation
- **NEVER use `fieldsRename` with string literals** — `fieldsRename foo = "Bar"` is invalid DQL. Keep original field names.
- **ALWAYS validate ALL DQL queries via MCP `verify_dql` BEFORE deploying** — do NOT deploy broken queries
- **NEVER put one tile per row** — use asymmetric widths: bar charts/tables w=12, donuts/pies w=8. Every row must have 2+ tiles summing to w=20.
- **Dashboard grid is 20 units wide**, version must be `21`
- **DTCTL deploys to your current context** — override with `--context <name>` if needed
- **Target: complete dashboard in under 5 minutes** from user request to deployed URL

## Examples of Past Dashboards

These dashboards were successfully created and deployed:

1. **Birla Pivot B2B E-Commerce** — Marketplace KPIs (GMV, Orders), channel/region/category mix, platform health (API latency, error rates), supply chain (fulfillment, SLA, payment methods)
2. **Grasim VSF & Chemicals Manufacturing** — Production KPIs (MT, OEE, Capacity), plant-wise output, product mix, quality (FPY), sustainability (energy/water/CO2), downtime analysis, maintenance schedules, raw material stock
3. **Birla Opus Paints E-Commerce + Retail** — Digital revenue, e-commerce channels (Website, App, Amazon, Flipkart), digital tools (Imagine Machine, Paint Calculator), retail network (dealers, stores, painters), PaintCraft services, plant operations
