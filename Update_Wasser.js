// Stelle eine Verbindung mit GitHub her und überprüfe auf Aktualisierungen
async function checkGitHubForUpdates() {
    let githubFileURL = "https://raw.githubusercontent.com/Schubidu93/Scriptable/main/Wassertemperatur_BW.js";

    try {
        let req = new Request(githubFileURL);
        let currentCode = importModule("Schnee");
        let newCode = await req.loadString();

        if (newCode !== currentCode) {
            // Wenn der Code sich geändert hat, aktualisiere das Widget
            await updateWidgetWithNewCode(newCode);
        }
    } catch (error) {
        console.error("Fehler beim Überprüfen auf Aktualisierungen:", error);
    }
}

// Funktion zum Aktualisieren des Widget-Codes
async function updateWidgetWithNewCode(newCode) {
    try {
        let fm = FileManager.local();
        let scriptableDir = fm.documentsDirectory();
        let widgetPath = scriptableDir + "/Wassertemperatur_BW.js";

        // Speichere den neuen Code in der lokalen Datei
        fm.writeString(widgetPath, newCode);

        // Lade das aktualisierte Skript in Scriptable
        let updatedScript = importModule(widgetPath);
        await updatedScript.main(); // Starte das aktualisierte Skript
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Widget-Codes:", error);
    }
}

// Führe die Überprüfung auf Aktualisierungen aus
await checkGitHubForUpdates();
