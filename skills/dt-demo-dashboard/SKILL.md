---
name: dt-demo-dashboard
description: 'Generate and deploy Dynatrace dashboards in 4 modes: (1) Demo Mode — instant synthetic dashboards for pre-sales meetings with meeting-specific story arcs; (2) Live Tenant Mode — dashboards using real metrics/logs from the customer tenant; (3) Synthetic Ingest Mode — ingest realistic data via API then query it live for persistent demos; (4) Interview-First Mode — agent interviews the user to discover the right dashboard. Smart layouts (Panorama/Hero/Dense/Trend-First) auto-adjust to persona and meeting goal. Supports CIO, CTO, CEO, CISO, SRE, IT Head, App Ops, MLOps, Platform Eng, VP Eng.'
argument-hint: 'Mode + persona + company, e.g. "SRE dashboard for Tata Steel", "real data CIO dashboard for HDFC Bank", "interview me for a CISO dashboard", "ingest data for a manufacturing dashboard"'
---

# Dynatrace Dashboard Generator — 4 Modes

Generate and deploy persona-specific Dynatrace dashboards for any scenario — pre-sales demos, live production data, synthetic data ingestion, or guided discovery interviews. Full procedure is in `knowledge/dashboard-generator.md`.

## When to Use
- Preparing for a customer CIO/CTO/CISO/SRE meeting (Mode 1 — instant demo with company research)
- Showing a customer their own live Dynatrace data in a persona view (Mode 2 — real data)
- Building a persistent demo environment with live queries (Mode 3 — synthetic ingest)
- User doesn't know what they want and needs guided discovery (Mode 4 — interview first)
- Any industry: manufacturing, e-commerce, retail, SaaS, fintech, healthcare, telco

## Procedure

### Step 0: Detect Mode

Read `knowledge/dashboard-generator.md` → **Mode Selection** section. Identify which of 4 modes applies:

| Mode | Signal | Action |
|---|---|---|
| **1. Demo** | No tenant context, "pitch", "meeting", "prospect" | Use `data record()` inline DQL |
| **2. Live Tenant** | MCP connected or "real data", "their Dynatrace" | Discover entities → use real DQL |
| **3. Ingest** | "ingest", "persistent demo", "synthetic but live" | Generate data → ingest via API → real queries |
| **4. Interview** | "interview me", "ask questions", "help me figure out" | Run full discovery interview first |

**If MCP is connected and mode is ambiguous** → suggest Mode 2 ("I can see you're connected to a Dynatrace tenant — want me to use your real data?").

### Step 1: Research + Interview (all modes except Mode 4 which does interview before research)

1. Web research the company (official website, annual reports) for real names, numbers, locations
2. Determine persona + industry archetype from knowledge base
3. For Mode 1/2/3: **simple prompt → build immediately** (no gate). Only show the 3-choice gate if the prompt contains "meeting", "customize", "specific", or similar signals.
4. For Mode 4: run full 6-question discovery interview BEFORE research

### Step 2: Smart Layout Selection

Choose layout variant based on persona + meeting goal (see `knowledge/dashboard-generator.md` → Smart Layout):
- Executive/C-suite → **Variant A: Panorama** (tall KPIs, wide bar charts)
- Standard/balanced → **Variant B: Standard** (default)
- SRE/Ops/Technical → **Variant C: Dense** (compact, information-rich)
- One critical message → **Variant D: Hero** (tile 2 = hero KPI, double width/height)
- Trend story → **Variant E: Trend-First** (time-series tiles get more width)

### Step 3: Build Dashboard JSON (20 tiles)

Follow the tile structure from knowledge base. Data source depends on mode:
- Mode 1: `data record(...)` for all tiles
- Mode 2: real DQL (`timeseries`, `fetch logs`, `fetch spans`, `smartscapeNodes`)
- Mode 3: `timeseries custom.*` or `fetch bizevents` pointing to ingested data

### Step 4: Validate ALL DQL Queries

Run every data tile query through MCP `verify_dql` (or `dtctl query`) before deploying. Fix all errors.

### Step 5: Deploy + Report

```bash
dtctl apply -f <company-slug>-dashboard.json
```
Report the URL: `https://<TENANT>.apps.dynatrace.com/ui/apps/dynatrace.dashboards/#/dashboard/<ID>`

## Key Constraints (full list in knowledge base)

- Mode 1: NEVER `fetch logs/events` — use `data record()` only
- Mode 2/3: USE real DQL — `fetch logs`, `timeseries`, `fetch bizevents`
- NEVER timestamps > 3h in Mode 1 timeseries
- NEVER `fieldsRename` with string literals
- ALWAYS `toDouble()` before `makeTimeseries`
- Dashboard grid = 20 wide, version = 21
- ALWAYS validate DQL before deploying

## Examples of Past Dashboards

1. **Birla Pivot B2B E-Commerce** (Mode 1, CIO, Variant B) — GMV, Orders, channel mix, API health, supply chain
2. **Grasim VSF Manufacturing** (Mode 1, CIO, Variant B) — OEE, 12 real plants, sustainability, downtime
3. **Birla Opus Paints** (Mode 1, CIO, Variant B) — Digital revenue, 4 e-commerce channels, retail network

## Version Check (run once per session)

**Installed version: __INSTALLED_VERSION__**

At the start of your FIRST response in any session:
1. Run: `npm view dt-copilot-agents version` (silent, < 2s)
2. Compare the result to the installed version above
3. If a newer version is available, include this banner at the TOP of your response **before** any other content:

```
┌─────────────────────────────────────────────────────────────┐
│  🚀 Update available: __INSTALLED_VERSION__ → <latest>                │
│  Run: npx dt-copilot-agents@latest install                  │
│  New features and dashboard layouts are waiting for you!    │
└─────────────────────────────────────────────────────────────┘
```

4. If the check fails (no network / npm unavailable) — silently skip, do not mention it.
5. Only check ONCE per session — do not repeat the banner on subsequent turns.
