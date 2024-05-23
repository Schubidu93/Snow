(async () => {
    // URLs der Webseiten mit den Wassertemperaturen
    const urlBadWaldsee = 'https://www.wassertemperaturen.net/baden-wuerttemberg/stadtsee_bad_waldsee.html';
    const urlMuenchen = 'https://www.gkd.bayern.de/de/fluesse/wassertemperatur/kelheim/muenchen-himmelreichbruecke-16515005/messwerte';
    const urlFeringasee = 'https://xn--wasserwacht-unterfhring-plc.de/feringasee/';

    // Funktion zum Laden und Parsen der Wassertemperatur von Bad Waldsee
    async function fetchWaterTemperatureBadWaldsee() {
        const req = new Request(urlBadWaldsee);
        const html = await req.loadString();
        
        const regex = /<P CLASS="strandtemp">\s*(\d+)&deg;C\s*<\/P>/;
        const match = html.match(regex);

        if (match && match.length > 1) {
            return parseFloat(match[1]).toFixed(1) + '°';
        } else {
            return 'N/A';
        }
    }

    // Funktion zum Laden und Parsen der Wassertemperatur von München Himmelreichbrücke
    async function fetchWaterTemperatureMuenchen() {
        const req = new Request(urlMuenchen);
        const html = await req.loadString();
        
        const regex = /<td\s+class="center">(\d+,\d+)<\/td>/;
        const match = html.match(regex);

        if (match && match.length > 1) {
            return parseFloat(match[1].replace(',', '.')).toFixed(1) + '°';
        } else {
            return 'N/A';
        }
    }

    // Funktion zum Laden und Parsen der Wassertemperatur von Feringasee
    async function fetchWaterTemperatureFeringasee() {
        const req = new Request(urlFeringasee);
        const html = await req.loadString();
        
        const regex = /Feringasee sind es nach dem Stand.*?<\/br><b>(\d+\.\d+)<\/b> Grad Celius im Wasser/;
        const match = html.match(regex);

        if (match && match.length > 1) {
            return parseFloat(match[1]).toFixed(1) + '°';
        } else {
            return 'N/A';
        }
    }

// Funktion zur Erstellung des Widgets
    async function createWidget() {
        // Wassertemperaturen von den verschiedenen Orten abrufen
        const tempBadWaldsee = await fetchWaterTemperatureBadWaldsee();
        const tempMuenchen = await fetchWaterTemperatureMuenchen();
        const tempFeringasee = await fetchWaterTemperatureFeringasee();
        
        // Widget erstellen
        let widget = new ListWidget();
        widget.backgroundColor = new Color("#4682B4"); // Hintergrundfarbe setzen

        // Ort und Wassertemperatur anzeigen
        let locationStack = widget.addStack();
        locationStack.layoutVertically();
        locationStack.addSpacer(); // Platzhalter für oberen Rand
        
        // Ortsname anzeigen
        let locationText = locationStack.addText("Wasser");
        locationText.font = Font.regularSystemFont(14); // Schriftgröße festlegen
        locationText.leftAlignText(); // Text linksbündig ausrichten
        locationText.textColor = Color.white(); // Textfarbe festlegen
        
        // Wassertemperaturen anzeigen
        addTemperatureRow(locationStack, 'Stadtsee', tempBadWaldsee);
        addTemperatureRow(locationStack, 'Eisbach', tempMuenchen);
        addTemperatureRow(locationStack, 'Feringasee', tempFeringasee);
        
        return widget;
    }

    // Funktion zum Hinzufügen einer Zeile mit Ortsname und Wassertemperatur
    function addTemperatureRow(stack, location, temperature) {
        let stackRow = stack.addStack();
        stackRow.layoutHorizontally();
        
        let locationText = stackRow.addText(location + ': ');
        locationText.textColor = Color.white();
        locationText.font = Font.systemFont(14);
        
        stackRow.addSpacer();
        
        let temperatureText = stackRow.addText(temperature);
        temperatureText.textColor = Color.white();
        temperatureText.font = Font.systemFont(20);
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
