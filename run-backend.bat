@echo off
setlocal
title GovScheme Assistant - Backend Server (Port 8080)
echo =======================================================================
echo  Starting Spring Boot Backend Server on http://localhost:8080
echo =======================================================================

if exist "C:\Program Files\Java\jdk-21.0.11" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.11"
)
set "PATH=%JAVA_HOME%\bin;C:\Users\gouth\.gemini\antigravity\scratch\apache-maven-3.9.6\bin;%PATH%"

cd /d "%~dp0\backend"
call "C:\Users\gouth\.gemini\antigravity\scratch\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
pause
