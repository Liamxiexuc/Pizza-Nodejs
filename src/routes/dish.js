const express = require('express');
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
router.post('/', addDish);
router.put('/:id', updateDish);
router.delete('/:id', deleteDish);

module.exports = router;