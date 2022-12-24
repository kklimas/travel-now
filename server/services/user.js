const User = require('../models/user')

exports.getUsers = async function () {

    try {
        return await User.find();
    } catch (e) {
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

exports.modify = async (body) => {
    let user = body.data;
    try {
        return await User.updateOne({username: user.username}, user)
    } catch (e) {
        throw Error(e)
    }
}