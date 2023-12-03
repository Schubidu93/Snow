// Erstelle eine Funktion, die das Widget erstellt und zurückgibt
async function createSnowWidget() {
    // Erstelle ein neues Widget
    let widget = new ListWidget();

    // Setze den Hintergrund des Widgets auf eine beliebige Farbe
    widget.backgroundColor = new Color("#4682B4");

    // Setze die Textfarbe auf Weiß
    let textColor = Color.white();
    widget.textColor = textColor;

    // Erstelle eine URL zu der Webseite, von der du die Schneehöhe abrufen willst
    let url = "https://www.hnd.bayern.de/schnee/inn/muenchen-stadt-10865";

    // Lade den Inhalt der Webseite als Text
    let html = await new Request(url).loadString();
    // console.log(html)
    // Suche nach dem Element, das die Schneehöhe enthält
    let regex = /Schneehöhe vom .* Uhr: <b>(\d+)<\/b> cm/;

    // Extrahiere die Schneehöhe aus dem Text
    let match = regex.exec(html);
    console.log(match);
    // Überprüfe, ob die Schneehöhe gefunden wurde
    if (match) {
        // Speichere die Schneehöhe als Zahl
        let snowHeight = parseInt(match[1]);
        console.log(snowHeight);

        // Füge winterliche Emojis dem Text hinzu
        let snowEmoji = "❄️";
        let snowmanEmoji = "⛄️";
        let textWithEmojis = `${snowEmoji} Aktuelle Schneehöhe: ${snowHeight} cm ${snowmanEmoji}`;

        // Füge den Text mit Emojis dem Widget hinzu
        let textItem = widget.addText(textWithEmojis);
        textItem.font = Font.boldSystemFont(16); // Ändere die Schriftgröße nach Bedarf
    } else {
        // Erstelle einen Text für das Widget, wenn die Schneehöhe nicht gefunden wurde
        let text = "Die Schneehöhe konnte nicht abgerufen werden.";

        // Füge den Text dem Widget hinzu
        widget.addText(text);
    }

    // Zeige das aktualisierte Widget an
    Script.setWidget(widget);
    Script.complete();

    // Gib das Widget zurück
    return widget;
}

// Exportiere die Funktion, damit sie in anderen Skripten verwendet werden kann
module.exports = {
    createSnowWidget
};
