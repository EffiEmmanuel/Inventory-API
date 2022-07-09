const express = require('express')
const router = express.Router()

const { createPaymentTerm, getPaymentTerms, getPaymentTermById, updatePaymentTerm, deletePaymentTerm } = require('../controllers/PaymentTerm')

// CREATE Expense Head
router.post('/paymentTerm', createPaymentTerm)
// GET all expense heads
router.get('/paymentTerm', getPaymentTerms)
// GET a specific user
router.get('/paymentTerm/:paymentTermId', getPaymentTermById)
// UPDATE specific expense head
router.patch('/paymentTerm/:paymentTermId', updatePaymentTerm)
// DELETE specific user
router.delete('/paymentTerm/:paymentTermId', deletePaymentTerm)

module.exports = router