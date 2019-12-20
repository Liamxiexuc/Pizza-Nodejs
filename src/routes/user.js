const express = require("express");
const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllOrdersByUserId,
  updateUserType
} = require("../controllers/user");
const adminGuard = require("../middleware/adminGuard");
const authGuard = require("../middleware/authGuard");
const router = express.Router();

router.get("/", authGuard, adminGuard, getAllUsers);
router.get("/:id", authGuard, getUser);
router.post("/", addUser);
router.put("/:id", authGuard, updateUser);
router.delete("/:id", authGuard, adminGuard, deleteUser);
router.get("/:id/orders", authGuard, getAllOrdersByUserId);
router.put("/:id/userType", authGuard, adminGuard, updateUserType);
module.exports = router;
