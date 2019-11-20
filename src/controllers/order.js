const Order = require("../models/order");

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

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json("order not found");
  }

  return res.json(order);
}

async function getAllOrders(req, res) {
  const orders = await Order.find();
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
  );

  if (!newOrder) {
    return res.status(404).json("order not found");
  }

  return res.json(newOrder);
}

async function deleteOrder(req, res) {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    return res.status(404).json("order not found");
  }
  return res.sendStatus(200);
}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
