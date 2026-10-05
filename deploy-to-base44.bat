@echo off
setlocal
title Deploy GovScheme Assistant to Base44
echo =======================================================================
echo   Deploying to Base44 (Generates a https://<app-name>.base44.app link)
echo =======================================================================
echo.

cd /d "%~dp0\frontend"

echo [*] Linking project to Base44...
call "C:\Users\gouth\AppData\Roaming\npm\base44.cmd" link --create --name "gov-scheme-assistant"

echo [*] Building and Deploying site...
call "C:\Users\gouth\AppData\Roaming\npm\base44.cmd" deploy --build --yes

echo [*] Setting visibility to Public...
call "C:\Users\gouth\AppData\Roaming\npm\base44.cmd" visibility public

echo.
echo =======================================================================
echo   Deployment Complete!
echo   Your live link is ready at: https://gov-scheme-assistant.base44.app
echo =======================================================================
pause
