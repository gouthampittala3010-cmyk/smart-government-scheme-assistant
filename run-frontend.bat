@echo off
setlocal
title GovScheme Assistant - React Frontend (Port 5173)
echo =======================================================================
echo  Starting Vite React Frontend on http://localhost:5173
echo =======================================================================

cd /d "%~dp0\frontend"
call npm run dev
pause
