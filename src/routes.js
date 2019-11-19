const express = require('express');
const userRoute = require('./routes/user');
const dishRoute = require('./routes/dish');
const orderRoute = require('./routes/order');
const router = express.Router();

router.use('/users', userRoute);
router.use('/dishes', dishRoute);
router.use('/orders', orderRoute);

module.exports = router;