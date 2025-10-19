const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

router.use(auth);

// GET all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new project
router.post('/', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const project = await newProject.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT (update) a project
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(project);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Project deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
