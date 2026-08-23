const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use('/dice-box', express.static(path.join(__dirname, 'node_modules/@3d-dice/dice-box/dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Глобальний стан
let connectedPlayers = {}; 
let rollHistory = []; 
let sharedNotepad = "";

// --- РОБОТА З ФАЙЛОМ ПЕРСОНАЖІВ ---
const CHARACTERS_FILE = path.join(__dirname, 'characters.json');
let savedCharacters = {};

// При запуску сервера читаємо файл (якщо він існує)
if (fs.existsSync(CHARACTERS_FILE)) {
    try {
        const fileData = fs.readFileSync(CHARACTERS_FILE, 'utf8');
        savedCharacters = JSON.parse(fileData);
        console.log(`[Сервер] Завантажено ${Object.keys(savedCharacters).length} персонажів з файлу.`);
    } catch (err) {
        console.error("[Сервер] Помилка читання characters.json:", err);
    }
}

function saveCharactersToFile() {
    fs.writeFile(CHARACTERS_FILE, JSON.stringify(savedCharacters, null, 4), (err) => {
        if (err) console.error("[Сервер] Помилка запису в characters.json:", err);
    });
}
// -----------------------------------

io.on('connection', (socket) => {
    socket.emit('init_state', {
        players: Object.values(connectedPlayers),
        history: rollHistory,
        notepad: sharedNotepad
    });

    socket.on('join', (data) => {
        connectedPlayers[socket.id] = {
            id: socket.id,
            name: data.name,
            hp: data.hp || 10,
            maxHp: data.maxHp || 10,
            ac: data.ac || 10,
            conditions: data.conditions || [],
            deathSaves: data.deathSaves || { successes: [false,false,false], failures: [false,false,false] }, // ДОДАНО РЯДОК
            init: null
        };
        io.emit('update_players', Object.values(connectedPlayers));
    });

    socket.on('update_char', (data) => {
        if (connectedPlayers[socket.id]) {
            const oldName = connectedPlayers[socket.id].name;
            connectedPlayers[socket.id] = { ...connectedPlayers[socket.id], ...data };
            
            if (data.name && data.name !== oldName) {
                rollHistory.forEach(log => { if (log.name === oldName) log.name = data.name; });
                io.emit('init_state', {
                    players: Object.values(connectedPlayers),
                    history: rollHistory,
                    notepad: sharedNotepad
                });
            } else {
                io.emit('update_players', Object.values(connectedPlayers));
            }
        }
    });

    socket.on('save_character', (data) => {
        savedCharacters[data.name] = data;
        saveCharactersToFile(); // Зберігаємо фізично на диск
    });

    socket.on('delete_character', (name) => {
        if (savedCharacters[name]) {
            delete savedCharacters[name];
            saveCharactersToFile(); 
            // Відправляємо клієнту оновлений список після видалення
            const list = Object.values(savedCharacters).map(c => ({ name: c.name, level: c.charData.level }));
            socket.emit('saved_characters_list', list);
        }
    });

    socket.on('request_saved_characters', () => {
        const list = Object.values(savedCharacters).map(c => ({ name: c.name, level: c.charData.level }));
        socket.emit('saved_characters_list', list);
    });

    socket.on('load_character', (name) => {
        if (savedCharacters[name]) {
            socket.emit('character_loaded', savedCharacters[name]);
        }
    });

    socket.on('update_notepad', (text) => {
        sharedNotepad = text;
        socket.broadcast.emit('notepad_updated', sharedNotepad);
    });

    socket.on('clear_initiative', () => {
        Object.values(connectedPlayers).forEach(p => p.init = null);
        io.emit('update_players', Object.values(connectedPlayers));
    });

    socket.on('commit_roll', (data) => {
        const rollData = { ...data, time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) };
        
        rollHistory.push(rollData);
        if (rollHistory.length > 100) rollHistory.shift(); 

        if (data.rollType === 'initiative' && connectedPlayers[socket.id]) {
            connectedPlayers[socket.id].init = data.total;
            io.emit('update_players', Object.values(connectedPlayers));
        }
        io.emit('new_roll_log', rollData);
    });

    socket.on('disconnect', () => {
        if (connectedPlayers[socket.id]) {
            delete connectedPlayers[socket.id];
            io.emit('update_players', Object.values(connectedPlayers));
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущено! Підключайтесь за адресою: http://0.0.0.0:${PORT}`);
});