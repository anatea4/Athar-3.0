@echo off
chcp 65001 >nul
title Athar Academy - Dev Server
color 0A
echo.
echo  ===========================================
echo   Athar Academy - Next.js Dev Server
echo  ===========================================
echo.
echo   ملاحظة: المشروع الفعلي في C:\athar-project
echo   (لا تشغّل من D:\ميم\... القديم)
echo.
echo   الموقع الرئيسي:  http://localhost:3000
echo   لوحة الادارة:    http://localhost:3000/admin
echo.
echo   تسجيل الدخول:
echo     البريد:  it@athar.my
echo     المرور:  Athar@123
echo.
echo   اضغط Ctrl+C لايقاف الخادم
echo  ===========================================
echo.
cd /d "C:\athar-project"
call npm run dev
pause
