<#
.SYNOPSIS
    Installs Dynatrace dashboard generator agent/skill to the selected platform(s).
.DESCRIPTION
    Supports: VS Code Copilot, Claude Code, Cursor, Windsurf.
    Copies platform-specific config files + shared knowledge base to the right locations.
.PARAMETER Platform
    One or more of: vscode, claude-code, cursor, windsurf, all (default: all)
.EXAMPLE
    .\install.ps1                    # Install all platforms
    .\install.ps1 -Platform vscode   # VS Code only
    .\install.ps1 -Platform claude-code,cursor
#>

param(
    [ValidateSet("vscode", "claude-code", "cursor", "windsurf", "all")]
    [string[]]$Platform = @("all")
)

$ErrorActionPreference = "Stop"
$RepoRoot = $PSScriptRoot

if ($Platform -contains "all") {
    $Platform = @("vscode", "claude-code", "cursor", "windsurf")
}

Write-Host "`n=== Dynatrace Dashboard Generator — Cross-Platform Installer ===" -ForegroundColor Cyan
Write-Host "Platforms: $($Platform -join ', ')`n"

# --- Helper ---
function Copy-Knowledge {
    param([string]$DestDir)
    $knowledgeDest = Join-Path $DestDir "knowledge"
    if (-not (Test-Path $knowledgeDest)) {
        New-Item -ItemType Directory -Path $knowledgeDest -Force | Out-Null
    }
    Copy-Item -Path (Join-Path $RepoRoot "knowledge\dashboard-generator.md") -Destination $knowledgeDest -Force
    Write-Host "    Copied knowledge base" -ForegroundColor DarkGray
}

# --- VS Code Copilot ---
if ($Platform -contains "vscode") {
    Write-Host "[VS Code Copilot]" -ForegroundColor Yellow

    # Agent .agent.md → user prompts folder
    $VSCodePromptsDir = Join-Path $env:APPDATA "Code\User\prompts"
    if (-not (Test-Path $VSCodePromptsDir)) {
        New-Item -ItemType Directory -Path $VSCodePromptsDir -Force | Out-Null
    }
    $agentFiles = Get-ChildItem -Path (Join-Path $RepoRoot "agents") -Filter "*.agent.md" -ErrorAction SilentlyContinue
    foreach ($f in $agentFiles) {
        Copy-Item -Path $f.FullName -Destination $VSCodePromptsDir -Force
        Write-Host "  Agent: $($f.Name) -> $VSCodePromptsDir" -ForegroundColor Green
    }

    # Skills → ~/.agents/skills/
    $SkillsDir = Join-Path $env:USERPROFILE ".agents\skills"
    if (-not (Test-Path $SkillsDir)) {
        New-Item -ItemType Directory -Path $SkillsDir -Force | Out-Null
    }
    $skillFolders = Get-ChildItem -Path (Join-Path $RepoRoot "skills") -Directory -ErrorAction SilentlyContinue
    foreach ($dir in $skillFolders) {
        $dest = Join-Path $SkillsDir $dir.Name
        if (Test-Path $dest) { Remove-Item -Path $dest -Recurse -Force }
        Copy-Item -Path $dir.FullName -Destination $dest -Recurse -Force
        $fileCount = (Get-ChildItem -Path $dest -Recurse -File).Count
        Write-Host "  Skill: $($dir.Name) ($fileCount files) -> $SkillsDir" -ForegroundColor Green
    }
    Write-Host ""
}

# --- Claude Code ---
if ($Platform -contains "claude-code") {
    Write-Host "[Claude Code]" -ForegroundColor Yellow
    Write-Host "  Claude Code uses project-level files. Copy to your project root:" -ForegroundColor DarkGray

    $claudeSrc = Join-Path $RepoRoot "claude-code"
    Write-Host "  Source: $claudeSrc" -ForegroundColor DarkGray
    Write-Host "  Files:" -ForegroundColor DarkGray
    Write-Host "    CLAUDE.md              -> <project>/CLAUDE.md" -ForegroundColor Green
    Write-Host "    .claude/commands/      -> <project>/.claude/commands/" -ForegroundColor Green
    Write-Host "    knowledge/             -> <project>/knowledge/" -ForegroundColor Green
    Write-Host ""
    Write-Host "  To install into a project:" -ForegroundColor Cyan
    Write-Host "    Copy-Item '$claudeSrc\CLAUDE.md' '<project>\CLAUDE.md'"
    Write-Host "    Copy-Item '$claudeSrc\.claude' '<project>\.claude' -Recurse"
    Write-Host "    Copy-Item '$RepoRoot\knowledge' '<project>\knowledge' -Recurse"
    Write-Host ""
}

# --- Cursor ---
if ($Platform -contains "cursor") {
    Write-Host "[Cursor]" -ForegroundColor Yellow
    Write-Host "  Cursor uses project-level .cursor/rules/. Copy to your project root:" -ForegroundColor DarkGray

    $cursorSrc = Join-Path $RepoRoot "cursor"
    Write-Host "  Source: $cursorSrc" -ForegroundColor DarkGray
    Write-Host "  Files:" -ForegroundColor DarkGray
    Write-Host "    .cursor/rules/dashboard-generator.mdc -> <project>/.cursor/rules/" -ForegroundColor Green
    Write-Host "    knowledge/                            -> <project>/knowledge/" -ForegroundColor Green
    Write-Host ""
    Write-Host "  To install into a project:" -ForegroundColor Cyan
    Write-Host "    Copy-Item '$cursorSrc\.cursor' '<project>\.cursor' -Recurse"
    Write-Host "    Copy-Item '$RepoRoot\knowledge' '<project>\knowledge' -Recurse"
    Write-Host ""
}

# --- Windsurf ---
if ($Platform -contains "windsurf") {
    Write-Host "[Windsurf]" -ForegroundColor Yellow
    Write-Host "  Windsurf uses project-level .windsurfrules. Copy to your project root:" -ForegroundColor DarkGray

    $windsurfSrc = Join-Path $RepoRoot "windsurf"
    Write-Host "  Source: $windsurfSrc" -ForegroundColor DarkGray
    Write-Host "  Files:" -ForegroundColor DarkGray
    Write-Host "    .windsurfrules -> <project>/.windsurfrules" -ForegroundColor Green
    Write-Host "    knowledge/     -> <project>/knowledge/" -ForegroundColor Green
    Write-Host ""
    Write-Host "  To install into a project:" -ForegroundColor Cyan
    Write-Host "    Copy-Item '$windsurfSrc\.windsurfrules' '<project>\.windsurfrules'"
    Write-Host "    Copy-Item '$RepoRoot\knowledge' '<project>\knowledge' -Recurse"
    Write-Host ""
}

Write-Host "=== Done ===" -ForegroundColor Cyan
Write-Host "For VS Code: restart or reload window to pick up agents."
Write-Host "For others: copy files to your project directory as shown above.`n"
