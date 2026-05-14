Generate a Dynatrace dashboard for: $ARGUMENTS

## Instructions

1. Read the full knowledge base from `knowledge/dashboard-generator.md`
2. **Identify the persona** from the request (CIO, CTO, CEO, CISO, SRE, IT Head, App Ops, MLOps, Platform Eng, VP Eng). Default to CIO if not specified.
3. Research the company/business using web search
4. Match persona archetype + industry archetype from the knowledge base
5. Generate a complete 20-tile dashboard JSON with the right metrics for that persona, using inline DQL `data record()` queries
6. Use REAL company data from research (actual plant names, brands, products, regions)
7. Use the persona's language style (e.g., SRE = error budgets/SLOs, CISO = threat landscape/compliance)
8. Save as `<company-slug>-<persona>-dashboard.json`
9. Deploy with: `dtctl apply -f <filename>.json` (uses current DTCTL context)
10. Report the dashboard URL

## Critical Rules
- ALL data uses `data record()` — never `fetch logs` or `fetch events`
- Timeseries timestamps: `now()-165m` through `now()-15m`, interval `15m`
- Always `toDouble()` before `makeTimeseries`
- Dashboard JSON version `21`, grid width `20`
- Generate exactly 20 tiles — no fewer
