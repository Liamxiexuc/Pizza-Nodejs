const User = require("../models/user");
const Order = require("../models/order");

async function addUser(req, res) {
  const {
    firstName,
    lastName,
    email,
    title,
    gender,
    phone,
    birthDay,
    address
  } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    title,
    gender,
    phone,
    birthDay,
    address
  });
  await user.save();
  return res.json(user);
}

async function getUser(req, res) {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json("user not found");
  }

  return res.json(user);
}

async function getAllUsers(req, res) {
  const users = await User.find();
  return res.json(users);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    title,
    gender,
    phone,
    birthDay,
    address
  } = req.body;
  const newUser = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, email, title, gender, phone, birthDay, address },
    {
      new: true
    }
  );

  if (!newUser) {
    return res.status(404).json("user not found");
  }

  return res.json(newUser);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json("user not found");
  }
  return res.sendStatus(200);
}

// POST /api/users/:id/orders/:orderID
async function addOrder(req, res) {
  const { id, orderID } = req.params;

  const user = await User.findById(id);
  const order = await Order.findById(orderID);
  if (!user || !order) {
    return res.status(404).json("user or order not found");
  }
  user.orders.addToSet(order._id);
  await user.save();
  return res.json(user);
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addOrder
};
