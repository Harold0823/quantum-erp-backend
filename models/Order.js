const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer: { type: String, required: true },
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
        quantity: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, required: true, default: 'Pending' }
});

module.exports = mongoose.model('Order', OrderSchema);