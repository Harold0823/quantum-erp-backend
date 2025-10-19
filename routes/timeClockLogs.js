const express = require('express');
const router = express.Router();
const TimeClockLog = require('../models/TimeClockLog');
const auth = require('../middleware/auth');

router.use(auth);

// GET all logs
router.get('/', async (req, res) => {
    try {
        const logs = await TimeClockLog.find().sort({ timestamp: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new log
router.post('/', async (req, res) => {
    try {
        const newLog = new TimeClockLog(req.body);
        const log = await newLog.save();
        res.status(201).json(log);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
