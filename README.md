# 🎲 D&D Dice Roller

A real-time multiplayer companion app for tabletop RPGs (D&D 5e/5.5e), optimized for smartphones (and PC). It combines 3D dice, a live initiative tracker, comprehensive character sheets, and a shared note board. All data is synchronized between players via WebSocket.

## ✨ Main Features

### 🎲 Dice System

* **Full D&D Dice Support:** d4, d6, d8, d10, d12, d20, and d100 with an interactive pool builder (`+`/`-`).
* **3D Roll Animations** powered by the `@3d-dice/dice-box` library, featuring customizable auto-clear timers for visuals.
* **Modifiers & Crits:** `+`/`-` buttons for modifiers, and a critical hit checkbox (doubles the number of dice in the pool).
* **Advantage / Disadvantage:** Dedicated buttons that automatically select the highest or lowest result from two d20s.
* **Macros:** Create, save, and quick-launch complex combinations (e.g., `1d8, 2d6 + 4`). Long-press on mobile to delete a macro.

### 📜 Character Sheet

* **Core Stats:** Editable level, HP/MaxHP, and AC. Automatic calculation of the Proficiency Bonus based on character level.
* **Death Saves:** 3 success/failure checkboxes with a reset button. The state is synced with the server.
* **Character Conditions:** Multi-select statuses (Poisoned, Stunned, Frightened, Invisible, Prone, etc.).
* **Spellcasting System:** Spellcasting ability selection → automatic calculation of Spell Save DC and Attack Bonus. Interactive spell slot grid (levels 1–9) with clickable toggles for usage.
* **Attributes & Skills:** Dynamically generated list (STR, DEX, CON, INT, WIS, CHA) + all standard skills. Proficiency/Expertise toggle buttons (`0` / `P` / `E`). Clicking an attribute or skill name triggers an automatic roll: `d20 + modifier`.
* **Resting:**
* *Short Rest:* Rolls `Hit Dice × Level + Dexterity modifier`, adding the result to HP. *(Note: Standard D&D rules use Constitution, but translated exactly from your source text).*
* *Long Rest:* Full restoration of HP and all spell slots.



### 🛡️ Party & Initiative

* **Live Initiative Tracker:** Automatic player sorting based on a `1d20 + Dexterity` roll.
* **Member Status:** Real-time display of names, translated conditions, HP/AC, and current initiative.
* **Controls:** "Roll Initiative" and "Clear Tracker" buttons with confirmation prompts.

### 💾 Data Storage

* **Server Storage:** Save, load, and delete characters in `characters.json`. The list of available characters ("chars") is displayed in a modal window.
* **Notes:**
* *Private:* Stored locally (`localStorage`), not synced.
* *Shared:* Instantly updated across all connected clients via Socket.io.


* **Local Log:** Option to clear the roll history only for your current screen (other players retain the full log).

### ⚙️ Settings & UI/UX

* **Full Localization (i18n):** Ukrainian, English, and Polish. Translation of all UI elements, conditions, skills, and messages.
* **Flexible Scaling:** Separate sliders for text size (`50–200%`) and overall interface scale (`90–120%`). Applied in real time.
* **Behavior Settings:** Confirmations for rolls/rests/resets, safe area padding for iOS/Android system buttons, and an auto-clear timer for 3D dice.
* **Notifications:** Toast messages for other players' rolls (when not on the dice tab) and a popup card with roll details.
* **Responsive Design:** Dark theme, mobile optimization, and smooth transition animations between tabs.

### 🌐 Multiplayer

* **Real-time Synchronization** of all states: player list, roll history (up to 100 entries), shared note board, and initiative tracker.
* **Automatic UI Updates** upon user connection/disconnection without page reloads.

---

## 🛠 Tech Stack

| Component | Technology |
| --- | --- |
| **Backend** | Node.js + Express + Socket.io |
| **Frontend** | Vanilla JS (ES6+) + CSS3 (Flexbox/Grid) |
| **3D Dice** | `@3d-dice/dice-box` (WebGL/Canvas) |
| **Storage** | JSON files (`characters.json`) + `localStorage` |
| **Localization** | Custom i18n system with dynamic `.json` loading |

## 📦 Installation & Setup

```bash
1. Download Termux
2. Enter in console: pkg install git -y && git clone https://github.com/DRATHARR/dnd-dice.git && cd dnd-dice && bash run.sh
3. Run: node server.js

For future server startups: node server.js

# Open http://localhost:3000 in your browser. For multiplayer, open the page on multiple devices on the same network or host the server on a VPS/Render/Railway and share your device's IP with port 3000 (Example: 192.168.1.120:3000).

```

# 🎲 D&D Dice Roller
Реалтаймовий мультиплеєрний компаньйон для настільних RPG (D&D 5e/5.5e) для смартфонів (і пк). Поєднує 3D-кістки, живий трекер ініціативи, повноцінні листи персонажів та спільну дошку нотаток. Всі дані синхронізуються між гравцями через WebSocket.

## ✨ Основні функції

