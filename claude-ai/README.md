# Dynatrace Dashboard Generator — Claude.ai Project Setup

Use this to get the full Dashboard Generator agent inside **Claude.ai** (browser, no install needed).

## Setup (2 minutes)

1. Go to **[claude.ai/projects](https://claude.ai/projects)** → **New Project**
2. Name it: `Dynatrace Dashboard Generator`
3. Click **Set project instructions** → paste the contents of `project-instructions.md` (below)
4. (Optional) Upload `knowledge-base.md` as a **project file** for even richer context
5. Start chatting:

```
CIO dashboard for HDFC Bank
SRE dashboard for Tata Steel
CISO dashboard for meeting today with a fintech prospect
interview me — I have a VP Engineering meeting tomorrow
```

## Why Claude.ai?

- **Zero install** — works in any browser
- **Web search** — Claude can research the company automatically (real plant names, KPIs, products)
- **Full 20-tile dashboard JSON** — copy-paste ready for `dtctl apply -f dashboard.json`
- **Shared project** — share the project URL with your whole team

## Files

| File | Purpose |
|---|---|
| `project-instructions.md` | Paste into Claude.ai Project Instructions |
| `knowledge-base.md` | Upload as project file (full procedure + DQL rules) |

## Deploy the generated dashboard

After Claude generates the JSON, save it and run:
```bash
# Install dtctl (one time)
irm https://raw.githubusercontent.com/dynatrace-oss/dtctl/main/install.ps1 | iex   # Windows
# or
brew install dynatrace-oss/tap/dtctl                                                  # macOS

# Deploy
dtctl apply -f dashboard.json
```
