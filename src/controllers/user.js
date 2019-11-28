const User = require("../models/user");
const Order = require("../models/order");
const { generateToken } = require("../utils/jwt");
const validation = require("../middleware/validation");

async function addUser(req, res) {
  const {
    firstName,
    lastName,
    email,
    password,
    orders,
    title,
    gender,
    phone,
    birthDay,
    address,
    userType
  } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json("User already exist");
  }
  // password format validation
  const validatePassword = validation(password);
  if (!validatePassword) {
    return res.status(400).json("Invalid password format");
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    orders,
    title,
    gender,
    phone,
    birthDay,
    address,
    userType
  });

  await user.hashPassword();
  await user.save();
  const token = generateToken(user._id);
  return res.json({ email, token });
}

async function getUser(req, res) {
  const { id } = req.params;

  const user = await User.findById(id)
    .populate("orders", "orderStatus orderTotalPrice")
    .exec();

  if (!user) {
    return res.status(404).json("user not found");
  }

  return res.json(user);
}

async function getAllUsers(req, res) {
  const users = await User.find().exec();
  return res.json(users);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
    orders,
    title,
    gender,
    phone,
    birthDay,
    address,
    userType
  } = req.body;

  /* The method below can not do validation when update data.
  const newUser = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, email, title, gender, phone, birthDay, address },
    {
      new: true
    }
  );
  */

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json("user not found");
  }
  // email check
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json("User already exist");
  }
  // password format validation
  const validatePassword = validation(password);
  if (!validatePassword) {
    return res.status(400).json("Invalid password format");
  }

  user.overwrite({
    ...user,
    firstName,
    lastName,
    email,
    password,
    orders,
    title,
    gender,
    phone,
    birthDay,
    address,
    userType
  });
  await user.save();

  return res.json(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id).exec();

  if (!user) {
    return res.status(404).json("user not found");
  }
  //delete all orders
  await Order.deleteMany({ user: user._id });
  return res.sendStatus(200);
}

// POST /api/users/:id/orders/:orderID
async function addOrder(req, res) {
  const { id, orderId } = req.params;

  const user = await User.findById(id).exec();
  const order = await Order.findById(orderId).exec();
  if (!user || !order) {
    return res.status(404).json("user or order not found");
  }
  user.orders.addToSet(order._id);
  order.user = user;
  await user.save();
  await order.save();
  //并发存储
  // async.parallel([ user.save(), order.save() ]);

  return res.json(user);
}

async function deleteOrder(req, res) {
  const { id, orderId } = req.params;

  const user = await User.findById(id).exec();
  const order = await Order.findById(orderId).exec();
  if (!user || !order) {
    return res.status(404).json("user or order not found");
  }
  const oldCount = user.orders.length;
  user.orders.pull(order._id);
  if (user.orders.length === oldCount) {
    return res.status(404).json("The order does not exist");
  }
  await user.save();
  await Order.findByIdAndDelete(orderId).exec();
  return res.json(user);
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addOrder,
  deleteOrder
};
