const Journey = require('../models/journey');
const UserHistoryService = require('./user-history')
const JourneyCommentService = require('./journey-comment');
const ERROR_MESSAGE = 'Cannot fetch data from journeys table';


exports.getJourneys = async () => {
    try {
        return await Journey.find({});
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}

exports.getJourney = async (id) => {
    try {
        return await Journey.findById(id);
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
        return Promise.all([
            await Journey.deleteOne({_id: id}),
            JourneyCommentService.deleteCommentsByJourneyId(id)
        ]);
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}

exports.buyJourneys = async (order) => {
    let items = order.data;
    try {
        const recordPromises = items.map(item => {
            let record = {
                username: order.user.username,
                journeyId: item.journeyId,
                tickets: item.count
            }
            return UserHistoryService.addRecord(record);
        })

        const singleItemBuyPromises = items.map(item => handleSingleItemBuy(item))

        return Promise.all(recordPromises.concat(singleItemBuyPromises));
    } catch (e) {
        throw Error(ERROR_MESSAGE);
    }
}

exports.modify = async (body) => {
    const journey = body.data;
    try {
        return await Journey.updateOne({_id: journey._id}, journey)
    } catch (e) {
        throw new Error(e)
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
const handleSingleItemBuy = async (item) => {
    try {
        let journey = await Journey.findById(item.journeyId);
        journey.ticketsLeft -= item.count;
        await journey.save()
        return journey;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}