const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use('/dice-box', express.static(path.join(__dirname, 'node_modules/@3d-dice/dice-box/dist')));
app.use(express.static(path.join(__dirname, 'public')));

let connectedPlayers = {}; 
let rollHistory = []; 

io.on('connection', (socket) => {
    socket.emit('init_state', {
        players: Object.values(connectedPlayers),
        history: rollHistory
    });

    socket.on('join', (name) => {
        connectedPlayers[socket.id] = name;
        io.emit('update_players', Object.values(connectedPlayers));
    });

    // Транслюємо запит на кидок та нотацію усім іншим клієнтам, щоб вони теж відтворили анімацію
    socket.on('trigger_roll', (data) => {
        socket.broadcast.emit('remote_roll', data);
    });

    socket.on('commit_roll', (data) => {
        const rollData = {
            ...data,
            time: new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        
        rollHistory.push(rollData);
        if (rollHistory.length > 100) rollHistory.shift();

        io.emit('new_roll_log', rollData);
    });

    socket.on('disconnect', () => {
        const name = connectedPlayers[socket.id];
        if (name) {
            delete connectedPlayers[socket.id];
            io.emit('update_players', Object.values(connectedPlayers));
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущено! Підключайтесь за адресою: http://0.0.0.0:${PORT}`);
});