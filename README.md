# Chameleon Chess

This repository contains the board game Chameleon Chess in several forms:

- React Native App for iOS and Android
- React Web App
- CLI for using the game logic in other scripts e.g. Python
- Web Server to distribute the Web App and offer other functionalities over the web

## Further Reading

- Rules of Chameleon Chess in [english](docs/game/en.md) and [german](docs/game/de.md)
- [Project Overview](docs/project-overview.md)
- rules for [Development](docs/development.md)

## TODOs:

- [ ] General:
  - [ ] Testing für Logic fertigstellen
  - [ ] Snapshot Testing für Components einrichten
  - [ ] Settings definieren => Sound, Music, Language
  - [ ] Documentation for Logic (TypeDoc) migrieren
- [ ] WebApp:
  - [ ] Views:
    - [ ] Home (Protrait)
    - [ ] Game (Protrait)
    - [ ] Setup (Protrait)
    - [ ] Settings (Protrait)
    - [ ] About (Protrait)
    - [ ] Landscape-Mode umsetzen
  - [ ] Settings mittels Context ausliefern
- [ ] Docs:
  - [ ] Rules for Development: Coding Conventions etc.
  - [ ] Project Overview erweitern
  - [ ] Installation and Usage
- [ ] CLI:
  - [ ] Umsetzung recherchieren
  - [ ] Messages definieren
  - [ ] Wie könnte man es Testen?
- [ ] MobileApps:
  - [ ] ios and android projects einfügen
  - [ ] Metro Konfiguration
  - [ ] zentralen Einstieg einrichten (index.tsx)
  - [ ] RNComponents ausprobieren
  - [ ] Views:
    - [ ] Home (Protrait)
    - [ ] Game (Protrait)
    - [ ] Setup (Protrait)
    - [ ] Settings (Protrait)
    - [ ] About (Protrait)
    - [ ] Landscape-Mode umsetzen
- [ ] Aussicht:
  - [ ] Tutorial
  - [ ] WebServer
  - [ ] Auslierfung der WebApp über Server
  - [ ] Sounds
  - [ ] Lokalisierungen
  - [ ] DockerImage für WebServer?