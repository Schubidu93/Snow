(async () => {
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

    // Funktion zum Erstellen des Widget-Inhalts
    async function createWidget() {
        const html = await downloadPage(url);
        const snowHeights = await extractSnowHeight(html);

        const widget = new ListWidget();
        const chart = new Chart(500, 300);
        chart.addBarSeries(snowHeights, { color: Color.blue() });

        widget.backgroundImage = chart.getImage();
        widget.url = url; // Verlinkt das Widget auf die Webseite für weitere Details

        return widget;
    }

    const widget = await createWidget();
    Script.setWidget(widget);
    Script.complete();
})();
