const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Tarjoile staattiset tiedostot (esim. CSS, JavaScript)
app.use(express.static('public'));

app.get('/henkilosto.json', (req, res) => {
  fs.readFile('henkilosto.json', (err, data) => {
    if (err) throw err;
    res.contentType('application/json');
    res.send(data);
  });
});

// Lähetä yksi HTML-sivu kaikille reiteille
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Palvelin käynnissä portissa ${port}`));
