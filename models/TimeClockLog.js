const mongoose = require('mongoose');

const TimeClockLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    photo: { type: String }, // Base64 string or URL
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    address: { type: String }
});

module.exports = mongoose.model('TimeClockLog', TimeClockLogSchema);