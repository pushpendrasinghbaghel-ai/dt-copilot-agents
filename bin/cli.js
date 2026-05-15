#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PLATFORMS = ['vscode', 'claude-code', 'cursor', 'windsurf', 'all'];
const args = process.argv.slice(2);

const command = args[0] || 'help';
const platform = args[1] || 'all';
const targetDir = args[2] || process.cwd();

const packageRoot = path.resolve(__dirname, '..');
const currentVersion = require(path.join(packageRoot, 'package.json')).version;

function checkForUpdates() {
  try {
    const latest = execSync('npm view dt-copilot-agents version', { encoding: 'utf8', timeout: 5000 }).trim();
    if (latest && latest !== currentVersion) {
      console.log(`\n  ┌──────────────────────────────────────────────────────┐`);
      console.log(`  │  Update available: ${currentVersion} → ${latest}                      │`);
      console.log(`  │  Run: npx dt-copilot-agents@latest install           │`);
      console.log(`  └──────────────────────────────────────────────────────┘\n`);
    }
  } catch (e) {
    // Silently ignore — network unavailable or npm not reachable
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    // If dest exists as a file, remove it so we can create a directory
    if (fs.existsSync(dest) && !fs.statSync(dest).isDirectory()) {
      fs.unlinkSync(dest);
    }
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    // If dest exists as a directory, remove it so we can write a file
    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function installVSCode() {
  const home = process.env.HOME || process.env.USERPROFILE;
  const isWindows = process.platform === 'win32';

  // Agent → VS Code user prompts
  const promptsDir = isWindows
    ? path.join(process.env.APPDATA, 'Code', 'User', 'prompts')
    : path.join(home, '.config', 'Code', 'User', 'prompts');

  fs.mkdirSync(promptsDir, { recursive: true });
  const agentSrc = path.join(packageRoot, 'agents', 'dashboard-generator.agent.md');
  if (fs.existsSync(agentSrc)) {
    fs.copyFileSync(agentSrc, path.join(promptsDir, 'dashboard-generator.agent.md'));
    console.log(`  ✓ Agent → ${promptsDir}`);
  }

  // Skill → ~/.agents/skills/
  const skillsDir = path.join(home, '.agents', 'skills');
  const skillSrc = path.join(packageRoot, 'skills', 'dt-demo-dashboard');
  const skillDest = path.join(skillsDir, 'dt-demo-dashboard');
  if (fs.existsSync(skillSrc)) {
    copyRecursive(skillSrc, skillDest);
    console.log(`  ✓ Skill → ${skillDest}`);
  }

  console.log('\n  Restart VS Code to pick up the Dashboard Generator agent.');
}

function installClaudeCode(dir) {
  copyRecursive(path.join(packageRoot, 'claude-code', 'CLAUDE.md'), path.join(dir, 'CLAUDE.md'));
  copyRecursive(path.join(packageRoot, 'claude-code', '.claude'), path.join(dir, '.claude'));
  copyRecursive(path.join(packageRoot, 'knowledge'), path.join(dir, 'knowledge'));
  console.log(`  ✓ CLAUDE.md + .claude/commands/ + knowledge/ → ${dir}`);
}

function installCursor(dir) {
  copyRecursive(path.join(packageRoot, 'cursor', '.cursor'), path.join(dir, '.cursor'));
  copyRecursive(path.join(packageRoot, 'knowledge'), path.join(dir, 'knowledge'));
  console.log(`  ✓ .cursor/rules/ + knowledge/ → ${dir}`);
}

function installWindsurf(dir) {
  fs.copyFileSync(
    path.join(packageRoot, 'windsurf', '.windsurfrules'),
    path.join(dir, '.windsurfrules')
  );
  copyRecursive(path.join(packageRoot, 'knowledge'), path.join(dir, 'knowledge'));
  console.log(`  ✓ .windsurfrules + knowledge/ → ${dir}`);
}

function install(platform, dir) {
  console.log('\n╔══════════════════════════════════════════════╗');
  console.log('║  Dynatrace Dashboard Generator — Installer  ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  const platforms = platform === 'all'
    ? ['vscode', 'claude-code', 'cursor', 'windsurf']
    : [platform];

  for (const p of platforms) {
    console.log(`[${p}]`);
    try {
      switch (p) {
        case 'vscode':
          installVSCode();
          break;
        case 'claude-code':
          installClaudeCode(dir);
          break;
        case 'cursor':
          installCursor(dir);
          break;
        case 'windsurf':
          installWindsurf(dir);
          break;
        default:
          console.log(`  Unknown platform: ${p}`);
      }
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
    }
    console.log('');
  }
  console.log('Done! See README for usage instructions.');
}

function showHelp() {
  console.log(`
  Dynatrace Dashboard Generator — Cross-Platform AI Agent

  Usage:
    npx dt-copilot-agents install [platform] [target-dir]

  Platforms:
    vscode       Install to VS Code Copilot (user-level, no target dir needed)
    claude-code  Install to project directory for Claude Code
    cursor       Install to project directory for Cursor
    windsurf     Install to project directory for Windsurf
    all          Install all platforms (default)

  Examples:
    npx dt-copilot-agents install                    # All platforms, current dir
    npx dt-copilot-agents install vscode             # VS Code only
    npx dt-copilot-agents install claude-code ./myproj
    npx dt-copilot-agents install cursor .

  Other commands:
    npx dt-copilot-agents info       Show supported personas and archetypes
    npx dt-copilot-agents help       Show this help

  After install, use the Dashboard Generator agent in your IDE:
    @Dashboard Generator SRE dashboard for Tata Steel
    @Dashboard Generator CISO dashboard for HDFC Bank
    @Dashboard Generator MLOps dashboard for Infosys
  `);
}

function showInfo() {
  console.log(`
  Dynatrace Dashboard Generator — Supported Personas

  Executive:
    CEO    — Revenue impact, business continuity, customer experience
    CIO    — IT strategy, business-IT alignment (default persona)
    CTO    — Platform architecture, DORA metrics, innovation
    CISO   — Security posture, vulnerabilities, compliance

  Technical / Operations:
    SRE              — Error budgets, SLOs, MTTR, incident management
    IT Head          — Infrastructure health, capacity, cost
    Application Ops  — APM, Apdex, response times, errors
    MLOps            — Model accuracy, inference latency, token cost, drift
    Platform Eng     — Developer experience, IDP, CI/CD
    VP Engineering   — DORA metrics, velocity, quality gates

  Industry Archetypes:
    E-Commerce / Marketplace
    Manufacturing / Industrial
    SaaS / Platform
    Financial Services
    Retail / Omnichannel

  Supported Platforms:
    VS Code Copilot, Claude Code, Cursor, Windsurf, M365 Copilot, OpenAI GPTs
  `);
}

// --- Main ---
switch (command) {
  case 'install':
    if (platform !== 'all' && !PLATFORMS.includes(platform)) {
      console.error(`Unknown platform: ${platform}. Use: ${PLATFORMS.join(', ')}`);
      process.exit(1);
    }
    install(platform, path.resolve(targetDir));
    checkForUpdates();
    break;
  case 'info':
    showInfo();
    checkForUpdates();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    checkForUpdates();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
