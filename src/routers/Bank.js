const express = require('express')
const router = express.Router()

const { createBank, getBanks, getBankById, updateBank, deleteBank } = require('../controllers/Bank')

// CREATE bank
router.post('/bank', createBank)
// GET all banks
router.get('/bank', getBanks)
// GET a specific bank
router.get('/bank/:bankId', getBankById)
// UPDATE specific bank
router.patch('/bank/:bankId', updateBank)
// DELETE specific bank
router.delete('/bank/:bankId', deleteBank)

module.exports = router