const Journey = require('../models/journey');
const JourneyCommentService = require('./journey-comment');
const ERROR_MESSAGE = 'Cannot fetch data from journeys table'

exports.getJourneys = async () => {
    try {
        let journeys = await Journey.find({});
        return journeys;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.getJourney = async (id) => {
    try {
        let journey = await Journey.findById(id);
        return journey;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.addJourney = async (body) => {
    let journey = Journey(body);
    try {
        await journey.save();
        return journey;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.deleteJourney = async (id) => {
    try { 
        let callback = Promise.all([
            await Journey.deleteOne({_id: id}),
            JourneyCommentService.deleteCommentsByJourneyId(id)
        ]);
        return callback;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.reduceTicketsOfJourney = async (id, tickets) => {
    try {
        let journey = await Journey.findById(id);
        journey.ticketsLeft -= tickets;
        
        return await journey.save();
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}