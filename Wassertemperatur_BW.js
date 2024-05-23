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
            return match[1] + '°C';
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
            return match[1].replace(',', '.') + '°C';
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
            return match[1] + '°C';
        } else {
            return 'N/A';
        }
    }

    // Hauptfunktion zur Erstellung des Widgets
    async function createWidget() {
        const tempBadWaldsee = await fetchWaterTemperatureBadWaldsee();
        const tempMuenchen = await fetchWaterTemperatureMuenchen();
        const tempFeringasee = await fetchWaterTemperatureFeringasee();
        
        let widget = new ListWidget();
        widget.backgroundColor = new Color("#4682B4"); // Hintergrundfarbe setzen
        
        let title = widget.addText('Wassertemperaturen:');
        title.textColor = Color.white();
        title.font = Font.boldSystemFont(12); // Schriftgröße des Titels auf 12 reduzieren
        widget.addSpacer(4);
        
        // Funktion zum Hinzufügen von Temperaturen mit Ausrichtung
        function addTemperatureRow(location, temperature) {
            let stack = widget.addStack();
            stack.layoutHorizontally();
            
            let locationText = stack.addText(location + ': ');
            locationText.textColor = Color.white();
            locationText.font = Font.systemFont(14); // Schriftgröße der Standortangabe auf 14 beibehalten
            
            let temperatureText = stack.addText(temperature);
            temperatureText.textColor = Color.white();
            temperatureText.font = Font.systemFont(14); // Schriftgröße der Temperaturanzeige auf 14 beibehalten
            
            widget.addSpacer(2);
        }
        
        // Temperaturen hinzufügen
        addTemperatureRow('Stadtsee', tempBadWaldsee);
        addTemperatureRow('Eisbach', tempMuenchen);
        addTemperatureRow('Feringasee', tempFeringasee);
        
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
