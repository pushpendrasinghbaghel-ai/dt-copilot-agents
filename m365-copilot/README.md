# Microsoft 365 Copilot — Dashboard Generator

## Integration Options

| Option | Complexity | DTCTL Deploy? | Best For |
|---|---|---|---|
| **Declarative Agent** (Teams) | Medium | Via Power Automate | Teams-based workflow |
| **Copilot Studio** | Low | Via Power Automate | No-code setup |
| **SharePoint + Copilot Chat** | Easiest | No (manual deploy) | Quick & dirty |

---

## Option A: Declarative Agent (Recommended)

A Declarative Agent runs inside Microsoft Teams and M365 Copilot. Users invoke it via `@Dashboard Generator` in Teams chat.

### Prerequisites
- Microsoft 365 E3/E5 with Copilot license
- Teams Toolkit for VS Code (or Teams Admin Center)
- Optional: Power Automate Premium for DTCTL deployment action

### Setup

1. **Create a new Teams app** using Teams Toolkit in VS Code:
   ```
   Teams Toolkit → Create New App → Copilot Agent → Declarative Agent
   ```

2. **Replace the generated files** with the ones in this folder:
   - `declarativeAgent.json` → `appPackage/declarativeAgent.json`
   - `instruction.md` → `appPackage/instruction.md`

3. **Upload the knowledge file**:
   - Copy `knowledge/dashboard-generator.md` to a SharePoint site
   - Add the SharePoint URL to `declarativeAgent.json` under `capabilities.OneDriveAndSharePoint`
   - Or use the inline instructions in `instruction.md` (already included)

4. **Deploy** via Teams Toolkit → Provision → Deploy → Publish

5. **Usage** in Teams chat:
   ```
   @Dashboard Generator SRE dashboard for Tata Steel manufacturing
   @Dashboard Generator CISO dashboard for HDFC Bank
   ```

### Adding DTCTL Deployment (Optional)

To enable auto-deployment, create a Power Automate flow:

1. **Create an HTTP-triggered Power Automate flow**:
   - Trigger: "When an HTTP request is received"
   - Action: Run a script on a VM/container that has `dtctl` installed
   - Or: Call an Azure Function that wraps `dtctl apply`

2. **Register as an API Plugin** in the declarative agent:
   - Add the flow's HTTP endpoint to `declarativeAgent.json` under `actions`
   - The agent will call it with the dashboard JSON payload

Without this, the agent generates the JSON and the user downloads and runs `dtctl apply` manually.

---

## Option B: Copilot Studio (No-Code)

1. Go to [Copilot Studio](https://copilotstudio.microsoft.com)
2. Create a new Agent → Custom Agent
3. **Name**: Dynatrace Dashboard Generator
4. **Instructions**: Paste the contents of `instruction.md`
5. **Knowledge**: Upload `knowledge/dashboard-generator.md` as a knowledge source
6. **Publish** to Teams, SharePoint, or web

### Limitations
- Cannot run shell commands (no `dtctl`)
- Cannot browse the web for company research (uses only uploaded knowledge + Bing if enabled)
- Best suited for generating JSON that the user deploys manually

---

## Option C: SharePoint + M365 Copilot Chat (Simplest)

1. Upload `knowledge/dashboard-generator.md` to a SharePoint document library
2. In M365 Copilot chat, reference the file:
   ```
   Using the dashboard generator guide in SharePoint, create an SRE dashboard for Tata Steel
   ```
3. Copilot will use the knowledge to generate dashboard JSON
4. Copy the JSON, save as `.json`, run `dtctl apply -f <file>.json --context sprint`

---

## Comparison: M365 Copilot vs VS Code Agent

| Capability | VS Code Agent | M365 Copilot |
|---|---|---|
| Generate dashboard JSON | Yes | Yes |
| Web research (company data) | Yes (full web) | Limited (Bing, if enabled) |
| Run DTCTL to deploy | Yes (terminal) | No (needs Power Automate bridge) |
| Verify DQL via MCP | Yes | No |
| File system access | Yes | No |
| Best for | Developers, SEs | Broader team, non-technical users |
