@echo off
setlocal
echo =======================================================================
echo  AI-Based Government Scheme Eligibility and Assistance System
echo =======================================================================
echo  Launching Backend (Spring Boot: 8080) and Frontend (React: 5173)...
echo =======================================================================

start "GovScheme Backend [8080]" cmd /k "%~dp0\run-backend.bat"
timeout /t 5 /nobreak >nul
start "GovScheme Frontend [5173]" cmd /k "%~dp0\run-frontend.bat"

echo.
echo Both servers are launching!
echo Once started, visit the application in your browser:
echo Frontend Portal: http://localhost:5173
echo Backend REST API: http://localhost:8080/api
echo.
pause
