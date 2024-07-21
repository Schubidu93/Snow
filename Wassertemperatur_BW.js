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
            return parseFloat(match[1]);
        } else {
            return null;
        }
    }

    // Funktion zum Laden und Parsen der Wassertemperatur von München Himmelreichbrücke
    async function fetchWaterTemperatureMuenchen() {
        const req = new Request(urlMuenchen);
        const html = await req.loadString();
        
        const regex = /<td\s+class="center">(\d+,\d+)<\/td>/;
        const match = html.match(regex);

        if (match && match.length > 1) {
            return parseFloat(match[1].replace(',', '.'));
        } else {
            return null;
        }
    }

    // Funktion zum Laden und Parsen der Wassertemperatur von Feringasee
    async function fetchWaterTemperatureFeringasee() {
        const req = new Request(urlFeringasee);
        const html = await req.loadString();
        
        const regex = /Feringasee sind es nach dem Stand.*?<\/br><b>(\d+\.\d+)<\/b> Grad Celius im Wasser/;
        const match = html.match(regex);

        if (match && match.length > 1) {
            return parseFloat(match[1]);
        } else {
            return null;
        }
    }

    // Funktion zur Erstellung der Temperaturanzeige
    function createTemperatureDisplay(location, temperature, stack) {
        let row = stack.addStack();
        row.layoutHorizontally();
        
        let locationText = row.addText(location);
        locationText.textColor = Color.white();
        locationText.font = Font.regularSystemFont(12); // Schriftgröße der Ortsnamen leicht reduzieren
        locationText.leftAlignText();
        
        row.addSpacer();
        
        let tempText = row.addText(temperature !== null ? `${temperature.toFixed(1)}` : 'N/A');
        tempText.textColor = Color.white();
        tempText.font = Font.systemFont(20);
        tempText.rightAlignText();
    }

    // Hauptfunktion zur Erstellung des Widgets
    async function createWidget() {
        const tempBadWaldsee = await fetchWaterTemperatureBadWaldsee();
        const tempMuenchen = await fetchWaterTemperatureMuenchen();
        const tempFeringasee = await fetchWaterTemperatureFeringasee();
        
        let widget = new ListWidget();
        widget.backgroundColor = new Color("#4682B4"); // Hintergrundfarbe setzen
        
        // Titel
        let titleStack = widget.addStack();
        let title = titleStack.addText('Wassertemperatur');
        title.textColor = Color.white();
        title.font = Font.regularSystemFont(14); // Schriftgröße des Titels auf 14 setzen
        titleStack.addSpacer();
        widget.addSpacer(10); // Größerer Abstand nach dem Titel
        
        // Temperaturen
        let tempStack = widget.addStack();
        tempStack.layoutVertically();
        
        createTemperatureDisplay('Stadtsee', tempBadWaldsee, tempStack);
        widget.addSpacer(2);
        createTemperatureDisplay('Eisbach', tempMuenchen, tempStack);
        widget.addSpacer(2);
        createTemperatureDisplay('Feringasee', tempFeringasee, tempStack);
        
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
