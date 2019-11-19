const express = require('express');
const {
    addOrder,
    getOrder,
    getAllOrderes,
    updateOrder,
    deleteOrder
} = require('../controllers/order');
const router = express.Router();

router.get('/', getAllOrderes);
router.get('/:id', getOrder);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;