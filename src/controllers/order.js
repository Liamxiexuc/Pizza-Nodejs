const Order = require("../models/order");

async function addOrder(req, res) {
  const order = new Order({
    orderStatus: "processing",
    orderTotalPrice: "123",
    payStatus: "Paid",
    receiverAddress: "12 qwee St",
    receiverName: "James",
    receiverPhone: "0404380038"
  });
  await order.save();
  return res.json(order);
}

function getOrder(req, res) {}

async function getAllOrders(req, res) {
  const orders = await Order.find();
  return res.json(orders);
}

function updateOrder(req, res) {}

function deleteOrder(req, res) {}

module.exports = {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
