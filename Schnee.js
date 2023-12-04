(async () => {
    let widget = new ListWidget();
    widget.backgroundColor = new Color("#4682B4"); // Hellblau für den Hintergrund

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

        let stack = widget.addStack();
        stack.layoutVertically();

        let locationText = stack.addText(`${pinEmoji} München`); // Ortsname über der Zahl
        locationText.font = Font.regularSystemFont(12); // Kleinere Schriftgröße für den Ortsnamen
        locationText.textColor = Color.white(); // Schwarzer Text

        let snowHeightStack = stack.addStack();
        snowHeightStack.layoutHorizontally();
        snowHeightStack.leftAlignContent();

        let snowHeightText = snowHeightStack.addText(snowHeight.toString()); // Schneehöhe als Zahl
        snowHeightText.font = Font.regularSystemFont(48); // Mittlere Schriftgröße für die Schneehöhe
        snowHeightText.textColor = Color.white(); // Schwarzer Text

        let cmText = stack.addText("cm"); // Einheit für die Schneehöhe
        cmText.font = Font.regularSystemFont(10); // Kleinere Schriftgröße für die Einheit
        cmText.textColor = Color.white(); // Schwarzer Text
        cmText.leftAlignText(); // Links ausrichten für die Einheitstext

        let snowInfoText = stack.addText(`Schneehöhe`); // Schneehöhe Info mit Emojis
        snowInfoText.font = Font.regularSystemFont(12); // Kleine Schriftgröße für die Schneehöhe Info
        snowInfoText.textColor = Color.white(); // Schwarzer Text
        snowInfoText.leftAlignText(); // Links ausrichten für die Info-Text

        let Extratext = stack.addText(`${snowflakeEmoji} ${snowmanEmoji}`); // Schneehöhe Info mit Emojis
        Extratext.font = Font.regularSystemFont(24); // Kleine Schriftgröße für die Schneehöhe Info
        Extratext.textColor = Color.white(); // Schwarzer Text
        Extratext.leftAlignText(); // Links ausrichten für den Emoji-Text
    } else {
        let text = "Es liegt kein Schnee oder die Daten konnten nicht abgerufen werden.";
        let textItem = widget.addText(text);
        textItem.font = Font.regularSystemFont(24); // Schriftgröße erhöht
        textItem.centerAlignText(); // Text zentrieren
        textItem.textColor = Color.white(); // Schwarzer Text
    }

    Script.setWidget(widget);
    Script.complete();
})();