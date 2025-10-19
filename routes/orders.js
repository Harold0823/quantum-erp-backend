const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

router.use(auth);

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const order = await newOrder.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT (update) an order
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(order);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Order deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
