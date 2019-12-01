const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    dishID: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
    productName: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    quantity: {
      type: Number,
      require: true
    }
  },
  {
    _id: false
  }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    orderStatus: {
      type: String,
      require: true
    },
    orderTotalPrice: {
      type: Number,
      require: true
    },
    comment: {
      type: String,
      default: ""
    },
    payStatus: {
      type: String,
      require: true
    },
    receiverAddress: {
      type: String,
      require: true
    },
    receiverName: {
      type: String,
      require: true
    },
    receiverPhone: {
      type: String,
      require: true
    },
    __v: {
      type: Number,
      select: false
    },
    dishes: [orderItemSchema]
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("Order", orderSchema);

module.exports = model;
