const AuthService = require('../services/auth')

exports.register = async (req, res) => {
    try {
        const tokens = await AuthService.register(req.body)
        return res.json(tokens);
    } catch (e) {
        return res.status(400).json();
    }
}

exports.login = async (req, res) => {
    try {
        const tokens = await AuthService.login(req.body)
        return res.json(tokens);
    } catch (e) {
        return res.status(400).json();
    }
}

exports.refresh = async (req, res) => {
    try {
        const accessToken = await AuthService.refresh(req.body.user)
        return res.json({
            accessToken: accessToken
        })
    } catch (e) {
        return res.status(404).json();
    }

}