/** definiujemy nasz kontroler czyli cos co tworzy nam usera. */

const usersStorage = [
  { id: "1", name: "Madzia", age: "36" },
  { id: "2", name: "Jacek", age: "36" },
  { id: "3", name: "Fibi", age: "36" },
];

const { User } = require("../models/user.js");

const createUser = (id, name, age) => {
  const user = new User(id, name, age);
  usersStorage.push(user);
  return user;
};

const getAllUsers = () => {
  return usersStorage;
};

const getUserById = (id) => {
  return usersStorage.find((user) => user.id === id);
};

const deleteUser = (id) => {
  // petla po tablicy userow
  for (let i = 0; i < usersStorage.length; i++) {
    // szukamy indexu uzytkownika o danym id
    if (usersStorage[i].id === id) {
      // usuwamy element z tablicy o okreslonym id
      usersStorage.splice(i, 1);
      return;
    }
  }
};

const updateUser = (id, newUser) => {
  for (let i = 0; i < usersStorage.length; i++) {
    // szukamy usera do zastapienia
    if (usersStorage[i].id === id) {
      usersStorage[i] = newUser;
    }
  }
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
};
