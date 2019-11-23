const express = require("express");
const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addOrder
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:id/orders/:orderID", addOrder);

module.exports = router;
