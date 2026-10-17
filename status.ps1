param(
    [Parameter(Position=0)]
    [string]$Repo = ""
)

node "$PSScriptRoot\scripts\repo-manager.js" status $Repo
