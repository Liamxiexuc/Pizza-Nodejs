const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        _id: {
            type: String,
            alias: ""
        },

        productName: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        productType: {
            type: String,
            require: true
        },
        productInfo: {
            type: String,
            require: true
        },
        productionDiscount: {
            type: Number,
            require: true
        },
        photo: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
        }

    }
);

const model = mongoose.model("Dish", schema);

module.exports = model;