const express = require("express");
const userRoute = require("./routes/user");
const dishRoute = require("./routes/dish");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");
const authGuard = require("./middleware/authGuard");
const adminGuard = require("./middleware/adminGuard");
const router = express.Router();

router.use("/users", authGuard, userRoute);
//router.use("/dishes", adminGuard, dishRoute);
router.use("/dishes", dishRoute);
router.use("/orders", orderRoute);
router.use("/auth", authRoute);

module.exports = router;
