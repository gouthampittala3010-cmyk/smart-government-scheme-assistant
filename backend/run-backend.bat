@echo off
setlocal
echo ====================================================================
echo Starting AI-Based Government Scheme Eligibility & Assistance Backend
echo ====================================================================

if exist "C:\Program Files\Java\jdk-21.0.11" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.11"
)

set "PATH=%JAVA_HOME%\bin;C:\Users\gouth\.gemini\antigravity\scratch\apache-maven-3.9.6\bin;%PATH%"

cd /d "%~dp0"
call "C:\Users\gouth\.gemini\antigravity\scratch\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
pause