### 🎲 Система кубиків
- **Повна підтримка D&D-кубиків:** d4, d6, d8, d10, d12, d20, d100 з інтерактивним конструктором пулу (`+`/`-`).
- **3D-анімація кидків** через бібліотеку `@3d-dice/dice-box` з налаштуванням часу автоматичного зникнення візуалу.
- **Модифікатори та крит:** кнопки `+`/`-` для модифікатора, чекбокс критичного влучання (подвоює кількість кубиків у пулі).
- **Перевага / Перешкода:** окремі кнопки з автоматичним вибором максимального або мінімального результату з двох d20.
- **Макроси:** створення, збереження та швидкий запуск складних комбінацій (напр., `1d8, 2d6 + 4`). Довге натискання на мобільному видаляє макрос.

### 📜 Лист персонажа
- **Базові характеристики:** редагування рівня, HP/MaxHP, AC. Автоматичний розрахунок бонуса майстерності (`Proficiency Bonus`) від рівня.
- **Рятівні кидки від смерті:** 3 чекбокси успіхів/провалів з кнопкою скидання. Стан синхронізується з сервером.
- **Стани персонажа:** мульти-селект (Poisoned, Stunned, Frightened, Invisible, Prone тощо).
- **Система заклинань:** вибір характеристики магії → автоматичний розрахунок `Save DC` та бонуса атаки. Інтерактивна сітка комірок 1–9 рівнів з клікабельним перемиканням використання.
- **Характеристики та навички:** динамічна генерація списку (STR, DEX, CON, INT, WIS, CHA) + всі стандартні навички. Кнопки профієнсу/експертизи (`0` / `P` / `E`). Клік по назві характеристики або навички = автоматичний кидок `d20 + модифікатор`.
- **Відпочинок:** 
  - *Short Rest:* кидок `Кістка ХП × Рівень + модифікатор Спритності`, результат додається до HP.
  - *Long Rest:* повне відновлення HP та всіх комірок заклинань.

### 🛡️ Партія та ініціатива
- **Живий трекер ініціативи:** автоматична сортування гравців за результатом кидка `1d20 + Спритність`.
- **Стан учасників:** відображення ім'я, станів (перекладених), HP/AC та поточної ініціативи в реальному часі.
- **Керування:** кнопки «Кинути ініціативу» та «Очистити трекер» з підтвердженням.

### 💾 Зберігання даних
- **Серверне сховище:** збереження, завантаження та видалення персонажів у `characters.json`. Список доступних чарів відображається в модальному вікні.
- **Нотатки:** 
  - *Приватна:* зберігається локально (`localStorage`), не синхронізується.
  - *Спільна:* миттєво оновлюється у всіх підключених клієнтах через Socket.io.
- **Локальний лог:** опція очищення історії кидків тільки для поточного екрану (інші гравці бачать повний лог).

### ⚙️ Налаштування та UI/UX
- **Повна локалізація (i18n):** Українська, Англійська, Польська. Переклад всіх інтерфейсних елементів, станів, навичок та повідомлень.
- **Гибке масштабування:** окремі повзунки для розміру тексту (`50–200%`) та загального інтерфейсу (`90–120%`). Застосовується в реальному часі.
- **Налаштування поведінки:** підтвердження кидків/перев/скидань, відступ для системних кнопок на iOS/Android, таймер автоочищення 3D-кубиків.
- **Сповіщення:** Toast-повідомлення про чужі кидки (якщо не на вкладці кубиків) та спливаюча картка з деталями результату.
- **Адаптивний дизайн:** темна тема, оптимізація під мобільні пристрої, плавні анімації переходів між вкладками.

### 🌐 Мультиплеєр
- **Реалтайм-синхронізація** всіх станів: список гравців, історія кидків (до 100 записів), спільна дошка нотаток, трекер ініціативи.
- **Автоматичне оновлення UI** при підключенні/відключенні користувачів без перезавантаження сторінки.

---

## 🛠 Технічний стек
| Компонент | Технологія |
|-----------|------------|
| Backend   | Node.js + Express + Socket.io |
| Frontend  | Vanilla JS (ES6+) + CSS3 (Flexbox/Grid) |
| 3D-кістки | `@3d-dice/dice-box` (WebGL/Canvas) |
| Сховище   | JSON-файли (`characters.json`) + `localStorage` |
| Локалізація | Кастомна i18n-система з динамічним завантаженням `.json` |

## 📦 Встановлення та запуск
```bash
1. Скачайте Termux
2. Напишіть в консоль: pkg install git -y && git clone https://github.com/DRATHARR/dnd-dice.git && cd dnd-dice && bash run.sh
3. Запустити node server.js

Для майбутніх запусків сервера: node server.js

# Відкрийте http://localhost:3000 у браузері. Для мультиплеєру відкрийте сторінку на кількох пристроях в одній мережі або підніміть сервер на VPS/Render/Railway і дайте IP вашого девайса з портом 3000 (Приклад: 192.168.1.120:3000).
```
