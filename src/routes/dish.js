const express = require('express');
const adminGuard = require("../middleware/adminGuard");
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
router.post("/", adminGuard, addDish);
router.put("/:id", adminGuard, updateDish);
router.delete("/:id", adminGuard, deleteDish);

module.exports = router;