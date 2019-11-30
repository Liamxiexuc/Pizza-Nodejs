const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    /*
    _id: {
      type: String,
      alias: "order number"
    },
*/
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
    dishes: [{ type: String, ref: "Dish" }]
  },
  {
    timestamps: true
  }
);

const model = mongoose.model("Order", schema);

module.exports = model;
