const express = require("express");
const userRoute = require("./routes/user");
const dishRoute = require("./routes/dish");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");
const authGuard = require("./middleware/authGuard");
const adminGuard = require("./middleware/adminGuard");
const router = express.Router();


router.use("/users", userRoute);
router.use("/dishes", authGuard, adminGuard, dishRoute);
router.use("/orders", authGuard, orderRoute);
router.use("/auth", authRoute);

module.exports = router;
