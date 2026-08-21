#!/bin/bash

echo "📦 Перевіряємо та встановлюємо git і nodejs..."
pkg update -y && pkg install git nodejs -y

echo "📥 Завантажуємо та оновлюємо проєкт з GitHub..."
cd ~
rm -rf dnd-dice
git clone https://github.com/DRATHARR/dnd-dice.git
cd dnd-dice

echo "⚙️ Встановлюємо залежності (це може зайняти хвилину)..."
npm install

echo "🚀 Сервер готовий до запуску!"
npm start
