const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const auth = require('../middleware/auth');

router.use(auth);

// GET all inventory items
router.get('/', async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new inventory item
router.post('/', async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        const item = await newItem.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT (update) an inventory item
router.put('/:id', async (req, res) => {
    try {
        const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// DELETE an inventory item
router.delete('/:id', async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Item deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;