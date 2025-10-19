const express = require('express');
const router = express.Router();
const SalesReport = require('../models/SalesReport');
const auth = require('../middleware/auth');

router.use(auth);

// GET all sales reports
router.get('/', async (req, res) => {
    try {
        const reports = await SalesReport.find().sort({ date: -1 });
        res.json(reports);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new sales report
router.post('/', async (req, res) => {
    try {
        const newReport = new SalesReport(req.body);
        const report = await newReport.save();
        res.status(201).json(report);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT (update) a sales report
router.put('/:id', async (req, res) => {
    try {
        const report = await SalesReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(report);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
