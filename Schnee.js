(async () => {
    let widget = new ListWidget();
    widget.backgroundColor = new Color("#E0FFFF"); // Hellblau für den Hintergrund

    let url = "https://www.hnd.bayern.de/schnee/inn/muenchen-stadt-10865";
    let html = await new Request(url).loadString();
    
    let regex = /Schneehöhe vom .* Uhr: <b>(\d+)<\/b> cm/;
    let match = regex.exec(html);
    
    if (match) {
        let snowHeight = parseInt(match[1]);

        // Schnee Emoji und Schneeflocke Emoji
        let snowflakeEmoji = "❄️";
        let snowmanEmoji = "⛄️";

        // Stecknadel-Emoji Unicode
        let pinEmoji = "\uD83D\uDCCD"; 

        
        let locationText = widget.addText(`${pinEmoji} München`); // Ortsname über der Zahl
        locationText.font = Font.boldSystemFont(12); // Kleinere Schriftgröße für den Ortsnamen
        locationText.leftAlignText(); // Text linksbündig
        locationText.textColor = Color.black(); // Schwarzer Text

        let snowHeightText = widget.addText(snowHeight.toString() + "cm"); // Schneehöhe als Zahl
        snowHeightText.font = Font.boldSystemFont(40); // Mittlere Schriftgröße für die Schneehöhe
        snowHeightText.leftAlignText(); // Text linksbündig
        snowHeightText.textColor = Color.black(); // Schwarzer Text

        let snowInfoText = widget.addText(`Schneehöhe`); // Schneehöhe Info mit Emojis
        snowInfoText.font = Font.boldSystemFont(12); // Kleine Schriftgröße für die Schneehöhe Info
        snowInfoText.leftAlignText(); // Text linksbündig
        snowInfoText.textColor = Color.black(); // Schwarzer Text

        let Extratext = widget.addText(`${snowflakeEmoji} ${snowmanEmoji}`); // Schneehöhe Info mit Emojis
        Extratext.font = Font.boldSystemFont(24); // Kleine Schriftgröße für die Schneehöhe Info
        Extratext.leftAlignText(); // Text linksbündig
        Extratext.textColor = Color.black(); // Schwarzer Text
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
