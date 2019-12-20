const express = require('express');
const adminGuard = require("../middleware/adminGuard");
const authGuard = require("../middleware/authGuard");
const {
    addDish,
    getDish,
    getAllDishes,
    updateDish,
    deleteDish
} = require('../controllers/dish');
const router = express.Router();

router.get('/', getAllDishes);
router.get('/:id', getDish);
router.post("/", authGuard, adminGuard, addDish);
router.put("/:id", authGuard, adminGuard, updateDish);
router.delete("/:id", authGuard, adminGuard, deleteDish);

module.exports = router;