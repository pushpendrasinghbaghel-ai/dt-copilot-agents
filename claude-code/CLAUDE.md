# Dynatrace Demo Dashboard Generator

You have access to a dashboard generation workflow for creating persona-specific dashboards with synthetic data.

## Supported Personas
CIO, CTO, CEO, CISO, SRE, IT Head, Application Ops, MLOps, Platform Engineering, VP Engineering — and any custom persona.

## Available Commands

Use `/dashboard` slash command to generate a dashboard. Examples:
```
/dashboard SRE dashboard for Tata Steel
/dashboard CISO dashboard for HDFC Bank
/dashboard MLOps dashboard for Infosys
/dashboard CEO dashboard for Reliance Retail
```
If no persona is specified, defaults to CIO.

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
- Deploy with: `dtctl apply -f <file>.json` (uses current DTCTL context)
- Research the company first — generic data looks fake
