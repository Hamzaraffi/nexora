@echo off
title Nexora Dev Server
cd /d "%~dp0"
echo Starting Nexora...
npm run dev
:loop
timeout /t 1 > nul
goto loop