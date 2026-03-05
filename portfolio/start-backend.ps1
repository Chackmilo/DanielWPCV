# ============================================================
# Script para arrancar el backend FastAPI (Nabla AI Agent)
# IMPORTANTE: Usar siempre este script para evitar conflictos
# de entornos Python.
# ============================================================

Write-Host "Arrancando backend de Nabla en http://localhost:8000..." -ForegroundColor Cyan

# Matar cualquier proceso previo en el puerto 8000
$existing = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
if ($existing) {
    $pids = $existing | Select-Object -ExpandProperty OwningProcess -Unique
    Stop-Process -Id $pids -Force -ErrorAction SilentlyContinue
    Write-Host "Proceso previo en puerto 8000 detenido." -ForegroundColor Yellow
}

# Arrancar con el Python del sistema (3.14) que tiene FastAPI 0.114 limpio
& "C:\Users\Daniel Camilo Pardo\AppData\Local\Python\pythoncore-3.14-64\python.exe" `
    -m uvicorn api.chat:app --port 8000
