@echo off
setlocal
title GovScheme Assistant - Public Web Link Generator
echo =======================================================================
echo   AI Government Scheme Eligibility and Assistance System
echo   Generating Public Web Link (Accessible by anyone on the internet)
echo =======================================================================
echo.

:: Ensure frontend and backend are running
netstat -ano | findstr "8080" >nul
if %errorlevel% neq 0 (
    echo [!] Backend server is not running on port 8080.
    echo [*] Starting Backend...
    start "GovScheme Backend" /min cmd /c "%~dp0\run-backend.bat"
    timeout /t 8 /nobreak >nul
)

netstat -ano | findstr "5173" >nul
if %errorlevel% neq 0 (
    echo [!] Frontend is not running on port 5173.
    echo [*] Starting Frontend...
    start "GovScheme Frontend" /min cmd /c "%~dp0\run-frontend.bat"
    timeout /t 5 /nobreak >nul
)

echo [*] Launching public tunnel on port 5173...
echo.
echo =======================================================================
echo  If prompted for "Tunnel Password", enter your network IP:
for /f "delims=" %%a in ('powershell -Command "(Invoke-RestMethod -Uri 'https://loca.lt/mytunnelpassword' -UseBasicParsing)"') do echo  PASSWORD: %%a
echo =======================================================================
echo.
call npx --yes localtunnel --port 5173
pause
