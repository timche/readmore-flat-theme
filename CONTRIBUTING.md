# Contributing

## Dependencies

Folgende Dependencies sollten auf der Maschine installiert sein:
* Git
* Node.js
* npm
* gulp.js

Bei einer Installation von Node.js über die Binary wird npm bereits mitgeliefert. npm wird benutzt, um die benötigten npm Packages zu installieren.
* gulp.js `npm install gulp -g`

## Installation

1. Repository forken
2. Geforkte Repository klonen
3. Alle benötigten Dependencies in der lokalen Repository via `npm install` installieren

## Building

Diese Repository verwendet Gulp.js für einen automatisierten Entwicklungsprozess.

### Gulp Tasks

#### `gulp`

`gulp` ist unsere Haupttask und wird für unsere Entwicklung verwendet. Er erstellt einen `dist` Ordner und kompiliert alle Dateien aus dem `src` Ordner. Zudem überwacht er während der Entwicklung alle relevanten Dateien auf Änderungen und führt die passende Task automatisch aus, um die geänderten Dateien in `dist` zu aktualisieren.

### `gulp build`

`gulp build` generiert einen Build der Production Ready ist. Dabei werden die Dateien minifiziert und anschließend vom `dist`Ordner eine ZIP-Datei erstellt.

## Extension testen

### Google Chrome
1. "Erweiterungen" öffnen 
2. Entwicklermodus aktivieren
3. `dist`Ordner in das "Erweiterungen"-Fenster schieben

## Contributing

1. Neuen Branch baseriend vom `master` Branch erstellen und sinnvoll benennen (Ein Branch pro Fix/Feature)
2. Änderungen machen
3. Änderungen comitten mit detailierter Beschreibung was geändert wurde
4. Pull Request machen mit dem `master` Branch als Base (Vorher überprüfen ob der neue Branch mit dem `master` Branch aktuell ist)
