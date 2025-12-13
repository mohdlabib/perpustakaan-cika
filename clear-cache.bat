@echo off
echo Membersihkan cache Laravel...

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo.
echo Cache berhasil dibersihkan!
echo Silakan refresh browser Anda.
pause

