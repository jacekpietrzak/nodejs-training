// laczymy sie z socketem
const socket = io();

// piszemy wiadomosc ze ze polaczono
socket.on("connect", () => {
  console.log("Connected");
});

// pobieramy liste w ktorej bedziemy dodawac dynamicznie wiadomosci chatu
const chatElement = document.querySelector("ul#chatList");

// funkcja tworzenia elementu chatu
const createChatMessage = (msg) => {
  const li = document.createElement("li");
  // li.innerHTML = msg; // security vulnerability
  li.textContent = msg;
  li.className = "chatElement";
  return li;
};

// obsluga wyswietlania ostatnich 10 wiadomosci
fetch("messages?last=20").then((res) =>
  res
    .json()
    .then(({ messages }) => {
      const msgElements = messages.map((msg) => createChatMessage(msg));
      const fragment = document.createDocumentFragment();
      fragment.append(...msgElements);
      chatElement.appendChild(fragment);
    })
    .catch(console.error)
);

// middleware obslugujacy zdazenie przychodzacej wiadomosci
socket.on("message", (msg) => {
  console.log(msg);
  const messageElement = createChatMessage(msg);
  chatElement.appendChild(messageElement);

  // scroll to bottom while teksting
  chatElement.scrollTop = chatElement.scrollHeight;
});

// zmiana imienia
//* dodajemu kod ktory pozwoli na zmiane imienia uzytkownika *//
socket.on("name", (name) => {
  console.log(`Your name: ${name}`);
  document.querySelector("span#name-display").textContent = name;
});
// pobieramy formularz zmiany imienia
document.querySelector("form#name-form").addEventListener("submit", (event) => {
  event.preventDefault();

  // pobieramy value z inputa
  const input = document.querySelector("input#name");
  const newName = document.querySelector("input#name").value.trim();

  if (!newName) return;
  socket.emit("name", newName);
  input.value = "";
});

// wyswietlanie ilosci uzytkownikow
// dodamy
socket.on("online", (online) => {
  document.querySelector("span#online").textContent = online;
});

// dodajemy kod ktory obsluzy wysylanie wiadomosci od klienta do serwera
// bierzemy input o id msg
const msgInput = document.querySelector("input#msg");

// bierzemy formularz o id chat i na nim robimy addEventListener ktory na event submit wysyla wiadomosc
document.querySelector("form#chat").addEventListener("submit", (event) => {
  // zapobiegamy przeladowania formularza przy submit
  event.preventDefault();

  // pobieramy wiadomosc z inputa
  const msg = msgInput.value.trim();

  // jesli niema nic w input to nie zwracamy nic
  if (!msg) return;

  // jesli jest cos w input to wysylamy wiadomosc
  // socket.send({ name, msg, date: Date.now() });
  socket.send(msg);

  // po wyslaniu wiadomosci czyscimy input
  msgInput.value = "";
});
