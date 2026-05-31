#!/usr/bin/env node
/**
 * HTTP/SSE MCP Server for dt-copilot-agents
 * Implements Model Context Protocol over HTTP with Server-Sent Events transport.
 * Compatible with Smithery.ai, Claude.ai MCP, and any SSE-based MCP client.
 *
 * Usage: node bin/server.js
 * Default port: 3000 (or PORT env var)
 */

const http = require('http');
const { randomUUID } = require('crypto');
const path = require('path');

const packageRoot = path.resolve(__dirname, '..');
const currentVersion = require(path.join(packageRoot, 'package.json')).version;

const PORT = process.env.PORT || 3000;

const SERVER_INFO = {
  name: 'dt-copilot-agents',
  version: currentVersion,
  description: 'Generate and deploy Dynatrace demo dashboards for any persona (CIO, CTO, CISO, SRE, etc.)'
};

const TOOLS = [
  {
    name: 'generate_dashboard',
    description: 'Generate a Dynatrace demo dashboard for a given persona and company. Returns instructions and a prompt ready to use with the Dashboard Generator agent.',
    inputSchema: {
      type: 'object',
      properties: {
        persona: {
          type: 'string',
          description: 'Target persona: CIO, CTO, CEO, CISO, SRE, IT Head, App Ops, MLOps, Platform Eng, VP Eng',
          enum: ['CIO', 'CTO', 'CEO', 'CISO', 'SRE', 'IT Head', 'App Ops', 'MLOps', 'Platform Eng', 'VP Eng']
        },
        company: {
          type: 'string',
          description: 'Company name (e.g. "Tata Steel", "HDFC Bank", "Infosys")'
        },
        industry: {
          type: 'string',
          description: 'Industry (optional — auto-detected if omitted)',
          enum: ['E-Commerce', 'Manufacturing', 'SaaS', 'Financial Services', 'Retail', 'Healthcare', 'Telco', 'Auto-detect']
        },
        mode: {
          type: 'string',
          description: 'demo = inline synthetic data (default), live = real tenant, ingest = synthetic+live, interview = guided discovery',
          enum: ['demo', 'live', 'ingest', 'interview'],
          default: 'demo'
        }
      },
      required: ['persona', 'company']
    }
  },
  {
    name: 'install_agent',
    description: 'Install the Dynatrace Dashboard Generator agent into VS Code, Claude Code, Cursor, or Windsurf',
    inputSchema: {
      type: 'object',
      properties: {
        platform: {
          type: 'string',
          description: 'IDE platform to install into',
          enum: ['vscode', 'claude-code', 'cursor', 'windsurf', 'all']
        }
      },
      required: ['platform']
    }
  },
  {
    name: 'list_personas',
    description: 'List all supported dashboard personas and industry archetypes',
    inputSchema: { type: 'object', properties: {} }
  }
];

