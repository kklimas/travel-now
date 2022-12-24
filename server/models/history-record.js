const mongoose = require('mongoose');

const HistoryRecordSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    journeyId: {
        type: String,
        required: true
    },
    tickets: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now()
    }
})

const HistoryRecord = mongoose.model("HistoryRecord", HistoryRecordSchema);
module.exports = HistoryRecord;