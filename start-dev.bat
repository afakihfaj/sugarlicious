@echo off
title Sugarlicious Dev Server
echo ========================================================
echo   Starting Sugarlicious Artisanal Bakehouse Web Server
echo ========================================================
echo.

set PATH=C:\laragon\bin\nodejs\node-v22;%PATH%

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js tidak ditemukan di C:\laragon\bin\nodejs\node-v22
    pause
    exit /b 1
)

echo Menjalankan Vite Dev Server...
echo Buka browser di http://localhost:3000
echo.
npm run dev
pause

