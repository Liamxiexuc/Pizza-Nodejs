const Joi = require("@hapi/joi");
const validate = password => {
  const validation = Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@&%#_])[a-zA-Z0-9~!@&%#_]{8,16}$/)
    .validate(password);

  return validation;
};
//const validation = require("./src/middleware/validation");

/*
if (!validation) {
  return false;
}
return validation.value;
};
*/
const password = "ABCcxx2615!";
const a = validate(password);
if (a.error) {
  console.log("False");
} else {
  console.log("True");
}
