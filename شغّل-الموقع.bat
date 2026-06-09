@echo off
chcp 65001 >nul
title Athar Academy - Dev Server
color 0A
echo.
echo  ===========================================
echo   Athar Academy - Next.js 14 Dev Server
echo  ===========================================
echo.
echo   الموقع الرئيسي:  http://localhost:3000
echo   لوحة الادارة:    http://localhost:3000/admin
echo.
echo   ملاحظة: الخادم يعمل من C:\athar-project
echo   (لان Next.js لا يعمل من مسار يحتوي احرف عربية)
echo.
echo   اضغط Ctrl+C لايقاف الخادم
echo  ===========================================
echo.
cd /d "C:\athar-project"
call npm run dev
pause
