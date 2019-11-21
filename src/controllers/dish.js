const Dish = require("../models/dish");

async function addDish(req, res) {
    const {
        id,
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
        return res.status(400).json('dish exist');
    }

    const dish = new Dish ({
        id,
        productName,
        price,
        productType,
        productInfo,
        productionDiscount,
        photo,
        category
    });
    await dish.save();
    return res.json(dish);
}

async function getDish(req, res) {
    const {id} = req.params;

    const dish = await Dish.findById(id);
    if(!dish) {
        return res.status(404).json('dish not found');
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
        id,
        productName,
        price,
        productType,
        productInfo,
        productionDiscount,
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
            productionDiscount,
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

    if(!dish) {
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
}