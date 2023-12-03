(async () => {
    let widget = new ListWidget();
    widget.backgroundColor = new Color("#4682B4");
    let textColor = Color.white();
    widget.textColor = textColor;

    let url = "https://www.hnd.bayern.de/schnee/inn/muenchen-stadt-10865";
    let html = await new Request(url).loadString();
    
    let regex = /Schneehöhe vom .* Uhr: <b>(\d+)<\/b> cm/;
    let match = regex.exec(html);
    
    if (match) {
        let snowHeight = parseInt(match[1]);

        let snowEmoji = "❄️";
        let snowmanEmoji = "⛄️";
        let textWithEmojis = `${snowEmoji} Aktuelle Schneehöhe: ${snowHeight} cm ${snowmanEmoji}`;

        let textItem = widget.addText(textWithEmojis);
        textItem.font = Font.boldSystemFont(16);
    } else {
        let text = "Die Schneehöhe konnte nicht abgerufen werden.";
        widget.addText(text);
    }

    Script.setWidget(widget);
    Script.complete();
})();
