const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    ticketsLeft: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: false
    }
})

const Journey = mongoose.model("Journey", JourneySchema);
module.exports = Journey;