const JourneyService = require('../services/journey');

exports.getJourneys = async (req, res, next) => {
    try {
        let journeys = await JourneyService.getJourneys();
        return res.status(200).json(journeys);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getJourney = async (req, res, next) => {
    let id = req.params.id;
    try {
        let journey = await JourneyService.getJourney(id);
        return res.status(200).json(journey);
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}
exports.addJourney = async (req, res, next) => {
    let body = req.body;
    try {
        let journey = await JourneyService.addJourney(body);
        return res.status(201).json(journey);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.deleteJourney = async (req, res, next) => {
    let id = req.params.id;
    try {
        await JourneyService.deleteJourney(id);
        return res.status(204).json();
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}

exports.buyJourneys = async (req, res, next) => {
    try {
        await JourneyService.buyJourneys(req.body);
        return res.status(204).json();
    } catch (e) {
        return res.status(404).json({ status: 404, message: e.message });
    }
}