# Prenese vse slike, ki jih vsebina se vedno referencira s stare domene,
# in jih shrani v public/uploads/... na pravilna mesta.
#
# Poženi iz korena projekta (PowerShell):
#   powershell -ExecutionPolicy Bypass -File .\scripts\download-legacy-images.ps1
#
# Ce PowerShell javi napako o "execution policy", uporabi zgornji ukaz
# z -ExecutionPolicy Bypass, ali enkrat pozeni:
#   Unblock-File .\scripts\download-legacy-images.ps1
#
# POMEMBNO: pozeni to PRED ugasnitvijo starega WordPressa (dream-explorer.com) -
# po ugasnitvi teh slik ni vec mogoce pridobiti.

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$manifestPath = Join-Path $scriptDir "image-manifest.json"
$publicDir = Join-Path $scriptDir "..\public"

if (-not (Test-Path $manifestPath)) {
    Write-Error "Manifest ni najden: $manifestPath"
    exit 1
}

$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json

Write-Host "Prenasam $($manifest.Count) slik ..."

$failed = 0

foreach ($item in $manifest) {
    $src = $item.source_url
    $destRelative = $item.dest_path -replace '^/', ''
    $destRelative = $destRelative -replace '/', '\'
    $fullDest = Join-Path $publicDir $destRelative

    $destDir = Split-Path -Parent $fullDest
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    if (Test-Path $fullDest) {
        Write-Host "  [obstaja] $($item.dest_path)"
        continue
    }

    Write-Host "  [prenasam] $src -> $($item.dest_path)"
    try {
        Invoke-WebRequest -Uri $src -OutFile $fullDest -UseBasicParsing
    }
    catch {
        Write-Warning "  [NAPAKA] ni bilo mogoce prenesti: $src"
        $failed++
    }
}

Write-Host ""
if ($failed -eq 0) {
    Write-Host "Vse slike uspesno prenesene."
}
else {
    Write-Host "$failed slik ni bilo mogoce prenesti - preveri izpis zgoraj."
}
