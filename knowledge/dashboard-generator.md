# Dynatrace Demo Dashboard Generator — Knowledge Base

## Purpose
Generate and deploy realistic CIO Command Center dashboards with synthetic inline data for customer demos. Dashboards render instantly with zero ingestion dependencies.

## When to Use
- Preparing for a customer CIO/CTO/VP-Eng meeting
- Need a quick demo dashboard with realistic business data
- Building a proof-of-concept for a Dynatrace pitch
- Creating industry-specific dashboards (manufacturing, e-commerce, retail, SaaS, fintech, etc.)

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

5. **Layout** — Use the standard 20-wide grid:

```json
{
  "1":  {"h":2,"w":20,"x":0,"y":0},
  "2":  {"h":4,"w":5,"x":0,"y":2},
  "3":  {"h":4,"w":5,"x":5,"y":2},
  "4":  {"h":4,"w":5,"x":10,"y":2},
  "5":  {"h":4,"w":5,"x":15,"y":2},
  "6":  {"h":1,"w":20,"x":0,"y":6},
  "7":  {"h":7,"w":10,"x":0,"y":7},
  "8":  {"h":7,"w":10,"x":10,"y":7},
  "9":  {"h":7,"w":10,"x":0,"y":14},
  "10": {"h":7,"w":10,"x":10,"y":14},
  "11": {"h":1,"w":20,"x":0,"y":21},
  "12": {"h":7,"w":10,"x":0,"y":22},
  "13": {"h":7,"w":10,"x":10,"y":22},
  "14": {"h":7,"w":10,"x":0,"y":29},
  "15": {"h":7,"w":10,"x":10,"y":29},
  "16": {"h":1,"w":20,"x":0,"y":36},
  "17": {"h":7,"w":7,"x":0,"y":37},
  "18": {"h":7,"w":7,"x":7,"y":37},
  "19": {"h":7,"w":6,"x":14,"y":37},
  "20": {"h":8,"w":20,"x":0,"y":44}
}
```

6. **ALL queries use `data record(...)` inline DQL** — NEVER use `fetch logs`, `fetch events`, or any data source that requires ingestion.

---

## DQL Data Rules — CRITICAL

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

## Deploy & Verify

1. **Save** the dashboard JSON to the working directory as `<company-slug>-dashboard.json`
2. **Deploy** with DTCTL:
   ```bash
   dtctl apply -f <filename>.json --context sprint
   ```
3. **Capture the dashboard ID** from the output
4. **Add the ID** back into the JSON file for future updates
5. **Verify** at least one timeseries query returns data
6. **Report the dashboard URL**:
   ```
   https://<tenant>.sprint.apps.dynatracelabs.com/ui/apps/dynatrace.dashboards/#/dashboard/<DASHBOARD_ID>
   ```

---

## Hard Constraints

- **NEVER use `fetch logs` or `fetch events`** — sprint tenant has no ingested data for demos
- **NEVER use timestamps older than 3 hours** in timeseries queries
- **ALWAYS use `toDouble()` cast** before `makeTimeseries` aggregation
- **Dashboard grid is 20 units wide**, version must be `21`
- **DTCTL context is `sprint`** — deploy with `--context sprint`
- **Target: complete dashboard in under 5 minutes** from request to deployed URL
- **NEVER use `@dynatrace-sdk/client-classic-environment-v2`** patterns
- **DO NOT generate fewer than 20 tiles** — the dashboard must look rich and complete
- **DO NOT skip the research phase** — dashboards with generic data look fake in CIO meetings

---

## Examples of Past Dashboards

1. **Birla Pivot B2B E-Commerce** — Marketplace KPIs (GMV ₹127.43 Cr, 2,847 Orders), channel/region/category mix, platform health (API latency, error rates), supply chain (fulfillment, SLA, payment methods)
2. **Grasim VSF & Chemicals Manufacturing** — Production KPIs (186,420 MT, 87.4% OEE), 12 real plants (Nagda, Vilayat, Kharach, Harihar...), product mix, quality (FPY), sustainability (energy/water/CO2), downtime analysis
3. **Birla Opus Paints E-Commerce + Retail** — Digital revenue (₹48.72 Cr), e-commerce channels (Website, App, Amazon, Flipkart), Imagine Machine tool, 6 paint plants (Panipat 230 MLPA, Cheyyar 206 MLPA...), retail network (8,740 dealers)
