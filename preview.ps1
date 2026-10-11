# ============================================================
#  本地预览个人网站
#  用法：在项目目录双击运行，或在 PowerShell 里执行 .\preview.ps1
#  按 Ctrl + C 停止
# ============================================================

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

Write-Host ""
Write-Host "  个人网站 · 本地预览" -ForegroundColor Cyan
Write-Host "  --------------------------------" -ForegroundColor DarkGray

# 找 node
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Host "  [x] 找不到 Node.js。请先安装 Node.js 20 或更高版本：https://nodejs.org/" -ForegroundColor Red
    Write-Host ""
    Read-Host "按回车退出"
    exit 1
}
Write-Host ("  Node.js " + (& node -v)) -ForegroundColor DarkGray

# 首次运行需要装依赖
if (-not (Test-Path 'node_modules')) {
    Write-Host "  首次运行，正在安装依赖（约 1 分钟）..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  [x] 依赖安装失败" -ForegroundColor Red
        Read-Host "按回车退出"
        exit 1
    }
}

# 关掉 Astro 遥测（它默认要写用户目录，没必要）
$env:ASTRO_TELEMETRY_DISABLED = '1'

Write-Host ""
Write-Host "  启动中，稍等几秒…" -ForegroundColor Green
Write-Host "  浏览器打开：  http://localhost:4321" -ForegroundColor White
Write-Host "  停止服务：    按 Ctrl + C" -ForegroundColor DarkGray
Write-Host ""

# 延迟一下再自动开浏览器，等服务器起来
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 5
    Start-Process 'http://localhost:4321'
} | Out-Null

npm run dev
