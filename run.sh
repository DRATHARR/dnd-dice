#!/bin/bash

echo "📦 Checking and installing git and nodejs..."
pkg update -y && pkg install git nodejs -y

echo "📥 Downloading and updating the project from GitHub..."
cd ~
rm -rf dnd-dice
git clone https://github.com/DRATHARR/dnd-dice.git
cd dnd-dice

echo "⚙️ Installing dependencies (this may take a minute)..."
npm install

echo "🚀 Server is ready to launch!"
npm start
