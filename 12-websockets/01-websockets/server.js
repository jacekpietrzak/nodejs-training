// import ws from "ws";
// zamiast importowac cale ws zaimportujemy tylko WebSocketServer z tej paczki
import { WebSocketServer } from "ws";

import { nanoid } from "nanoid";

// tworzymy nowa instancje obiektu WebSocketServer. Tworzymy serwer websocket. Przez to ze go wywolalismy za pomoca () znaczy ze wywolalismy jego konstruktor.
const server = new WebSocketServer({ port: 1337 });

// stworzymy mape klientow do przechowywania wszystkich klientow z id
const clients = new Map();

// mamy nasz serwer to teraz dodamy reagowanie na rozne wydarzenia. Takie event listenery. Na jakies wydarzenie wywolamy callback function. W tym przypadku polaczymy sie do socketa
server.on("connection", (socket) => {
  // socket to nasz klient
  // podczas logowania nadajemy kazdemy klientowi unikalne id
  const clientId = nanoid();
  // w terminalu wypisujemy wiadomosc kto sie polaczyl.
  console.log(`Connected ${clientId}`);

  // jesli sie polaczymy to wyslemy wiadomosc powitalna dla tego uzytkownika.
  socket.send(`Hello ${clientId}`);

  // dodajemy uzytkownika do naszej mapy klientow.
  clients.set(clientId, socket);

  // wysylamy wiadomosc do wszystkich klientow kto sie polaczyl.
  [...clients.values()].forEach((client) =>
    client.send(`${clientId} connected`)
  );

  // dodajemy obsluge wiadomosci z frontendu. Mamy socketa i jesli od niego dostaniemy wiadomosc to ta wiadomosc zamieniamy na stringa.
  socket.on("message", (data) => {
    const msg = data.toString();

    // ustalamy payload ze ta osoba wyslala taka wiadomosc
    const payload = `[${clientId}] wrote: ${msg}`;

    console.log(`Received message: ${payload}`); // data dostajemy w formacie buffer wiec aby ja przeczytac musimy przekonwertowac ja na string

    // wysylamy ta sama wiadomosc do wszystkich klientow
    [...clients.values()].forEach((client) => client.send(payload));
  });
});
