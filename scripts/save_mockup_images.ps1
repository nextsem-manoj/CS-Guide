$srcDir = "C:\Users\Manoj\.gemini\antigravity-ide\brain\db143ee7-a5b2-4e20-8908-7707ba175be8"
$docsDest = "docs\design-mockups"
$publicDest = "public\design-mockups"

New-Item -ItemType Directory -Force -Path $docsDest | Out-Null
New-Item -ItemType Directory -Force -Path $publicDest | Out-Null

$mappings = @(
    @{ Pattern = "home_desktop_layout_*.jpg"; Target = "01-home-desktop-layout.jpg"; Title = "Home Desktop Layout (Widescreen 16:9)" },
    @{ Pattern = "home_mobile_layout_*.jpg"; Target = "02-home-mobile-layout.jpg"; Title = "Home Mobile Layout (Smartphone 9:16)" },
    @{ Pattern = "bca_dashboard_desktop_*.jpg"; Target = "03-bca-dashboard-desktop-layout.jpg"; Title = "BCA Hub Semester Dashboard Desktop (16:9)" },
    @{ Pattern = "bca_dashboard_mobile_*.jpg"; Target = "04-bca-dashboard-mobile-layout.jpg"; Title = "BCA Hub Mobile Accordion Layout (9:16)" },
    @{ Pattern = "practical_lab_layout_*.jpg"; Target = "05-practical-lab-desktop-layout.jpg"; Title = "BCA Practical Lab Desktop Workspace (16:9)" },
    @{ Pattern = "practical_lab_mobile_*.jpg"; Target = "06-practical-lab-mobile-layout.jpg"; Title = "BCA Practical Lab Mobile Layout (9:16)" },
    @{ Pattern = "lesson_reader_layout_*.jpg"; Target = "07-lesson-reader-desktop-and-mobile-layout.jpg"; Title = "Lesson Reader Desktop & Mobile Side-by-Side (16:9)" }
)

foreach ($item in $mappings) {
    $found = Get-ChildItem -Path $srcDir -Filter $item.Pattern | Select-Object -First 1
    if ($found) {
        $dest1 = Join-Path $docsDest $item.Target
        $dest2 = Join-Path $publicDest $item.Target
        Copy-Item -Path $found.FullName -Destination $dest1 -Force
        Copy-Item -Path $found.FullName -Destination $dest2 -Force
        $sizeKB = [math]::Round($found.Length / 1KB)
        Write-Host "[SAVED] $($item.Target) ($sizeKB KB) - $($item.Title)"
    } else {
        Write-Warning "[NOT FOUND] $($item.Pattern)"
    }
}

$readmePath = Join-Path $docsDest "README.md"
$md = @"
# CS-Guide Design Mockups & Layout Reference System
Curated and architected by Er. Manoj Kumar for NextSem CS-Guide & BCA Learning Portal.

All layout mockups are numbered in exact sequential order for Desktop and Mobile development references:

| # | Filename | Viewport | Target Page / Screen | Live Static Asset |
|---|----------|----------|----------------------|-------------------|
| 1 | \`01-home-desktop-layout.jpg\` | Desktop (16:9) | **Home Desktop Layout** | [\`/design-mockups/01-home-desktop-layout.jpg\`](/design-mockups/01-home-desktop-layout.jpg) |
| 2 | \`02-home-mobile-layout.jpg\` | Mobile (9:16) | **Home Mobile Layout** | [\`/design-mockups/02-home-mobile-layout.jpg\`](/design-mockups/02-home-mobile-layout.jpg) |
| 3 | \`03-bca-dashboard-desktop-layout.jpg\` | Desktop (16:9) | **BCA Hub Semester Dashboard Desktop** | [\`/design-mockups/03-bca-dashboard-desktop-layout.jpg\`](/design-mockups/03-bca-dashboard-desktop-layout.jpg) |
| 4 | \`04-bca-dashboard-mobile-layout.jpg\` | Mobile (9:16) | **BCA Hub Mobile Accordion Layout** | [\`/design-mockups/04-bca-dashboard-mobile-layout.jpg\`](/design-mockups/04-bca-dashboard-mobile-layout.jpg) |
| 5 | \`05-practical-lab-desktop-layout.jpg\` | Desktop (16:9) | **BCA Practical Lab Desktop Workspace** | [\`/design-mockups/05-practical-lab-desktop-layout.jpg\`](/design-mockups/05-practical-lab-desktop-layout.jpg) |
| 6 | \`06-practical-lab-mobile-layout.jpg\` | Mobile (9:16) | **BCA Practical Lab Mobile Layout** | [\`/design-mockups/06-practical-lab-mobile-layout.jpg\`](/design-mockups/06-practical-lab-mobile-layout.jpg) |
| 7 | \`07-lesson-reader-desktop-and-mobile-layout.jpg\` | Desktop & Mobile (16:9) | **Lesson Reader Side-by-Side** | [\`/design-mockups/07-lesson-reader-desktop-and-mobile-layout.jpg\`](/design-mockups/07-lesson-reader-desktop-and-mobile-layout.jpg) |

## Layout Galleries

### 1. Home Desktop Layout (\`01-home-desktop-layout.jpg\`)
![Home Desktop Layout](./01-home-desktop-layout.jpg)

### 2. Home Mobile Layout (\`02-home-mobile-layout.jpg\`)
![Home Mobile Layout](./02-home-mobile-layout.jpg)

### 3. BCA Hub Semester Dashboard Desktop (\`03-bca-dashboard-desktop-layout.jpg\`)
![BCA Hub Semester Dashboard Desktop](./03-bca-dashboard-desktop-layout.jpg)

### 4. BCA Hub Mobile Accordion Layout (\`04-bca-dashboard-mobile-layout.jpg\`)
![BCA Hub Mobile Accordion Layout](./04-bca-dashboard-mobile-layout.jpg)

### 5. BCA Practical Lab Desktop Workspace (\`05-practical-lab-desktop-layout.jpg\`)
![BCA Practical Lab Desktop Workspace](./05-practical-lab-desktop-layout.jpg)

### 6. BCA Practical Lab Mobile Layout (\`06-practical-lab-mobile-layout.jpg\`)
![BCA Practical Lab Mobile Layout](./06-practical-lab-mobile-layout.jpg)

### 7. Lesson Reader Side-by-Side (\`07-lesson-reader-desktop-and-mobile-layout.jpg\`)
![Lesson Reader Side-by-Side](./07-lesson-reader-desktop-and-mobile-layout.jpg)
"@

Set-Content -Path $readmePath -Value $md -Encoding utf8
Write-Host "Index created at $readmePath"
