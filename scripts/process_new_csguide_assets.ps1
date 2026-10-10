Add-Type -AssemblyName System.Drawing

$iconSrc = "C:\Users\nextsem\.gemini\antigravity-ide\brain\d88bafe7-278f-415c-a011-6024022fb0dc\csguide_app_icon_1791614087010.jpg"
$featSrc = "C:\Users\nextsem\.gemini\antigravity-ide\brain\d88bafe7-278f-415c-a011-6024022fb0dc\csguide_feature_graphic_1791614123664.jpg"

$assetsDir = "c:\Users\nextsem\Documents\CS-Guide\play-store-assets"
$iconDest = Join-Path $assetsDir "app_icon_512x512.png"
$featDest = Join-Path $assetsDir "feature_graphic_1024x500.png"

# 1. Produce 512x512 PNG App Icon
$img1 = [System.Drawing.Bitmap]::FromFile($iconSrc)
$bmp1 = New-Object System.Drawing.Bitmap(512, 512)
$g1 = [System.Drawing.Graphics]::FromImage($bmp1)
$g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g1.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g1.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g1.DrawImage($img1, 0, 0, 512, 512)
$g1.Dispose()
$img1.Dispose()
$bmp1.Save($iconDest, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp1.Dispose()
Write-Host "Generated App Icon: $iconDest (512x512 PNG)"

# 2. Produce 1024x500 PNG Feature Graphic
$img2 = [System.Drawing.Bitmap]::FromFile($featSrc)
$bmp2 = New-Object System.Drawing.Bitmap(1024, 500)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g2.DrawImage($img2, 0, 0, 1024, 500)
$g2.Dispose()
$img2.Dispose()
$bmp2.Save($featDest, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp2.Dispose()
Write-Host "Generated Feature Graphic: $featDest (1024x500 PNG)"

# 3. Update Android launcher mipmap icons
$sizes = @{
    "mipmap-mdpi" = 48
    "mipmap-hdpi" = 72
    "mipmap-xhdpi" = 96
    "mipmap-xxhdpi" = 144
    "mipmap-xxxhdpi" = 192
}

$iconForMipmaps = [System.Drawing.Bitmap]::FromFile($iconDest)
foreach ($folder in $sizes.Keys) {
    $dim = $sizes[$folder]
    $destDir = "c:\Users\nextsem\Documents\CS-Guide\android\app\src\main\res\$folder"
    if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    $destPath = Join-Path $destDir "ic_launcher.png"
    
    $mBmp = New-Object System.Drawing.Bitmap($dim, $dim)
    $mg = [System.Drawing.Graphics]::FromImage($mBmp)
    $mg.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $mg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $mg.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $mg.DrawImage($iconForMipmaps, 0, 0, $dim, $dim)
    $mg.Dispose()
    
    $mBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $mBmp.Dispose()
    Write-Host "Updated Android Mipmap: $destPath ($dim x $dim)"
}
$iconForMipmaps.Dispose()

Write-Host "All CSguide by Nextsem assets successfully generated!"
