const JourneyComment = require('../models/journey-comment');
const {Error} = require("mongoose");

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
exports.addComment = async (data) => {
    try {
        let comment = JourneyComment(data);
        await comment.save();
        return comment;
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}
exports.deleteComment = async (id, user) => {
    try {
        const commentToDel = await JourneyComment.findById(id);
        if (!commentToDel || (commentToDel.username !== user.username && user.role > 1)) {
            throw  Error("Comment does not belong to user")
        }
        return await JourneyComment.deleteOne({_id: id, username: user.username});
    } catch (e){
        throw Error(e);
    }
}
exports.deleteCommentsByJourneyId = async (id) => {
    try {
        return await JourneyComment.deleteMany({journeyId: id});
    } catch {
        throw Error(ERROR_MESSAGE);
    }
}