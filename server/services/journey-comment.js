const JourneyComment = require('../models/journey-comment');

const ERROR_MESSAGE = 'Cannot fetch data from journey-comments table'

exports.getComments = async () => {
    try {
        let comments = await JourneyComment.find({});
        return comments;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.getCommentsByUserId = async (id) => {
    try {
        let comments = await JourneyComment.findById({userId: id});
        return comments;
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
        let comment = await JourneyComment.deleteOne({_id: id});
        return comment;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.deleteCommentsByJourneyId = async (id) => {
    try { 
        let comments = await JourneyComment.deleteMany({journeyId: id});
        return comments;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}