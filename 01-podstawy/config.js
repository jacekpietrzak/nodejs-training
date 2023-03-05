/** w node js mozemy korzystac z globalnych zmiennych. Ona jest dostepna w calej aplikacji. Zazwyczaj robi sie plik config.js w ktorym przechowujemy globalne zmienne. */
/** najczesciej sa to zmienne sterujace, tzw feature flagi, czyli rob cos lub nierob czegos. */
/** lub jakies secrety. Np, jesli laczymy sie do jakiegos API i potrzebujemy API key zeby polaczyc sie do tego API. */
/** ogolnie taki sposob przechowywania jest bardzo bezpieczny, poniewaz te zmienne dostepne sa tylko dla tej maszyny na ktorej sa przehcowywane. */

/** np utworzymy zmienna ktora bedziemy sterowac w funkcji readFile z utils/fileSystems.js czy mozemy plik odczytywac */

const config = {
  readingEnabled: process.env.READING_ENABLED === "true" ? true : false,
  // process.env - mowi ze chcemy siegnac do zmiennych srodowiskowych. Zmienne srodowiskowe sa przechowywane na maszynie na ktorej wykonujemy nasz kod.
};

/** aby ta zmienna odczytac musimy tego .env uzyc */

module.exports = {
  config,
};
