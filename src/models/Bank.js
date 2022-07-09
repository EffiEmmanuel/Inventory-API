const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
    name: {
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

module.exports = mongoose.model('Bank', bankSchema)