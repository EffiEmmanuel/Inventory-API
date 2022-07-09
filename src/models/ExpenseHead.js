const mongoose = require('mongoose')

const expenseHeadScehma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        default: false
    },

    created_by: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model('ExpenseHead', expenseHeadScehma)