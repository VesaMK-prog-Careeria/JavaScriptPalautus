
$(document).ready(function() {
    $('#darktheme').click(function() {
        $('body').toggleClass('dark-mode');
        $('table').toggleClass('dark-mode');
        $('th').toggleClass('dark-mode');
        $('td').toggleClass('dark-mode');
        $('h2').toggleClass('dark-mode');
    });
    $('#etusivu').click(function() {
        $('#main_alue').html('Tervetuloa yrityksemme kotisivulle!');
    });

    $('#yritysesittely').click(function() {
        $('#main_alue').html('<h2>Yritysesittely</h2><p>Olemme yritys...</p>');
    });

    $('#yhteystiedot').click(function() {
        $('#main_alue').html('<h2>Yhteystiedot</h2><p>Voit löytää meidät...</p>');
    });

    $('#henkilokunta').click(function() {
        $.getJSON('/henkilosto.json', function(data) {
            var henkilosto = '<h2>Henkilökunta</h2><table><tr><th>Nimi</th><th>Tehtävä</th></tr>';
            $.each(data, function(key, val) {
                henkilosto += '<tr><td>' + val.nimi + '</td><td>' + val.tehtava + '</td></tr>';
            });
            henkilosto += '</table>';
            $('#main_alue').html(henkilosto);
        });
    });
});
$(function () {
    var socket = io();
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
        if (user && $('#input').val().trim() !== '') {
            socket.emit('chat message', user + ' kirjoitti: ' + $('#input').val());
            $('#input').val('');
        }
        return false;
    });

    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });
});

