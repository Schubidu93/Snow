// Widget-Parameter
const widgetParameter = args.widgetParameter;

// Webseite laden und HTML parsen
const url = 'https://www.wassertemperaturen.net/baden-wuerttemberg/stadtsee_bad_waldsee.html';
const req = new Request(url);
const res = await req.loadString();
const regex = /<P CLASS="strandtemp">(\d+)&deg;C<\/P>/;
const match = res.match(regex);

let wassertemperatur = 'N/A';
if (match && match.length > 1) {
    wassertemperatur = match[1] + '°C';
}

// Widget anzeigen
let widget = new ListWidget();
widget.addText('Wassertemperatur:');
widget.addSpacer(4);
widget.addText(wassertemperatur);
widget.presentMedium();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentSmall();
}
Script.complete();
