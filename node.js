const express = require('express'); // Express on Node.js:n web-sovelluskehys
const fs = require('fs'); // Moduuli tiedostojen lukemiseen ja kirjoittamiseen
const path = require('path'); // Moduuli polkujen käsittelyyn
const http = require('http'); // Moduuli HTTP-palvelimen luomiseen
const { Server } = require('socket.io');  // Moduuli reaaliaikaiseen viestintään

const app = express(); // Luo uusi Express-sovellus
const server = http.createServer(app); // Luo uusi HTTP-palvelin
const io = new Server(server); // Luo uusi Socket.IO -palvelin
const port = process.env.PORT || 3000; // Portti, jota käytetään


// Tarjoile staattiset tiedostot (esim. CSS, JavaScript)
app.use(express.static('public'));

app.get('/henkilosto.json', (req, res) => { // Lähetä henkilöstötiedot JSON-muodossa
  fs.readFile('henkilosto.json', (err, data) => { // Lue tiedosto
    if (err) throw err; // Jos virhe, heitä poikkeus
    res.contentType('application/json'); // Aseta oikea Content-Type
    res.send(data); // Lähetä tiedot
  });
});

// Reaaliaikainen chat-toiminnallisuus
io.on('connection', (socket) => { // Kun käyttäjä yhdistää
  console.log('Käyttäjä yhdistetty'); // Kirjoita konsoliin, että käyttäjä on yhdistänyt

  socket.on('chat message', (msg) => { // Kun palvelin saa viestin
    io.emit('chat message', msg); // Lähetä viesti kaikille käyttäjille
  });

  socket.on('disconnect', () => { 
    console.log('Käyttäjä katkaissut yhteyden');
  });
});

// Lähetä yksi HTML-sivu kaikille reiteille, paitsi jos määritelty toisin
app.get('*', (req, res) => { // Tähti (*) tarkoittaa kaikkia reittejä
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Lähetä HTML-sivu
});

server.listen(port, () => { // Käynnistä palvelin
  console.log(`Palvelin käynnissä portissa ${port}`); // Kirjoita konsoliin, että palvelin on käynnistynyt
});