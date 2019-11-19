const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true
    },
    lastName: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    gender: {
      type: String,
      require: true
    },
    phone: {
      type: String,
      require: true
    },
    birthDay: {
      type: Date,
      require: false
    },
    address: {
      type: String,
      require: true
    },
    __v: {
      type: Number,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

schema.virtual("fullname").get(function() {
  return this.firstName + this.lastName;
});

const model = mongoose.model("User", schema);

module.exports = model;
