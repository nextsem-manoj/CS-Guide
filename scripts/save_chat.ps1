# PowerShell script to archive conversation transcripts under chat-logs/
$userHome = [System.Environment]::GetFolderPath('UserProfile')
$brainDir = Join-Path $userHome ".gemini\antigravity-ide\brain"
$outputDir = Join-Path $PSScriptRoot "..\chat-logs"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

$convDirs = Get-ChildItem -Path $brainDir -Directory -ErrorAction SilentlyContinue
$latestLog = $null
$latestTime = [DateTime]::MinValue
$latestConvId = $null

foreach ($d in $convDirs) {
    $logFile = Join-Path $d.FullName ".system_generated\logs\transcript_full.jsonl"
    if (Test-Path $logFile) {
        $item = Get-Item $logFile
        if ($item.LastWriteTime -gt $latestTime) {
            $latestTime = $item.LastWriteTime
            $latestLog = $item.FullName
            $latestConvId = $d.Name
        }
    }
}

if (-not $latestLog) {
    Write-Warning "No conversation log found in $brainDir"
    exit 0
}

$dateStr = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$outFile = Join-Path $outputDir "chat_transcript_${dateStr}_${latestConvId}.md"

$content = "# Chat Transcript Archive`n`n"
$content += "- **Archived At**: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n"
$content += "- **Conversation ID**: $latestConvId`n"
$content += "- **Source Log**: \`$latestLog\`\n`n"
$content += "## Transcript Summary`n`n"

$lines = Get-Content $latestLog
$userPrompts = @()

foreach ($line in $lines) {
    try {
        $obj = $line | ConvertFrom-Json
        if ($obj.type -eq "USER_INPUT" -and $obj.content) {
            $userPrompts += $obj.content
        }
    } catch {}
}

$content += "### Key User Prompts`n`n"
for ($i = 0; $i -lt $userPrompts.Count; $i++) {
    $content += "$($i + 1). $($userPrompts[$i])`n`n"
}

$content += "---`n`nArchived automatically by NextSem CS-Guide Pair Programming Assistant.`n"

Set-Content -Path $outFile -Value $content -Encoding utf8
Write-Host "[ARCHIVED] Saved chat transcript to: $outFile"
