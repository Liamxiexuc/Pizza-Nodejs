const express = require("express");
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const adminGuard = require("../middleware/adminGuard");
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.get("/", adminGuard, getAllOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id", adminGuard, updateOrder);
router.delete("/:id", adminGuard, deleteOrder);

module.exports = router;
