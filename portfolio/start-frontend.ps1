# ============================================================
# Script para arrancar el frontend de Vite en http://localhost:5173
# ============================================================

Write-Host "Arrancando frontend Vite en http://localhost:5173..." -ForegroundColor Cyan

# Matar cualquier proceso previo en el puerto 5173
$existing = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($existing) {
    $pids = $existing | Select-Object -ExpandProperty OwningProcess -Unique
    Stop-Process -Id $pids -Force -ErrorAction SilentlyContinue
    Write-Host "Proceso previo en puerto 5173 detenido." -ForegroundColor Yellow
}

npm run dev -- --host 0.0.0.0 --port 5173
