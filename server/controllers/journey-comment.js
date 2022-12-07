const JourneyCommentService = require('../services/journey-comment');

exports.getComments = async (req, res, next) => {
    try {
        let comments = await JourneyCommentService.getComments();
        return res.status(200).json(comments);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getCommentsByUserId = async (req, res, next) => {
    let id = req.params.id;
    try {
        let comments = await JourneyCommentService.getCommentsByUserId(id);
        return res.status(200).json(comments);
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}
exports.addComment = async (req, res, next) => {
    let body = req.body;
    try {
        let comment = await JourneyCommentService.addComment(body);
        return res.status(201).json(comment);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.deleteComment = async (req, res, next) => {
    let id = req.params.id;
    try {
        let comment = await JourneyCommentService.deleteComment(id);
        return res.status(204).json(comment);
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}