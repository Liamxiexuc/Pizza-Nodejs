const express = require("express");
const {
  addOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  addDish,
  deleteDish
} = require("../controllers/order");
const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.post("/:id/dishes/:dishId", addDish);
router.delete("/:id/dishes/:dishId", deleteDish);

module.exports = router;
