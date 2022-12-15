const mongoose = require('mongoose');

const JourneyCommentSchema = new mongoose.Schema({
    journeyId: {
        type: String,
        required: true
    },
    username: {
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
    userDate: {
        type: Date
    },
    addDate: {
        type: Date,
        default: Date.now()
    }
})

const JourneyComment = mongoose.model("JourneyComment", JourneyCommentSchema);
module.exports = JourneyComment;