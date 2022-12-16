const User = require('../models/user');
const JwtService = require("../services/jwt")

exports.register = async (body) => {
    let username = body.username;
    let users = await User.find({username: username});

    if (users instanceof Array && users.length > 0) {
        throw Error("Username exists.")
    }
    let user = User(body)
    try {
        await user.save()
        return JwtService.generateTokens(user);
    } catch {
        throw Error("Register failed.");
    }
}
exports.login = async (user) => {
    let username = user.username
    let password = user.password
    let dbUser = await User.find({username: username, password: password})
    if (dbUser instanceof Array && dbUser.length === 0) {
        throw Error("Data is invalid.")
    }
    return JwtService.generateTokens(user)
}
exports.refresh = (user) => {
    return JwtService.refresh(user)
}