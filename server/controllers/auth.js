const AuthService = require('../services/auth')

exports.register = async (req, res) => {
    try {
        const tokens = await AuthService.register(req.body)
        return res.json(tokens);
    } catch (e) {
        return res.status(401).json();
    }
}

exports.login = async (req, res) => {
    try {
        const tokens = await AuthService.login(req.body)
        return res.json(tokens);
    } catch (e) {
        return res.status(401).json();
    }
}

exports.refresh = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json()
    const accessToken = AuthService.refresh(req.body)
    return res.json({
        accessToken: accessToken
    })
}