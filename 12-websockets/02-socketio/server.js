import http from "http";

import express from "express";

// importujemy server z socket.io ale nadamy mu wlasna nazwe SocketServer
import { Server as SocketServer } from "socket.io";

// Tworzenie api dla socket io
const app = express();
// tworzmy server http i przekazemy mu aplikacje expresowa
const httpServer = http.createServer(app);
// tworzymy socker server i jemu przekazujemy http server
const io = new SocketServer(httpServer);

// tworzymy middleware dla statycznych publicznych danych
app.use(express.static("public"));

//tworzymy port
const PORT = 3000;
// uruchamiamy serwer
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ...`);
});

// making last 10 messages available
// zmienna w ktorej bedziemy trzymac ostatnie 10 wiadomosci - database
const messages = [];

app.get("/messages", (req, res) => {
  const last = req.query.last || 10;

  const limit = isNaN(last) ? 10 : Math.min(last, 20);

  const lastMsgs = messages.slice(0, limit).reverse();

  res.json({ messages: lastMsgs });
});

/**
 * co chcemy zrobic:
 * - Register user upon connection
 * - Notify other users when new user is connected
 *
 * - Unregister when user drops connection
 * - Notify otehers when user i leaving
 *
 * - User can send message to everybody
 *
 * - users can change their name
 * - how many clients are connected
 */

// Tworzymy mape userow
const clients = new Map();

// tworzymy funkcje typu closures pomocnicza do wysylania wiadomosci dla wszystkich
const createBroadcaster =
  (socket) =>
  (data, event = "message") => {
    // zapisywanie wiadomosci aby pokazac ostatnie 10
    if (event === "message") messages.unshift(data);

    // wysylanie wiadomosci do wszystkich
    console.log(`${data}`);
    console.log(`active clients: (${clients.size}) `);
    socket.emit(event, data);
    socket.broadcast.emit(event, data);
  };

io.on("connection", (socket) => {
  // funkcja ktora wysyla wiadomosc do wszysktich
  const broadcast = createBroadcaster(socket);

  // Register user upon connection
  // tworzymy id
  const id = socket.id;

  // tworzymy mape klientow
  clients.set(id, id);

  // wyslemy wiadomosc do wszystkich poza socketem ktory wysyla te wiadomosc
  socket.broadcast.emit("message", `[${id}] has joined the room.`);
  console.log(`[${id}] has joined the room.`);

  // zmiana imienia
  // W momoenice kiedy klient sie polaczy wysylamy jakie ma imie
  socket.emit("name", id);
  socket.on("name", (name) => {
    // pobieramy stare imie
    const oldName = clients.get(id);

    // ustalamy nowe imie
    clients.set(id, name);
    socket.emit("name", name);
    // powiadamiamy innych o zmianie imienia
    broadcast(`${oldName} changed name to ${name}`);
  });

  // wiadomosc z serwera wyswietlana po stronie klienta
  socket.send(`hello ${id}`);

  socket.on("message", (data) => {
    // deklarujemy jak ma wygladac wiadomosc
    const msg = `[${clients.get(id)}] sent: ${data}`;
    // wyswietlamy wiadomosc z klienta po stronie serwera dla wszystkich klientow uzywajac stworzonej wczesniej funkcji createBroadcaste ktora jest przypisana do zmiennej broadcast
    broadcast(msg);
  });

  // wyswietlanie ilosci uzytkownikow
  broadcast(clients.size, "online");

  // dodajemy obsluge powiadamiania ze klient opuscil czat
  socket.on("disconnect", () => {
    // Unregister when user drops connection
    const leavingUserName = clients.get(id);
    clients.delete(id);

    // Notify otehers when user is leaving
    const msg = `[${leavingUserName}] has left the room.`;
    console.log(msg);
    broadcast(msg);

    // wyswietlanie ilosci uzytkownikow
    broadcast(clients.size, "online");
  });
});
