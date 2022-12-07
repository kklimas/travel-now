var HistoryRecord = require('../models/history-record')
const ERROR_MESSAGE = 'Cannot fetch data from history-records table'
const JourneyService = require('./journey');

exports.getRecords = async () => {
    try {
        let records = await HistoryRecord.find({})
        return records;
    } catch (e) {
        throw Error(ERROR_MESSAGE)
    }
}

exports.getUserRecords = async (id) => {
    try {
        let records = await HistoryRecord.find({userId: id})
        return records;
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