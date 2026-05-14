# OpenAI Custom GPT — Dashboard Generator

## How to Set Up

### Option A: ChatGPT Custom GPT (chat.openai.com)
1. Go to **Explore GPTs → Create a GPT**
2. Paste the contents of `system-prompt.txt` into the **Instructions** field
3. Name it: **Dynatrace Dashboard Generator**
4. Description: *Generate and deploy Dynatrace CIO Command Center dashboards with realistic synthetic data*
5. Upload `knowledge/dashboard-generator.md` as a Knowledge file
6. Enable: **Web Browsing** (for company research), **Code Interpreter** (for JSON generation)
7. Save and publish (private or shared with team)

### Option B: ChatGPT Projects
1. Create a new Project
2. Paste `system-prompt.txt` into the Project Instructions
3. Upload `knowledge/dashboard-generator.md` to Project Files
4. Use the project chat to generate dashboards

### Option C: OpenAI API (Assistants)
1. Create an Assistant with the system prompt from `system-prompt.txt`
2. Upload `knowledge/dashboard-generator.md` as a file for file_search
3. Enable tools: `code_interpreter`, `file_search`
4. Call via API with user message like: "Create a dashboard for Tata Steel manufacturing operations"

## Limitations vs VS Code Agent
- **No DTCTL deployment** — GPT can generate the JSON but can't run shell commands to deploy
- **Manual deploy step** — download the JSON, then run `dtctl apply -f <file>.json` locally
- **No MCP verification** — can't verify DQL queries against live tenant
