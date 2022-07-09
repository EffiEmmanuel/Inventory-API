const mongoose = require('mongoose')

const transportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    contactPerson: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    gstin: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pinCode: {
        type: String,
        required: true
    },

    created_by: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Transport', transportSchema)