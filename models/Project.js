const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    status: { type: String, default: 'Not Started' },
    tasks: [{ type: String }],
    assignedEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Project', ProjectSchema);