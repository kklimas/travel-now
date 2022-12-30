const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        // admin, manager, user
        enum: [0, 1, 2],
        default: 2
    },
    creationDate: {
        type: Date,
        default: new Date()
    },
    banned: {
        type: Boolean,
        default: false
    }
})

UserSchema.pre("save", function (next) {
    const user = this
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function(hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;