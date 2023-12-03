(async () => {
    let widget = new ListWidget();
    widget.backgroundColor = new Color("#E0FFFF"); // Hellblau für den Hintergrund

    // Schneemann Emoji und Schneeflocke Emoji
    let snowmanEmoji = "⛄️";
    let snowflakeEmoji = "❄️";

    let url = "https://www.hnd.bayern.de/schnee/inn/muenchen-stadt-10865";
    let html = await new Request(url).loadString();
    
    let regex = /Schneehöhe vom .* Uhr: <b>(\d+)<\/b> cm/;
    let match = regex.exec(html);
    
    if (match) {
        let snowHeight = parseInt(match[1]);

        let snowMessage = `Aktuelle Schneehöhe in München: ${snowHeight} cm ${snowflakeEmoji} ${snowmanEmoji}`;

        let textItem = widget.addText(snowMessage);
        textItem.font = Font.boldSystemFont(24); // Schriftgröße erhöht
        textItem.centerAlignText(); // Text zentrieren
        textItem.textColor = Color.black(); // Schwarzer Text
    } else {
        let text = "Es liegt kein Schnee oder die Daten konnten nicht abgerufen werden.";
        let textItem = widget.addText(text);
        textItem.font = Font.boldSystemFont(20); // Schriftgröße erhöht
        textItem.centerAlignText(); // Text zentrieren
        textItem.textColor = Color.black(); // Schwarzer Text
    }

    Script.setWidget(widget);
    Script.complete();
})();
