@echo off
title Kowshik Sravanam Portfolio Server
echo ====================================================
echo Starting Kowshik Sravanam Portfolio at http://localhost:3000/
echo ====================================================
start http://localhost:3000/
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause

