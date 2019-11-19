const express = require('express');
const userRoute = require('./routes/user');
const dishRoute = require('./routes/dish');
const orderRouter = require('./routes/dish');
const router = express.Router();

router.use('/users', userRoute);
router.use('/dishes', dishRoute);
router.use('/orders', orderRouter);

module.exports = router;