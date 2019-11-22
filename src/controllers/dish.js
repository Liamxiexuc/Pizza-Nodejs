const Dish = require("../models/dish");
const Order = require("../models/order");

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
    await Order.updateMany(
    { _id: { $in: dish.orders }},
    { $pull: { dishs: dishs._id }}
    );
    return res.sendStatus(200);
}

async function addOrder(req, res) {
    const {
        id, id
    } = req.params;

    const order = await Order.findById(id);
    const dish = await Dish.findById(id);
    if(!order || !dish) {
        return res.status(404).json('order or dish not found');
    }
    dish.orders.addToSet(order._id);
    order.dishs.addToSet(dish._id);
    await order.save();
    await dish.save();
    return res.json(dish);
}

async function deleteOrder(req, res) {
    const {id, id} = req.params;
    const dish = await Dish.findById(id).exec();
    const order = await Order.findById(id).exec();
    if(!order || !dish) {
        return res.status(404).json('dish or order not found');
    }
    const oldCount = order.dishs.length;
    order.dishs.pull(dish._id);
    if(order.dishs.length === oldCount) {
        return res.status(404).json('order does not exist');
    }
    dish.orders.pull(orders._id);
    await dish.save();
    await order.save();
    return res.json(order);
}

module.exports = {
    addDish,
    getDish,
    getAllDishes,
    updateDish,
    deleteDish,
    addOrder,
    deleteOrder
};