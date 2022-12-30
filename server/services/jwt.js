const jwt = require('jsonwebtoken')
const fs = require("fs");
const privateKey = fs.readFileSync('private.key')

exports.verifyUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(403)
    const privateKey = fs.readFileSync('private.key')

    jwt.verify(token, privateKey, (err, user) => {
        if (err || user.role > 2) {
            // check if token expired
            let expirationDate = new Date(err.expiredAt)
            if (new Date() > expirationDate) {
                return res.sendStatus(401)
            }
            // if not
            return res.sendStatus(403)
        }

        let data = req.body;
        req.body = {
            user: user,
            data: data,
        }
        next(res.body)
    })
}

exports.verifyManager = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(403)
    const privateKey = fs.readFileSync('private.key')

    jwt.verify(token, privateKey, (err, user) => {
        if (err || user.role > 2) {
            // check if token expired
            let expirationDate = new Date(err.expiredAt)
            if (new Date() > expirationDate) {
                return res.sendStatus(401)
            }
            // if not
            return res.sendStatus(403)
        }
        let data = req.body;
        req.body = {
            username: user.username,
            data: data
        }
        next(res.body)
    })
}

exports.verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(403)
    const privateKey = fs.readFileSync('private.key')

    jwt.verify(token, privateKey, (err, user) => {
        if (err || user.role > 2) {
            // check if token expired
            let expirationDate = new Date(err.expiredAt)
            if (new Date() > expirationDate) {
                return res.sendStatus(401)
            }
            // if not
            return res.sendStatus(403)
        }
        let data = req.body;
        req.body = {
            username: user.username,
            data: data
        }
        next(res.body)
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
        username: user.username,
        role: user.role,
        banned: user.banned
    }
    return jwt.sign(payload, privateKey, { expiresIn: '3600s'} )
}

const generateAccessToken = (user) => {
    let payload = {
        username: user.username,
        role: user.role,
        banned: user.banned
    }
    return jwt.sign(payload, privateKey, { expiresIn: '10s'} )
}