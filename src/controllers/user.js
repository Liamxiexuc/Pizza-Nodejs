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
  if (validatePassword.error) {
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
  const token = generateToken(user._id, user.userType);
  return res.json({ email, token });
}

async function getUser(req, res) {
  const { id } = req.params;

  const user = await User.findById(id)
    .populate("orders", "orderStatus orderTotalPrice dishes")
    .exec();

  if (!user) {
    return res.status(404).json("user not found");
  }

  return res.json(user);
}

async function getAllUsers(req, res) {
  const users = await User.find()
    .populate("orders", "orderStatus orderTotalPrice dishes")
    .exec();
  return res.json(users);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    title,
    gender,
    phone,
    birthDay,
    address
  } = req.body;

  const newUser = await User.findByIdAndUpdate(
    id,
    { firstName, lastName, title, gender, phone, birthDay, address },
    {
      new: true    // return the updated object
    }
  );

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json("user not found");
  }

  return res.json(newUser);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id).exec();

  if (!user) {
    return res.status(404).json("user not found");
  }
  //delete all orders
  await Order.deleteMany({ userId: user._id });
  return res.sendStatus(200);
}

// PUT /api/users/:id/userType
async function updateUserType(req, res) {
  const { id } = req.params;
  const { userType } = req.body;
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(404).json("user not found");
  }
  const newUserType = await User.findByIdAndUpdate(
    id,
    {
      userType
    },
    {
      new: true
    }
  ).exec();

  return res.json(newUserType);
}

//GET /api/users/:id/orders
async function getAllOrdersByUserId(req, res) {
  const { id: userId } = req.params;
  const orders = await Order.find({ userId }).exec();
  return res.json(orders);
}

module.exports = {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllOrdersByUserId,
  updateUserType
};
