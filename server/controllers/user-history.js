const UserHistoryService = require('../services/user-history');

exports.getRecords = async (req, res, next) => {
    try {
        let records = await UserHistoryService.getRecords();
        return res.status(200).json(records);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getUserRecords = async (req, res, next) => {
    let id = req.params.id;
    try {
        let records = await UserHistoryService.getUserRecords(id);
        return res.status(200).json(records);
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}
exports.addRecord = async (req, res, next) => {
    let body = req.body;
    try {
        let response = await UserHistoryService.addRecord(body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}