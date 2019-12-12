const Dish = require("../models/dish");
const Order = require("../models/order");

async function addDish(req, res) {
  const {
    productName,
    price,
    productInfo,
    photo,
    category
  } = req.body;
  // dishName check
  const existDish = await Dish.find({ productName });

  if (existDish.length != 0) {
    return res.status(400).json("dish exist");
  }

  const dish = new Dish({
    productName,
    price,
    productInfo,
    photo,
    category
  });
  await dish.save();
  return res.json(dish);
}

async function getDish(req, res) {
  const { id } = req.params;

  const dish = await Dish.findById(id).exec();
  if (!dish) {
    return res.status(404).json("dish not found");
  }
  return res.json(dish);
}

async function getAllDishes(req, res) {
  const dishes = await Dish.find().exec();
  return res.json(dishes);
}

async function updateDish(req, res) {
  const { id } = req.params;

  const {
    productName,
    price,
    productInfo,
    photo,
    category
  } = req.body;

  const newDish = await Dish.findByIdAndUpdate(
    id,
    {
      productName,
      price,
      productInfo,
      photo,
      category
    },
    {
      new: true
    }
  ).exec();

  if (!newDish) {
    return res.status(404).json("dish not found");
  }

  return res.json(newDish);
}
//delete item doesn't need delete item in orders;
async function deleteDish(req, res) {
  const { id } = req.params;
  const dish = await Dish.findByIdAndDelete(id).exec();

  if (!dish) {
    return res.status(404).json("dish not found");
  }

  return res.sendStatus(200);
}

module.exports = {
  addDish,
  getDish,
  getAllDishes,
  updateDish,
  deleteDish
};
