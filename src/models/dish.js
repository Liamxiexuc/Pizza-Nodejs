const mongoose = require("mongoose");

const schema = new mongoose.Schema({
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
  photo: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  __v: {
    type: Number,
    select: false
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
});

const model = mongoose.model("Dish", schema);

module.exports = model;
