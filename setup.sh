#!/bin/bash
set -e

echo "1/4 — Устанавливаю зависимости (npm install)..."
npm install

echo ""
echo "2/4 — Генерирую Prisma-клиент..."
npx prisma generate

echo ""
echo "3/4 — Создаю таблицу Post в базе данных (prisma db push)..."
npx prisma db push

echo ""
echo "4/4 — Переношу существующие 2 поста в базу..."
npm run seed

echo ""
echo "Готово! Запусти 'npm run dev' и открой http://localhost:3000/admin"
