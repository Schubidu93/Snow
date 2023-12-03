const url = "https://www.hnd.bayern.de/schnee/inn/muenchen-stadt-10865/tabelle";

// Funktion zum Herunterladen der Webseite
async function downloadPage(url) {
  const request = new Request(url);
  return await request.loadString();
}

// Funktion zum Extrahieren der Daten aus dem HTML
function extractDataFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const table = doc.querySelector("table.tblsort tbody");
  const rows = table.querySelectorAll("tr.row");

  const data = [];

  // Gehe durch jede Zeile und extrahiere Datum und Schneehöhe
  rows.forEach(row => {
    const columns = row.querySelectorAll("td");
    const date = columns[0].textContent.trim();
    const snowHeight = parseInt(columns[1].textContent.trim());

    data.push({ date, snowHeight });
  });

  // Gib die extrahierten Daten zurück
  return data.slice(0, 10); // Gib die letzten 10 Einträge zurück
}

// Funktion zum Erstellen des Widget-Inhalts
async function createWidget() {
  const html = await downloadPage(url); // Hier wird 'await' verwendet, daher muss die Funktion 'async' sein
  const data = extractDataFromHTML(html);

  const widget = new ListWidget();
  widget.addText("Schneehöhe in München");

  // Erstelle eine Tabelle im Widget für die Datenanzeige
  const table = widget.addTable(["Datum", "Schneehöhe"]);
console.log(table)
  // Füge die Daten zur Tabelle im Widget hinzu
  data.forEach(entry => {
    const row = table.addRow();
    row.addText(entry.date);
    row.addText(entry.snowHeight.toString());
  });

  return widget;
}

async function main() {
  const widget = await createWidget(); // 'await' wird hier verwendet, daher sollte auch diese Funktion 'async' sein
  if (config.runsInWidget) {
    Script.setWidget(widget);
  } else {
    widget.presentMedium();
  }
}

// Starte die Hauptfunktion
main();
