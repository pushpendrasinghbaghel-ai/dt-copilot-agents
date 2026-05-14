# Dynatrace Copilot Agents

VS Code custom agents and skills for Dynatrace demo workflows. Clone this repo and run the install script to set up on any machine.

## What's Included

### 🎯 Dashboard Generator Agent
Generates and deploys realistic CIO Command Center dashboards with synthetic data for customer meetings — in under 5 minutes.

**Features:**
- Researches the company/business automatically via web
- Generates 20-tile dashboards with inline DQL `data record()` queries (zero ingestion needed)
- Supports 5 industry archetypes: E-Commerce, Manufacturing, SaaS, Financial Services, Retail
- Deploys directly to Dynatrace tenant via DTCTL CLI
- Uses real company data (plant names, brands, products, regions)

**Usage:** Select `Dashboard Generator` from the `@` agent picker in VS Code chat, then type:
```
Tata Steel manufacturing operations for CIO meeting
```

## Installation

### Quick Install (Windows)
```powershell
.\install.ps1
```

### Manual Install
1. Copy `agents/dashboard-generator.agent.md` → `%APPDATA%\Code\User\prompts\`
2. Copy `skills/dt-demo-dashboard/` → `%USERPROFILE%\.agents\skills\`

### Prerequisites
- VS Code with GitHub Copilot extension
- `dtctl` CLI installed and configured with a Dynatrace context
- `gh` CLI (for GitHub operations, optional)

## File Structure

```
dt-copilot-agents/
├── README.md
├── install.ps1              # Windows installer script
├── agents/
│   └── dashboard-generator.agent.md   # The agent definition
└── skills/
    └── dt-demo-dashboard/
        ├── SKILL.md                    # Core skill with procedures & rules
        └── assets/
            ├── dashboard-skeleton.json # 20-tile grid layout template
            └── sample-data-record.json # Example DQL data record
```

## Updating

After pulling changes, re-run `.\install.ps1` to sync files to their VS Code locations.

## License

Internal use — Dynatrace Labs.
