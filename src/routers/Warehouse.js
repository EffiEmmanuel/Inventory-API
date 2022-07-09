const express = require('express')
const router = express.Router()

const { createWarehouse, getWarehouses, getWarehouseById, updateWarehouse, deleteWarehouse } = require('../controllers/Warehouse')

// CREATE Expense Head
router.post('/warehouse', createWarehouse)
// GET all expense heads
router.get('/warehouse', getWarehouses)
// GET a specific user
router.get('/warehouse/:warehouseId', getWarehouseById)
// UPDATE specific expense head
router.patch('/warehouse/:warehouseId', updateWarehouse)
// DELETE specific user
router.delete('/warehouse/:warehouseId', deleteWarehouse)

module.exports = router