const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/users/setup
// @desc    Create the first admin user if no users exist. THIS IS UNPROTECTED.
router.post('/setup', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            return res.status(403).json({ msg: 'Setup has already been completed. This route is disabled.' });
        }

        const { name, email, password } = req.body;
        
        let user = new User({ 
            name, 
            email, 
            password, 
            role: 'Admin', // The first user must be an Admin
            status: 'Active',
            ratePerDay: req.body.ratePerDay || 200
        });

        await user.save();
        res.status(201).json({ msg: 'First admin user created successfully. You can now log in.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- All routes below this are protected ---
router.use(auth);

// @route   GET /api/users
// @desc    Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users
// @desc    (Admin) Create a new user
router.post('/', async (req, res) => {
    const { name, email, password, role, status, ratePerDay } = req.body;
    try {
        let user = new User({ name, email, password, role, status, ratePerDay });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/users/:id
// @desc    Update a user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
