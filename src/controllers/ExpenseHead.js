const ExpenseHead = require('../models/ExpenseHead')

const createExpenseHead = async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(401).send('Some fields are missing!')
    }

    let newExpenseHead

    try {
        newExpenseHead = await ExpenseHead.findOne({ name })
        console.log(newExpenseHead)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (newExpenseHead) {
        res.status(400).send('This expense head already exists!')
    }

    newExpenseHead = new ExpenseHead({ name, status: true })

    try {
        await newExpenseHead.save()
    } catch (error) {
        throw new Error(error)
    }

    res.status(201).json({ newExpenseHead })
}

const getExpenseHeads = async (req, res) => {
    let expenseHeads
    try {
        expenseHeads = await ExpenseHead.find()
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!expenseHeads) {
        res.status(404).send('No expense head has been added')
    }

    res.status(200).json({ expenseHeads })

}

const getExpenseHeadByName = async (req, res) => {

    let name = req.params.expenseHeadName

    let expenseHead
    try {
        expenseHead = await ExpenseHead.find({ name })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!expenseHead) {
        res.status(404).send('No expense head has been added')
    }

    res.status(200).json({ expenseHead })

}

const updateExpenseHead = async (req, res) => {
    let expenseHeadId = req.params.expenseHeadId
    let status = req.body.status || false

    let { name } = req.body

    let expenseHead
    try {
        let expenseHead
        = await ExpenseHead.findByIdAndUpdate(expenseHeadId, { name, status })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!expenseHead) {
        res.status(400).send('Unable to update expense head. Please try again')
    }

    res.status(201).json({ expenseHead })
}

const deleteExpenseHead = async (req, res) => {
    const expenseHeadId = req.params.expenseHeadId

    let expenseHead
    try {
        expenseHead = await ExpenseHead.findByIdAndRemove(expenseHeadId)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!expenseHead) {
        res.status(400).send('Unable to delete expense head. Please try again')
    }

    res.status(201).json({ expenseHead })
}


module.exports = {
    createExpenseHead,
    getExpenseHeads,
    getExpenseHeadByName,
    updateExpenseHead,
    deleteExpenseHead
}