# Dynatrace Demo Dashboard Generator

You have access to a dashboard generation workflow for creating CIO Command Center dashboards with synthetic data.

## Available Commands

Use `/dashboard` slash command to generate a dashboard. Example:
```
/dashboard Tata Steel manufacturing operations
```

## Knowledge Base

Read the full procedure and rules from `knowledge/dashboard-generator.md` before generating any dashboard. This file contains:
- 5 industry archetypes (E-Commerce, Manufacturing, SaaS, Financial Services, Retail)
- 20-tile layout grid with exact positions
- DQL `data record()` syntax and rules
- Timeseries constraints (3-hour window, toDouble() cast, 15m intervals)
- Dashboard JSON schema (version 21, 20-unit grid)
- DTCTL deployment commands
- Data realism rules

## Critical Rules

- ALL data uses inline `data record()` DQL — never `fetch logs` or `fetch events`
- Timeseries timestamps must be within 3 hours of `now()`
- Always `toDouble()` before `makeTimeseries`
- Dashboard version is `21`, grid is 20 units wide
- Deploy with: `dtctl apply -f <file>.json --context sprint`
- Research the company first — generic data looks fake
