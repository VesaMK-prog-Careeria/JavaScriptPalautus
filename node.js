const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

// Tarjoile staattiset tiedostot (esim. CSS, JavaScript)
app.use(express.static('public'));

app.get('/henkilosto.json', (req, res) => {
  fs.readFile('henkilosto.json', (err, data) => {
    if (err) throw err;
    res.contentType('application/json');
    res.send(data);
  });
});

// Reaaliaikainen chat-toiminnallisuus
io.on('connection', (socket) => {
  console.log('Käyttäjä yhdistetty');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Käyttäjä katkaissut yhteyden');
  });
});

// Lähetä yksi HTML-sivu kaikille reiteille, paitsi jos määritelty toisin
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`);
});