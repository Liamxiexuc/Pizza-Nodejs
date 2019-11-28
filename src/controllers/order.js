const Order = require("../models/order");
const User = require('../models/user');

async function addOrder(req, res) {
  const {
    orderStatus,
    orderTotalPrice,
    payStatus,
    receiverAddress,
    receiverName,
    receiverPhone
  } = req.body;

  const order = new Order({
    orderStatus,
    orderTotalPrice,
    payStatus,
    receiverAddress,
    receiverName,
    receiverPhone
  });
  await order.save();
  return res.json(order);
}

async function getOrder(req, res) {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("user", "firstName lastName")
    .exec();

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
    receiverPhone
  } = req.body;

  const newOrder = await Order.findByIdAndUpdate(
    id,
    {
      orderStatus,
      orderTotalPrice,
      payStatus,
      receiverAddress,
      receiverName,
      receiverPhone
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

  await User.updateMany(
    {
      _id: { $in: order.user }
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
