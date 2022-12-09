const HistoryRecord = require('../models/history-record')
const ERROR_MESSAGE = 'Cannot fetch data from history-records table'
const JourneyService = require('./journey');

exports.getRecords = async () => {
    try {
        return await HistoryRecord.find({});
    } catch (e) {
        throw Error(ERROR_MESSAGE)
    }
}

exports.getUserRecords = async (id) => {
    try {
        return await HistoryRecord.find({userId: id});
    } catch (e) {
        throw Error(ERROR_MESSAGE)
    }
}

exports.addRecord = async (body) => {
    let record = HistoryRecord(body);
    try {
        return Promise.all([
            record.save(),
            JourneyService.reduceTicketsOfJourney(body.journeyId, body.tickets)
        ]);
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}