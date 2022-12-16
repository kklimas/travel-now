var mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        // admin, manager, user, guest
        enum: [0, 1, 2, 3],
        default: 3
    },
    banned: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;