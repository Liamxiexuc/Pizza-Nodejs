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
  await Dish.updateMany(
    { _id: { $in: order.dishs }},
    { $pull: { orders: orders._id}}
  );
  return res.sendStatus(200);
}

async function addDish(req, res) {
  const {
    id, id
  } = req.params;

  const dish = await Dish.findById(id);
  const order = await Order.findById(id);
  if(!dish || !order) {
    return res.status(404).json('order or dish not found');
  }
  order.dishs.addToSet(dish._id);
  dish.orders.addToSet(order._id);
  await order.save();
  await dish.save();
  return res.json(order);
}

async function deleteDish(req, res) {
  const {id, id} = req.params;
  const order = await Order.findById(id).exec();
  const dish = await Dish.findById(id).exec();
  if(!dish || !order) {
    return res.status(404).json('order or dish not found');
  }
  const oldCount = dish.oders.length;
  dish.orders.pull(order._id);
  if(dish.orders.length === oldCount) {
    return res.status(404).json('dish does not exist');
  }
  order.dishs.pull(dishs._id);
  await order.save();
  await dish.save();
  return res.json(dish);
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
