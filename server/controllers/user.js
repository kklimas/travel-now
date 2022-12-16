const UserService = require('../services/user')

exports.getUsers = async (req, res) => {
    try {
        let users = await UserService.getUsers()
        return res.status(200).json(users);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        await UserService.deleteUsers()
        return res.status(200).json();
    } catch (e) {
        return res.status(404).json();
    }
}

exports.modify = async (req, res) => {
    try {
        await UserService.modify(req.body)
        return res.status(200).json()
    } catch (e) {
        return res.status(404).json()
    }
}