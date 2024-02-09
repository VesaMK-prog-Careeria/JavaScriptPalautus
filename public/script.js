
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


