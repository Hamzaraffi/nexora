@echo off
echo ========================================
echo Nexora - Turso Database Setup
echo ========================================
echo.

echo 1. Installing Turso CLI...
powershell -Command "irm https://turso.tech/install-windows.ps1 | iex"

echo.
echo 2. Creating Turso account...
turso auth signup

echo.
echo 3. Creating database...
turso db create nexora-db --region iad

echo.
echo 4. Getting database URL...
for /f "delims=" %%i in ('turso db show nexora-db --url') do set TURSO_URL=%%i
echo DATABASE_URL=%TURSO_URL%

echo.
echo 5. Getting auth token...
for /f "delims=" %%i in ('turso db tokens create nexora-db') do set TURSO_TOKEN=%%i
echo DATABASE_AUTH_TOKEN=%TURSO_TOKEN%

echo.
echo ========================================
echo Update your .env file with:
echo   DATABASE_URL=%TURSO_URL%
echo   DATABASE_AUTH_TOKEN=%TURSO_TOKEN%
echo ========================================
echo.

echo Pushing schema to Turso...
npx prisma db push

echo.
echo Done! Commit and push to Vercel.