const express = require('express')
const router = express.Router()

const { createExpenseHead, getExpenseHeads, getExpenseHeadByName, getExpenseHeadById, updateExpenseHead, deleteExpenseHead } = require('../controllers/ExpenseHead')

// CREATE Expense Head
router.post('/expenseHead', createExpenseHead)
// GET all expense heads
router.get('/expenseHead', getExpenseHeads)
// GET a specific expense head by name
router.get('/expenseHead/:expenseHeadName', getExpenseHeadByName)
// GET a specific expense head by id
router.get('/expenseHead/:expenseHeadId', getExpenseHeadById)
// UPDATE specific expense head
router.patch('/expenseHead/:expenseHeadId', updateExpenseHead)
// DELETE specific expense head
router.delete('/expenseHead/:expenseHeadId', deleteExpenseHead)

module.exports = router