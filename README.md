## Mod utilizare

- `docker-compose build iglv-rn` <- run o singura data, eventual mai dai run doar daca se va mai schimba ceva in fisierele `Dockerfile` sau `docker-compose.yml`, dar probabil ca nu se va mai schimba nimic
- `docker-compose run --service-ports --remove-orphans --rm iglv-rn` <- de fiecare data cand vrei sa pornesti container-ul
- `npm install` <- run o singura data doar dupa prima pornire a containerului, sau dupa ce adaugi alte package-uri in proiect
- `expo start --tunnel` <-- Cand vrei sa pornesti aplicatia. Also, descarci aplicatia Expo Go de pe play store/app store, si din ea scanezi QR code-ul din terminal.
- daca vrei sa testezi aplicatia in browser, apesi `w` si deschizi link-ul din terminal

