const Order = require("../models/order");
const User = require("../models/user");
const Dish = require("../models/dish");
const mongoose = require("mongoose");

async function addOrder(req, res) {
  let {
    orderStatus,
    orderTotalPrice,
    payStatus,
    receiverAddress,
    receiverName,
    receiverPhone,
    userId,
    comment,
    dishes
  } = req.body;

  // trans dishId type from string to ObjectId
  const items = [];
  dishes.forEach(dish => {
    let { productName, price, quantity, dishID } = dish;
    dishID = mongoose.Types.ObjectId(dishID);
    const item = {
      dishID,
      productName,
      price,
      quantity
    };
    items.push(item);
  });
  dishes = items;
  // trans userId type from string to ObjectId
  userId = mongoose.Types.ObjectId(userId);

  const order = new Order({
    orderStatus,
    orderTotalPrice,
    payStatus,
    receiverAddress,
    receiverName,
    receiverPhone,
    userId,
    comment,
    dishes
  });
  await order.save();

  // add the order to user
  const user = await User.findById(userId).exec();

  user.orders.addToSet(order._id);
  await user.save();

  return res.json(order);
}

async function getOrder(req, res) {
  const { id } = req.params;

  const order = await Order.findById(id).exec();

  if (!order) {
    return res.status(404).json("order not found");
  }

  return res.json(order);
}

async function getAllOrders(req, res) {
  const orders = await Order.find().exec();
  return res.json(orders);
}

async function updateOrder(req, res) {
  const { id } = req.params;

  const {
    orderStatus,
    orderTotalPrice,
    payStatus,
    receiverAddress,
    receiverName,
    receiverPhone,
    userId,
    comment,
    dishes
  } = req.body;

  // trans dishId type from string to ObjectId
  const items = [];
  dishes.forEach(dish => {
    let { productName, price, quantity, dishID } = dish;
    dishID = mongoose.Types.ObjectId(dishID);
    const item = {
      dishID,
      productName,
      price,
      quantity
    };
    items.push(item);
  });
  dishes = items;
  // trans userId type from string to ObjectId
  userId = mongoose.Types.ObjectId(userId);

  const newOrder = await Order.findByIdAndUpdate(
    id,
    {
      orderStatus,
      orderTotalPrice,
      payStatus,
      receiverAddress,
      receiverName,
      receiverPhone,
      userId,
      comment,
      dishes
    },
    {
      new: true
    }
  ).exec();

  if (!newOrder) {
    return res.status(404).json("order not found");
  }

  return res.json(newOrder);
}

async function deleteOrder(req, res) {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id).exec();

  if (!order) {
    return res.status(404).json("order not found");
  }

  await User.updateOne(
    {
      _id: order.user
    },
    {
      $pull: { orders: order._id }
    }
  ).exec();
  return res.sendStatus(200);
}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
