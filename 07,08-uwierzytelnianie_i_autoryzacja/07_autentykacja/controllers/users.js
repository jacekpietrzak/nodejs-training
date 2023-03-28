/** definiujemy nasz kontroler czyli cos co tworzy nam usera. */

const { User, hashPassword } = require("../models/user.js");

const createUser = async (email, age, password) => {
  const hashedPassword = hashPassword(password);
  const newUser = new User({ email, age, password: hashedPassword });
  await newUser.save();
  return newUser;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

const deleteUser = async (id) => {
  return User.findByIdAndRemove({ _id: id });
};

const updateUser = async (id, newData) => {
  const updatedUser = await User.findOneAndUpdate({ _id: id }, newData);
  console.log("updatedUser: ", updatedUser);
  return updatedUser;
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
};
