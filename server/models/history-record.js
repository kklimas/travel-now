const mongoose = require('mongoose');

const HistoryRecordSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    journeyId: {
        type: String,
        required: true
    },
    tickets: {
        type: Number,
        required: true
    }
})

const HistoryRecord = mongoose.model("HistoryRecord", HistoryRecordSchema);
module.exports = HistoryRecord;