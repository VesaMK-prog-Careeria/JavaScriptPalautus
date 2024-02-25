
$(document).ready(function() { // Kun sivu on ladattu, suorita tämä
    $('#darktheme').click(function() { // Kun darktheme-nappia painetaan, suorita tämä
        $('body').toggleClass('dark-mode'); 
        $('table').toggleClass('dark-mode');
        $('th').toggleClass('dark-mode');
        $('td').toggleClass('dark-mode');
        $('h2').toggleClass('dark-mode');
        $('chat').toggleClass('dark-mode');

    });
    $('#etusivu').click(function() {
        $('#main_alue').html('Tervetuloa yrityksemme kotisivulle!');
    });

    $('#yritysesittely').click(function() {
        $('#main_alue').html('<h2>Yritysesittely</h2><p>Olemme yritys...</p>');
    });

    $('#yhteystiedot').click(function() {
        $('#main_alue').html('<h2>Yhteystiedot</h2><p>Löydät meidät täältä</p><p>Puhelin: 123456789</p><p>Sähköposti:maija.meikalainen@yritys.fi</p>');
        $('#main_alue').append('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3213.398889116665!2d26.941075152854186!3d60.46690718051227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfi!2sfi!4v1707650585022!5m2!1sfi!2sfi" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>');
    });

    $('#henkilokunta').click(function() {
        $.getJSON('/henkilosto.json', function(data) { // Hae henkilöstötiedot JSON-tiedostosta
            var isDarkMode = $('body').hasClass('dark-mode'); // Tarkista, onko dark mode päällä
            var henkilosto = '<h2>Henkilökunta</h2><table><tr><th>Nimi</th><th>Tehtävä</th></tr>'; // Luo taulukko
            $.each(data, function(_key, val) { // Käy JSON-tiedosto läpi
                henkilosto += '<tr><td>' + val.nimi + '</td><td>' + val.tehtava + '</td></tr>'; // Lisää taulukkoon henkilön nimi ja tehtävä
            });
            henkilosto += '</table>'; // Sulje taulukko
            $('#main_alue').html(henkilosto); // Lisää taulukko sivulle

            if (isDarkMode) { // Jos dark mode on päällä
                $('table').addClass('dark-mode'); // Lisää taulukolle dark mode -tyyli
                $('th').addClass('dark-mode'); // Lisää otsikoille dark mode -tyyli
                $('td').addClass('dark-mode'); // Lisää soluille dark mode -tyyli
                $('h2').addClass('dark-mode'); // Lisää otsikolle dark mode -tyyli
            }
        });
    });
});
$(function () { 
    var socket = io(); // Luo yhteys palvelimeen
    var user = ''; // Nimimerkkiä varten

    // Kysy nimimerkkiä vain kerran, kun chat avataan ensimmäistä kertaa
    $('#avaaChat').one('click', function() {
        user = window.prompt('Anna nimimerkki:'); 
        if (user) { // Lähetä liittymisviesti vain, jos käyttäjänimi on annettu
            socket.emit('chat message', user + " liittyi keskusteluun.");
        }
        //$('#chat').slideToggle('slow');
    });

    // Muuta nappulan toimintaa niin, että se vain avaa/sulkee chatin
    // eikä kysy nimimerkkiä uudelleen
    $('#avaaChat').click(function() {
        $('#chat').slideToggle('slow');
    });

    $('form').submit(function(e) {
        e.preventDefault(); // Estää lomakkeen lähetyksen
        // Tarkista onko käyttäjänimi asetettu ennen viestin lähetystä
        if (user && $('#input').val().trim() !== '') { // Lähetä viesti vain, jos käyttäjänimi on annettu ja viestissä on tekstiä
            socket.emit('chat message', user + ' kirjoitti: ' + $('#input').val()); // Lähetä viesti palvelimelle
            $('#input').val(''); // Tyhjennä tekstikenttä
        }
        return false; 
    });

    socket.on('chat message', function(msg) { // Kun palvelin lähettää viestin
        $('#messages').append($('<li>').text(msg)); // Lisää viesti sivulle
        window.scrollTo(0, document.body.scrollHeight); // Vieritä sivu alaspäin, jotta uusin viesti näkyy
    });
});

