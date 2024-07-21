# Script

![alt text](<Screenshot 2024-07-18 120457.png>)

Per installare e inizializzare localmente questo progetto full-stack che include un backend Node.js/Express e un frontend React, segui i passaggi dettagliati qui sotto. Assicurati di avere installato Node.js e npm sul tuo sistema prima di procedere.
#### Clonare il Repository

1. Apri un terminale.
2. Clona il repository del progetto utilizzando Git:
   ```sh
   git clone <URL_REPOSITORY>
   ```
   Sostituisci `<URL_REPOSITORY>` con l'URL effettivo del repository del progetto.
#### Installare le Dipendenze del Backend

3. Spostati nella directory del backend:
   ```sh
   cd backend
   ```
4. Installa le dipendenze del backend eseguendo:
   ```sh
   npm install
   ```
#### Configurare il Backend

5. Crea un file `.env` nella directory del backend per configurare le variabili d'ambiente necessarie, come il collegamento al database MongoDB, le chiavi segrete per JWT, ecc. Puoi trovare un esempio delle variabili richieste nel file `.env.example` se presente.
#### Avviare il Backend

6. Avvia il server backend in modalità sviluppo con:
   ```sh
   npm run server
   ```
   Questo comando utilizza `nodemon` per riavviare automaticamente il server ogni volta che vengono apportate modifiche ai file.
#### Installare le Dipendenze del Frontend

7. Apri un nuovo terminale e spostati nella directory del frontend:
   ```sh
   cd frontend
   ```
8. Installa le dipendenze del frontend eseguendo:
   ```sh
   npm install
   ```
#### Avviare il Frontend

9. Avvia l'applicazione frontend in modalità sviluppo con:
   ```sh
   npm run dev
   ```
   Questo comando avvierà il server di sviluppo di Vite, e dovresti essere in grado di accedere all'applicazione frontend all'indirizzo indicato nel terminale (tipicamente `http://localhost:3000`).

### Verifica

10. Apri il browser e visita l'indirizzo del frontend (es. `http://localhost:3000`). Dovresti vedere l'interfaccia utente dell'applicazione e essere in grado di interagire con essa.