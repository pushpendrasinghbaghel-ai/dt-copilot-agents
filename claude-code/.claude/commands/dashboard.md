Generate a Dynatrace CIO Command Center dashboard for: $ARGUMENTS

## Instructions

1. Read the full knowledge base from `knowledge/dashboard-generator.md`
2. Research the company/business using web search
3. Determine the dashboard archetype (E-Commerce, Manufacturing, SaaS, Financial Services, Retail)
4. Generate a complete 20-tile dashboard JSON with inline DQL `data record()` queries
5. Use REAL company data from research (actual plant names, brands, products, regions)
6. Save as `<company-slug>-dashboard.json`
7. Deploy with: `dtctl apply -f <filename>.json --context sprint`
8. Report the dashboard URL

## Critical Rules
- ALL data uses `data record()` — never `fetch logs` or `fetch events`
- Timeseries timestamps: `now()-165m` through `now()-15m`, interval `15m`
- Always `toDouble()` before `makeTimeseries`
- Dashboard JSON version `21`, grid width `20`
- Generate exactly 20 tiles — no fewer
