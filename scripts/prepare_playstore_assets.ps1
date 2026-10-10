Add-Type -AssemblyName System.Drawing

$assetsDir = "c:\Users\nextsem\Documents\CS-Guide\play-store-assets"

# 1. Convert App Icon to TRUE PNG (512x512)
$iconSrcPath = Join-Path $assetsDir "nextsem_app_icon_512x512.png"
$iconDestPath = Join-Path $assetsDir "app_icon_512x512.png"

$iconImg = [System.Drawing.Bitmap]::FromFile($iconSrcPath)
Write-Host "Source Icon: $($iconImg.Width) x $($iconImg.Height)"

$iconBmp = New-Object System.Drawing.Bitmap(512, 512)
$g1 = [System.Drawing.Graphics]::FromImage($iconBmp)
$g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g1.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g1.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g1.DrawImage($iconImg, 0, 0, 512, 512)
$g1.Dispose()
$iconImg.Dispose()

# Save as genuine PNG
$iconBmp.Save($iconDestPath, [System.Drawing.Imaging.ImageFormat]::Png)
$iconBmp.Dispose()
Write-Host "Created Genuine PNG: $iconDestPath (512x512)"


# 2. Convert Feature Graphic to TRUE PNG (1024x500)
$featSrcPath = Join-Path $assetsDir "feature-graphic.png"
$featDestPath = Join-Path $assetsDir "feature_graphic_1024x500.png"

$featImg = [System.Drawing.Bitmap]::FromFile($featSrcPath)
Write-Host "Source Feature Graphic: $($featImg.Width) x $($featImg.Height)"

$featBmp = New-Object System.Drawing.Bitmap(1024, 500)
$g2 = [System.Drawing.Graphics]::FromImage($featBmp)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g2.DrawImage($featImg, 0, 0, 1024, 500)
$g2.Dispose()
$featImg.Dispose()

# Save as genuine PNG
$featBmp.Save($featDestPath, [System.Drawing.Imaging.ImageFormat]::Png)
$featBmp.Dispose()
Write-Host "Created Genuine PNG: $featDestPath (1024x500)"

Write-Host "Done preparing Play Store assets!"
