const url = "https://www.hnd.bayern.de/schnee/inn/muenchen-stadt-10865/tabelle";

// Funktion zum Herunterladen der Webseite
async function downloadPage(url) {
  const request = new Request(url);
  return await request.loadString();
}

// Funktion zum Extrahieren der Schneehöhe aus dem HTML
function extractSnowHeight(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const table = doc.querySelector("table.tblsort tbody");
  const rows = table.querySelectorAll("tr.row");

  const snowData = [];

  // Gehe durch jede Zeile und extrahiere Schneehöhe
  rows.forEach(row => {
    const columns = row.querySelectorAll("td");
    const snowHeight = parseInt(columns[1].textContent.trim());

    snowData.push(snowHeight);
  });

  // Gib die letzten 50 Schneehöhen zurück
  return snowData.slice(0, 50);
}

// Funktion zum Erstellen des Diagramms
async function createChart() {
  const html = await downloadPage(url);
  const snowHeights = await extractSnowHeight(html);

  const widget = new ListWidget();
  const chart = new ChartWidget(500, 300);

  // Füge Daten zum Diagramm hinzu
  chart.addBarSeries(snowHeights, { color: Color.blue() });

  widget.addText("Schneehöhe in München (Letzte 50 Werte)");
  widget.addSpacer();
  widget.setPadding(10, 10, 10, 10);
  widget.addImage(chart);

  return widget;
}

async function main() {
  const widget = await createChart();
  if (config.runsInWidget) {
    Script.setWidget(widget);
  } else {
    widget.presentMedium();
  }
}

main();
