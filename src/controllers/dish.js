const Dish = require("../models/dish");

async function addDish(req, res) {
    const {
        productName,
        price,
        productType,
        productInfo,
        productionDiscount,
        photo,
        category
    } = req.body;

    const existDish = await Dish.findById(id);
    if(existDish) {
        
    }
}

function getDish(req, res) {}

function getAllDishes(req, res) {
    res.json('hello from all dishes');
}

function updateDish(req, res) {}

function deleteDish(req, res) {}

module.exports = {
    addDish,
    getDish,
    getAllDishes,
    updateDish,
    deleteDish
}