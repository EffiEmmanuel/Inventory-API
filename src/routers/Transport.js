const express = require('express')
const router = express.Router()

const { createTransport, getTransports, getTransportById, updateTransport, deleteTransport } = require('../controllers/Transport')

// CREATE Expense Head
router.post('/transport', createTransport)
// GET all expense heads
router.get('/transport', getTransports)
// GET a specific user
router.get('/transport/:transportId', getTransportById)
// UPDATE specific expense head
router.patch('/transport/:transportId', updateTransport)
// DELETE specific user
router.delete('/transport/:transportId', deleteTransport)

module.exports = router