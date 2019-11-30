const Order = require("../models/order");
const User = require("../models/user");
const Dish = require('../models/dish');

async function addOrder(req, res) {
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

// POST /api/orders/:id/orders/:dishID
async function addDish(req, res) {
  const { id, dishId } = req.params;

  const order = await Order.findById(id).exec();
  const dish = await Dish.findById(dishId).exec();
  if (!order || !dish) {
    return res.status(404).json("order or dish not found");
  }
  order.dishes.addToSet(dish._id);
  dish.orders.addToSet(order._id);
  await order.save();
  await dish.save();

  return res.json(order);
}

async function deleteDish(req, res) {
  const { id, dishId } = req.params;

  const order = await Order.findById(id).exec();
  const dish = await Dish.findById(dishId).exec();
  if (!order || !dish) {
    return res.status(404).json("order or dish not found");
  }
  const oldDishesCount = order.dishes.length;
  const oldOrdersCount = dish.orders.length;
  order.dishes.pull(dish._id);
  dish.orders.pull(order._id);
  if (order.dishes.length === oldDishesCount) {
    return res.status(404).json("The dish does not exist");
  }
  if (dish.orders.length === oldOrdersCount) {
    return res.status(404).json("The order does not exist");
  }
  await order.save();
  await dish.save();
  return res.json(order);
}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addDish,
  deleteDish
};
