const JourneyComment = require('../models/journey-comment');

const ERROR_MESSAGE = 'Cannot fetch data from journey-comments table'

exports.getComments = async () => {
    try {
        return await JourneyComment.find({});
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.getCommentsByUserId = async (id) => {
    try {
        return await JourneyComment.findById({userId: id});
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.addComment = async (body) => {
    let comment = JourneyComment(body);
    try {
        await comment.save();
        return comment;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.deleteComment = async (id) => {
    try {
        return await JourneyComment.deleteOne({_id: id});
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.deleteCommentsByJourneyId = async (id) => {
    try {
        return await JourneyComment.deleteMany({journeyId: id});
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}