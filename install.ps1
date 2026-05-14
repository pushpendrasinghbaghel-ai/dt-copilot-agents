<#
.SYNOPSIS
    Installs Dynatrace Copilot agents and skills to VS Code user profile locations.
.DESCRIPTION
    Copies agent .agent.md files to the VS Code user prompts folder and
    skill folders to ~/.agents/skills/ so they are available across all workspaces.
#>

$ErrorActionPreference = "Stop"

$RepoRoot = $PSScriptRoot
$VSCodePromptsDir = Join-Path $env:APPDATA "Code\User\prompts"
$SkillsDir = Join-Path $env:USERPROFILE ".agents\skills"

Write-Host "`n=== Dynatrace Copilot Agents Installer ===" -ForegroundColor Cyan

# --- Install Agents ---
Write-Host "`n[1/2] Installing agents to $VSCodePromptsDir" -ForegroundColor Yellow
if (-not (Test-Path $VSCodePromptsDir)) {
    New-Item -ItemType Directory -Path $VSCodePromptsDir -Force | Out-Null
    Write-Host "  Created: $VSCodePromptsDir"
}

$agentFiles = Get-ChildItem -Path (Join-Path $RepoRoot "agents") -Filter "*.agent.md" -ErrorAction SilentlyContinue
foreach ($f in $agentFiles) {
    Copy-Item -Path $f.FullName -Destination $VSCodePromptsDir -Force
    Write-Host "  Installed: $($f.Name)" -ForegroundColor Green
}

# --- Install Skills ---
Write-Host "`n[2/2] Installing skills to $SkillsDir" -ForegroundColor Yellow
if (-not (Test-Path $SkillsDir)) {
    New-Item -ItemType Directory -Path $SkillsDir -Force | Out-Null
    Write-Host "  Created: $SkillsDir"
}

$skillFolders = Get-ChildItem -Path (Join-Path $RepoRoot "skills") -Directory -ErrorAction SilentlyContinue
foreach ($dir in $skillFolders) {
    $dest = Join-Path $SkillsDir $dir.Name
    if (Test-Path $dest) {
        Remove-Item -Path $dest -Recurse -Force
    }
    Copy-Item -Path $dir.FullName -Destination $dest -Recurse -Force
    $fileCount = (Get-ChildItem -Path $dest -Recurse -File).Count
    Write-Host "  Installed: $($dir.Name) ($fileCount files)" -ForegroundColor Green
}

Write-Host "`n=== Installation Complete ===" -ForegroundColor Cyan
Write-Host "Restart VS Code or reload the window to pick up the new agents.`n"
