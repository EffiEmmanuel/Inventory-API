const mongoose = require('mongoose')

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    managerName: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    addressTwo: {
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

    locality: {
        type: String,
        required: true
    },

    pinCode: {
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

    status: {
        type: Boolean,
        required: true
    },

    created_by: {
        type: String,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Warehouse', warehouseSchema)