const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    passwordResetToken: {
        type: String,
        // unique: true,
        // required: true
    },

    accountActivationToken: {
        type: String,
        // unique: true,
        // required: true
    },

    email_verified: {
        type: Boolean,
        default: false,
        required: true
    },

    phone_verified: {
        type: Boolean,
        default: false,
        required: true
    },

    companyName: {
        type: String,
        // required: true
    },

    companyId: {
        type: String,
        // required: true
    },

    created_by: {
        type: String,
        // required: true
    },

    update_by: {
        type: String,
        // required: true
    },

    status: {
        type: Boolean,
        default: false
    },

    loginType: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)