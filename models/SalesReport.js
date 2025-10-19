const mongoose = require('mongoose');

const SalesReportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    itemName: { type: String, required: true },
    beginning: { type: Number, required: true },
    remaining: { type: Number, required: true },
    sold: { type: Number, required: true }
});

module.exports = mongoose.model('SalesReport', SalesReportSchema);