function handleRpc(req) {
  const { id, method, params } = req;

  if (method === 'initialize') {
    return { jsonrpc: '2.0', id, result: { protocolVersion: '2024-11-05', serverInfo: SERVER_INFO, capabilities: { tools: {} } } };
  }

  if (method === 'tools/list') {
    return { jsonrpc: '2.0', id, result: { tools: TOOLS } };
  }

  if (method === 'tools/call') {
    const { name, arguments: args = {} } = params || {};

    if (name === 'list_personas') {
      return {
        jsonrpc: '2.0', id,
        result: {
          content: [{
            type: 'text',
            text: JSON.stringify({
              personas: ['CIO', 'CTO', 'CEO', 'CISO', 'SRE', 'IT Head', 'App Ops', 'MLOps', 'Platform Eng', 'VP Eng'],
              industries: ['E-Commerce', 'Manufacturing', 'SaaS', 'Financial Services', 'Retail', 'Healthcare', 'Telco'],
              modes: { demo: 'Inline synthetic data — no tenant needed', live: 'Real metrics from customer Dynatrace tenant', ingest: 'Synthetic data ingested via API then queried live', interview: 'Agent interviews you to discover the right dashboard' }
            }, null, 2)
          }]
        }
      };
    }

    if (name === 'install_agent') {
      const platform = args.platform || 'all';
      return {
        jsonrpc: '2.0', id,
        result: {
          content: [{
            type: 'text',
            text: `To install the Dynatrace Dashboard Generator for ${platform}:\n\n\`\`\`\nnpx dt-copilot-agents install ${platform}\n\`\`\`\n\nAfter install, restart your IDE and use:\n@Dashboard Generator CIO dashboard for <company>`
          }]
        }
      };
    }

    if (name === 'generate_dashboard') {
      const { persona = 'CIO', company = 'your company', industry = 'Auto-detect', mode = 'demo' } = args;
      const modeDesc = { demo: 'Mode 1 (synthetic inline data — no tenant required)', live: 'Mode 2 (real data from Dynatrace tenant)', ingest: 'Mode 3 (synthetic ingest + live queries)', interview: 'Mode 4 (guided discovery interview)' }[mode] || mode;
      return {
        jsonrpc: '2.0', id,
        result: {
          content: [{
            type: 'text',
            text: [
              `## Dynatrace Dashboard Generator`,
              ``,
              `**Persona:** ${persona}  **Company:** ${company}  **Industry:** ${industry}  **Mode:** ${modeDesc}`,
              ``,
              `### To generate this dashboard:`,
              ``,
              `**Option A — VS Code Copilot / Claude Code / Cursor / Windsurf:**`,
              `First install: \`npx dt-copilot-agents install\``,
              `Then prompt: \`@Dashboard Generator ${persona} dashboard for ${company}${industry !== 'Auto-detect' ? ` (${industry})` : ''}\``,
              ``,
              `**Option B — Use the knowledge base directly:**`,
              `The full generation procedure, DQL rules, and layout grids are at:`,
              `https://raw.githubusercontent.com/pushpendrasinghbaghel-ai/dt-copilot-agents/master/knowledge/dashboard-generator.md`,
              ``,
              `**Option C — npm:**`,
              `\`npx dt-copilot-agents install\` then use the @Dashboard Generator agent in your IDE`,
              ``,
              `### Dashboard will include:`,
              `- 4 KPI tiles for ${persona} persona`,
              `- 3 sections × 4 tiles (charts, tables, trends)`,
              `- 1 live events feed`,
              `- Industry-specific data for ${company}`,
              `- Deployed via \`dtctl apply -f dashboard.json\``
            ].join('\n')
          }]
        }
      };
    }

    return { jsonrpc: '2.0', id, error: { code: -32601, message: `Unknown tool: ${name}` } };
  }

  if (method === 'notifications/initialized') return null;

  return { jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } };
}

// Active SSE sessions: sessionId → { res, queue }
const sessions = new Map();

const server = http.createServer((req, res) => {
  // CORS headers — needed for browser-based MCP clients
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Health check
  if (url.pathname === '/' || url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', name: SERVER_INFO.name, version: SERVER_INFO.version, transport: 'SSE', tools: TOOLS.map(t => t.name) }));
    return;
  }

  // SSE endpoint — client connects here to establish session
  if (req.method === 'GET' && url.pathname === '/sse') {
    const sessionId = randomUUID();
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    // Tell the client where to POST messages
    res.write(`event: endpoint\ndata: /messages?sessionId=${sessionId}\n\n`);

    sessions.set(sessionId, { res });

    req.on('close', () => sessions.delete(sessionId));
    return;
  }

  // Messages endpoint — client POSTs JSON-RPC here
  if (req.method === 'POST' && url.pathname === '/messages') {
    const sessionId = url.searchParams.get('sessionId');
    const session = sessions.get(sessionId);

    if (!session) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unknown sessionId' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const rpcReq = JSON.parse(body);
        const rpcRes = handleRpc(rpcReq);
        // Acknowledge the POST immediately
        res.writeHead(202);
        res.end();
        // Send response back via SSE stream
        if (rpcRes) {
          session.res.write(`data: ${JSON.stringify(rpcRes)}\n\n`);
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`dt-copilot-agents MCP server v${currentVersion} running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/`);
  console.log(`SSE:    http://localhost:${PORT}/sse`);
});
