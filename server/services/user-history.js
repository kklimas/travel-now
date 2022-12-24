const HistoryRecord = require('../models/history-record')
const ERROR_MESSAGE = 'Cannot fetch data from history-records table'
const JourneyService = require('./journey');
const {Error} = require("mongoose");

exports.getRecords = async () => {
    try {
        return await HistoryRecord.find({});
    } catch (e) {
        throw Error(ERROR_MESSAGE)
    }
}

exports.getUserRecords = async (username) => {
    try {
        return await HistoryRecord.find({username: username});
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

exports.deleteRecords = async () => {
    try {
        return await HistoryRecord.deleteMany({a: null})
    } catch {
        throw Error(ERROR_MESSAGE)
    }
}