const express = require("express");
const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addOrder,
  deleteOrder
} = require("../controllers/user");
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:id/orders/:orderId", addOrder);
router.delete("/:id/orders/:orderId", deleteOrder);

module.exports = router;
