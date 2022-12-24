const JourneyCommentService = require('../services/journey-comment');

exports.getComments = async (req, res) => {
    try {
        let comments = await JourneyCommentService.getComments();
        return res.status(200).json(comments);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getCommentsByUserId = async (req, res) => {
    let id = req.params.id;
    try {
        let comments = await JourneyCommentService.getCommentsByUserId(id);
        return res.status(200).json(comments);
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}
exports.addComment = async (req, res) => {
    let data = req.body.data;
    let user = req.body.user;
    data.username = user.username
    if (user.banned) {
        return res.status(403).json({status: 403, message: "User is banned and cannot add posts."})
    }
    try {
        let comment = await JourneyCommentService.addComment(data);
        return res.status(201).json(comment);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.deleteComment = async (req, res) => {
    let id = req.params.id;
    let user = req.body.user;
    try {
        let comment = await JourneyCommentService.deleteComment(id, user);
        return res.status(204).json(comment);
    } catch (e) {
        return res.status(403).json();
    }
}