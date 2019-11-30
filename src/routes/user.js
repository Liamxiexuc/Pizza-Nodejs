const express = require("express");
const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addOrder,
  deleteOrder,
  getAllOrdersByUserId
} = require("../controllers/user");
const adminGuard = require("../middleware/adminGuard");
const router = express.Router();

router.get("/", adminGuard, getAllUsers);
router.get("/:id", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", adminGuard, deleteUser);
router.post("/:id/orders/:orderId", addOrder);
router.delete("/:id/orders/:orderId", deleteOrder);
router.get("/:id/orders", getAllOrdersByUserId);
module.exports = router;
