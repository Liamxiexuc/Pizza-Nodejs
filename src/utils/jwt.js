const jwt = require("jsonwebtoken");

function generateToken(id) {
  const token = jwt.sign({ id, type: "1" }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  return token;
}

function generateToken(id) {
  const token = jwt.sign({ id, type: "0" }, process.env.JWT_KEY, {
    expiresIn: "1h"
  });
  return token;
}

function validateToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_KEY);
  } catch (e) {
    return null;
  }
  return decoded;
}

module.exports = {
  generateToken,
  validateToken
};
