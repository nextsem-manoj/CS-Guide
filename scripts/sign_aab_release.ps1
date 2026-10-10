Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$aabPath = (Resolve-Path "play-store-assets/app-release.aab").Path
$keystorePath = (Resolve-Path "android/app/nextsem-release-key.keystore").Path

Write-Host "Opening $aabPath to strip ALL old signatures..."

$zip = [System.IO.Compression.ZipFile]::Open($aabPath, [System.IO.Compression.ZipArchiveMode]::Update)

$toRemove = @()
foreach ($entry in $zip.Entries) {
    if ($entry.FullName -like "META-INF/*.SF" -or 
        $entry.FullName -like "META-INF/*.RSA" -or 
        $entry.FullName -like "META-INF/*.DSA" -or 
        $entry.FullName -eq "META-INF/MANIFEST.MF") {
        $toRemove += $entry
    }
}

Write-Host "Found $($toRemove.Count) signature files to remove."
foreach ($entry in $toRemove) {
    Write-Host "Removing: $($entry.FullName)"
    $entry.Delete()
}

$zip.Dispose()
Write-Host "All old signatures completely removed."

Write-Host "Signing with Nextsem Official Release Keystore..."
jarsigner -sigalg SHA256withRSA -digestalg SHA-256 -keystore "$keystorePath" -storepass "nextsem123" "$aabPath" "nextsem-alias"
Write-Host "jarsigner complete!"

Write-Host "`n--- VERIFYING SIGNATURE WITH KEYTOOL ---"
keytool -printcert -jarfile "$aabPath"
