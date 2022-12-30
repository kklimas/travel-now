const User = require('../models/user');
const JwtService = require("../services/jwt");
const logger = require("../utils/logger");
const bcrypt = require('bcrypt');

exports.register = async (body) => {
    let username = body.username;
    let users = await User.find({username: username});

    if (users instanceof Array && users.length > 0) {
        throw Error("Username exists.")
    }

    let user = User(body);
    try {
        await user.save();
        return JwtService.generateTokens(user);
    } catch (e) {
        throw Error("Register process failed.");
    }
}
exports.login = async (user) => {
    let username = user.username
    let password = user.password
    let dbUser = await User.find({username: username})

    // check if any user with given username exists
    if (!(dbUser instanceof Array) || (dbUser instanceof Array && dbUser.length !== 1)){
        throw Error("Data is invalid.")
    }
    // password validation
    const hashedUser = dbUser.at(0);
    const passwordMatch = await bcrypt.compare(password, hashedUser.password);
    if (passwordMatch) {
        let rawUser = {
            username: username,
            role: hashedUser.role
        }
        return JwtService.generateTokens(rawUser)
    } else {
        throw Error("Data is invalid.")
    }
}
exports.refresh = async (user) => {
    logger.info(`Refreshing access token for user ${user.username}`)

    let username = user.username
    let dbUser = await User.find({username: username})

    // check if any user with given username exists
    if (!(dbUser instanceof Array) || (dbUser instanceof Array && dbUser.length !== 1)) {
        throw Error("Data is invalid.")
    }
    user = dbUser.at(0);

    return JwtService.refresh(user)
}