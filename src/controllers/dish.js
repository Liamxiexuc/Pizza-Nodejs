const Dish = require("../models/dish");
const Order = require("../models/order");

async function addDish(req, res) {
  const {
    productName,
    price,
    productType,
    productInfo,
    photo,
    category
  } = req.body;
/*
  const existDish = await Dish.find({ "productName": productName });
  console.log(existDish);
  if (existDish) {
    return res.status(400).json("dish exist");
  }
*/

  const dish = new Dish({
    productName,
    price,
    productType,
    productInfo,
    photo,
    category
  });
  await dish.save();
  return res.json(dish);
}

async function getDish(req, res) {
  const { id } = req.params;

  const dish = await Dish.findById(id);
  if (!dish) {
    return res.status(404).json("dish not found");
  }
  return res.json(dish);
}

async function getAllDishes(req, res) {
  const dishs = await Dish.find();
  return res.json(dishs);
}

async function updateDish(req, res) {
  const { id } = req.params;

  const {
    productName,
    price,
    productType,
    productInfo,
    photo,
    category
  } = req.body;

  const newDish = await Dish.findByIdAndUpdate(
    id,
    {
      productName,
      price,
      productType,
      productInfo,
      photo,
      category
    },
    {
      new: true
    }
  );

  if (!newDish) {
    return res.status(404).json("dish not found");
  }

  return res.json(newDish);
}

async function deleteDish(req, res) {
  const { id } = req.params;
  const dish = await Dish.findByIdAndDelete(id);

  if (!dish) {
    return res.status(404).json("dish not found");
  }
  await Order.updateMany(
    { _id: { $in: dish.orders } },
    { $pull: { dishes: dishes._id } }
  );
  return res.sendStatus(200);
}

module.exports = {
  addDish,
  getDish,
  getAllDishes,
  updateDish,
  deleteDish
};
