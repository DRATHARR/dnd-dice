#!/bin/bash

echo "📦 Перевіряємо та встановлюємо git і nodejs.../Checking and installing git and nodejs..."
pkg update -y && pkg install git nodejs -y

echo "📥 Завантажуємо та оновлюємо проєкт з GitHub.../Downloading and updating the project from GitHub..."
cd ~
rm -rf dnd-dice
git clone https://github.com/DRATHARR/dnd-dice.git
cd dnd-dice

echo "⚙️ Встановлюємо залежності (це може зайняти хвилину).../Installing dependencies (this may take a minute)..."
npm install

echo "🚀 Сервер готовий до запуску!/Server is ready to launch!"
npm start
