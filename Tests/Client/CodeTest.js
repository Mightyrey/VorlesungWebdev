 

//Auslesen der html Seite und abfrage ob die Tabelle leer ist und dann ausgeben das noch keine Daten vorhanden sind
document.addEventListener('DOMContentLoaded', function () {
loadHTMLTable([]);
});



function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
//Abfrage ob die Tabelle leer ist
if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'> No Data </td></tr>";
    return;
    }
}
