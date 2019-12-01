const Joi = require("@hapi/joi");

module.exports = password => {
  const validation = Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@&%#_])[a-zA-Z0-9~!@&%#_]{8,16}$/)
    .validate(password);

  return validation;
};
