@echo off
title T.C.V. TechnologyCarmven - Servidor Local
color 0A
cls
echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║   T.C.V. TECHNOLOGYCARMVEN                   ║
echo  ║   Iniciando servidor local...                ║
echo  ╚══════════════════════════════════════════════╝
echo.
echo  Iniciando servidor en http://localhost:8080
echo  Abriendo navegador automaticamente...
echo.
echo  Para DETENER el servidor: cierra esta ventana
echo.

REM Buscar PowerShell y lanzar servidor
start /b powershell -NoProfile -Command "& { $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Write-Host ' Servidor activo en http://localhost:8080' -ForegroundColor Green; while ($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $path = $request.Url.LocalPath; if ($path -eq '/') { $path = '/index.html' }; $filePath = 'C:\Users\User\Documents\WEB TCV' + $path.Replace('/', '\'); if (Test-Path $filePath -PathType Leaf) { $bytes = [System.IO.File]::ReadAllBytes($filePath); $ext = [System.IO.Path]::GetExtension($filePath); $mime = switch ($ext) { '.html' {'text/html; charset=utf-8'} '.css' {'text/css'} '.js' {'application/javascript'} '.png' {'image/png'} '.jpg' {'image/jpeg'} '.jpeg' {'image/jpeg'} '.gif' {'image/gif'} '.svg' {'image/svg+xml'} '.ico' {'image/x-icon'} '.webp' {'image/webp'} default {'application/octet-stream'} }; $response.ContentType = $mime; $response.ContentLength64 = $bytes.Length; $response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $response.StatusCode = 404; $notFound = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found'); $response.OutputStream.Write($notFound, 0, $notFound.Length) }; $response.OutputStream.Close() } }"

timeout /t 2 /nobreak >nul

REM Abrir navegador
start chrome "http://localhost:8080"
if errorlevel 1 start "http://localhost:8080"

echo  ✓ Servidor corriendo. Puedes cerrar esta ventana cuando termines.
pause
