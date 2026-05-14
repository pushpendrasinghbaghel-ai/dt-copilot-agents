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

## Authentication — Interactive Setup

Before deploying, the agent MUST check and set up prerequisites interactively. Never skip or use placeholders.

### DTCTL Setup

1. Run `dtctl version`. If not found, install it:
   - macOS/Linux: `brew install dynatrace-oss/tap/dtctl` or `curl -fsSL https://raw.githubusercontent.com/dynatrace-oss/dtctl/main/install.sh | sh`
   - Windows: `irm https://raw.githubusercontent.com/dynatrace-oss/dtctl/main/install.ps1 | iex`

2. Run `dtctl config current-context`. If no context or auth expired:
   - **Ask the user**: "What is your Dynatrace tenant ID? (e.g. `abc12345` from `abc12345.apps.dynatrace.com`)"
   - Create context: `dtctl config set-context <name> --environment https://<TENANT_ID>.apps.dynatrace.com`
   - Set active: `dtctl config use-context <name>`
   - Authenticate: `dtctl auth login` (opens browser for SSO)
   - Alternative: `dtctl auth login --token <TOKEN>` if user provides a token

### MCP Setup (optional — for DQL verification)

After deployment, ask: "Would you like to connect a Dynatrace MCP server for DQL verification?"

If yes:
1. Use the tenant ID from above (don't ask again)
2. **Open the browser** to the token page so the user can create one without leaving the flow:
   - macOS: `open "https://<TENANT_ID>.apps.dynatrace.com/ui/apps/dynatrace.classic.tokens"`
   - Linux: `xdg-open "https://<TENANT_ID>.apps.dynatrace.com/ui/apps/dynatrace.classic.tokens"`
   - Windows: `Start-Process "https://<TENANT_ID>.apps.dynatrace.com/ui/apps/dynatrace.classic.tokens"`
3. Tell the user: "I've opened the Dynatrace Access Tokens page in your browser. Create a token with scopes: **Read entities, Read settings, Read SLO**. Paste the token here when ready."
4. **Wait for the user** to paste the token
5. Write `.mcp.json` in the project root with the user's actual tenant ID and token:
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
MCP is optional — deployment works via `dtctl` without it.

## Critical Rules

- ALL data uses inline `data record()` DQL — never `fetch logs` or `fetch events`
- Timeseries timestamps must be within 3 hours of `now()`
- Always `toDouble()` before `makeTimeseries`
- Dashboard version is `21`, grid is 20 units wide
- Deploy with: `dtctl apply -f <file>.json` (uses current DTCTL context)
- Research the company first — generic data looks fake
