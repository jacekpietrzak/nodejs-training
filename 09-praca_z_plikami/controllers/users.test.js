const { createUser, getAllUsers } = require("./users");
const { User } = require("../models/user.js");
const { connectDataBase } = require("./startup/database.js");

describe("Testing user controllers", () => {
  // czyscimy baze danych przed wszystkimi testami
  beforeAll(async () => {
    connectDataBase();
    User.deleteMany();
  });

  // albo czyscimy baze danych przed kazdym pojedynczym testem
  beforeEach(async () => {
    User.deleteMany();
  });

  it("should create user", async () => {
    //utworz usera
    const user = await createUser("user@email.com", "30", "password", "user");

    //sprawdz czy user istnieje
    const users = await getAllUsers();

    expect(createUser("user@email.com", "30", "password", "user"));
  });
});
