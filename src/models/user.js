const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

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
      },
    
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],

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
    userType: {
      type: String,
      default: 1,
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

schema.methods.hashPassword = async function() {
  this.password = await bcrypt.hash(this.password, 10);
};

schema.methods.validatePassword = async function(password) {
  const validPassword = await bcrypt.compare(password, this.password);
  return validPassword;
};

const model = mongoose.model("User", schema);

module.exports = model;
