Write-Host "1/4 - Устанавливаю зависимости (npm install)..."
npm install
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host ""
Write-Host "2/4 - Генерирую Prisma-клиент..."
npx prisma generate
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host ""
Write-Host "3/4 - Создаю таблицу Post в базе данных (prisma db push)..."
npx prisma db push
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host ""
Write-Host "4/4 - Переношу существующие 2 поста в базу..."
npm run seed
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host ""
Write-Host "Готово! Запусти 'npm run dev' и открой http://localhost:3000/admin"
