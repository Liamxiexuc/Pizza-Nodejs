const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

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
    email: {
      type: String,
      require: true,
      validate: {
        validator: email =>
          !Joi.string()
            .email()
            .validate(email).error,
        msg: "Invalid email format"
      }
    },
    password: {
      type: String,
      require: true,
      validate: {
        validator: password =>
          !Joi.string()
            .pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@&%#_])[a-zA-Z0-9~!@&%#_]{8,16}$/
            )
            .validate(password).error,
        msg: "Invalid password format"
      }
    },
    orders: [{ type: String, ref: "Order" }],

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
