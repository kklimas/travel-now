const mongoose = require('mongoose');

const JourneyCommentSchema = new mongoose.Schema({
    journeyId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
})

const JourneyComment = mongoose.model("JourneyComment", JourneyCommentSchema);
module.exports = JourneyComment;