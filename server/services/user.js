const User = require('../models/user')

exports.getUsers = async function () {

    try {
        return await User.find();
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

exports.deleteUsers = async () => {
    try {
        return await User.deleteMany({a: null})
    } catch {
        throw Error();
    }
}

exports.modify = async (user) => {
    try {
        return await User.update({username: user.username}, user)
    } catch (e) {
        throw Error(e)
    }
}