(async () => {
// URL der Webseite mit der Wassertemperatur
const url = 'https://www.wassertemperaturen.net/baden-wuerttemberg/stadtsee_bad_waldsee.html';

// Funktion zum Laden und Parsen der Webseite
async function fetchWaterTemperature() {
    const req = new Request(url);
    const html = await req.loadString();
    const regex = /<P CLASS="strandtemp">(\d+)&deg;C<\/P>/;
    const match = html.match(regex);

    if (match && match.length > 1) {
        return match[1] + '°C';
    } else {
        return 'N/A';
    }
}

// Hauptfunktion zur Erstellung des Widgets
async function createWidget() {
    const wassertemperatur = await fetchWaterTemperature();
    
    let widget = new ListWidget();
    widget.addText('Wassertemperatur:');
    widget.addSpacer(4);
    widget.addText(wassertemperatur);
    
    return widget;
}

// Widget erstellen und anzeigen
let widget = await createWidget();
if (config.runsInWidget) {
    Script.setWidget(widget);
} else {
    widget.presentSmall();
}
Script.complete();
})();
