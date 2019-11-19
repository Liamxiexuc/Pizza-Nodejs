const User = require("../models/user");

async function addUser(req, res) {
  const user = new User({
    firstName: "Lebron",
    lastName: "James",
    title: "Mr",
    gender: "male",
    phone: "0404380038",
    birthDay: "19940123",
    address: "157 Elizabeth St"
  });
  await user.save();
  return res.json(user);
}

function getUser(req, res) {}

async function getAllUsers(req, res) {
  const users = await User.find();
  return res.json(users);
}

function updateUser(req, res) {}

function deleteUser(req, res) {}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};
