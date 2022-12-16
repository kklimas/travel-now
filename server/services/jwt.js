const jwt = require('jsonwebtoken')
const fs = require("fs");

exports.verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    const privateKey = fs.readFileSync('private.key')

    jwt.verify(token, privateKey, (err, user) => {
        if (err || user.role > 2) return res.sendStatus(403)
        next()
    })
}

exports.verifyManager = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    const privateKey = fs.readFileSync('private.key')

    jwt.verify(token, privateKey, (err, user) => {
        if (err || user.role > 1) return res.sendStatus(403)
        next()
    })
}

exports.verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    const privateKey = fs.readFileSync('private.key')

    jwt.verify(token, privateKey, (err, user) => {
        if (err || user.role > 0) return res.sendStatus(403)
        next()
    })
}

exports.generateTokens = (user) => {
    return {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user)
    }
}

exports.refresh = (user) => {
    return generateAccessToken(user)
}

const generateRefreshToken = (user) => {
    let payload = {
        name: user.username,
        password: user.password,
        role: user.role
    }
    const privateKey = fs.readFileSync('private.key')
    return jwt.sign(payload, privateKey, { expiresIn: '3600s'} )
}

const generateAccessToken = (user) => {
    let payload = {
        name: user.username,
        password: user.password
    }
    const privateKey = fs.readFileSync('private.key')
    return jwt.sign(payload, privateKey, { expiresIn: '3600s'} )
}