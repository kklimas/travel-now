const User = require('../models/user')
const bcrypt = require('bcrypt')

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
        user.password = await bcrypt.hash(user.password, 10);
        return await User.findByIdAndUpdate(user._id, user);
    } catch (e) {
        throw Error(e)
    }
}