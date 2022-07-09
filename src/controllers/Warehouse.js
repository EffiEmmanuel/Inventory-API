const Warehouse = require('../models/Warehouse')

const createWarehouse = async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(401).send('Some fields are missing!')
    }

    let newWarehouse

    try {
        newWarehouse = await Warehouse.findOne({ name })
        console.log(newWarehouse)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (newWarehouse) {
        res.status(400).send('This warehouse already exists!')
    }

    newWarehouse = new Warehouse({ name, status: true })

    try {
        await newWarehouse.save()
    } catch (error) {
        throw new Error(error)
    }

    res.status(201).json({ newWarehouse })
}

const getWarehouses = async (req, res) => {
    let warehouses
    try {
        warehouses = await Warehouse.find()
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!warehouses) {
        res.status(404).send('No warehouse has been added')
    }

    res.status(200).json({ warehouses })

}

const getWarehouseByName = async (req, res) => {

    let name = req.params.expenseHeadName

    let warehouse
    try {
        warehouse = await Warehouse.find({ name })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!warehouse) {
        res.status(404).send('No warehouse has been added')
    }

    res.status(200).json({ warehouse })

}

const updateWarehouse = async (req, res) => {
    let warehouseId = req.params.warehouseId
    let status = req.body.status || false

    let { name } = req.body

    let warehouse
    try {
        let warehouse = await Warehouse.findByIdAndUpdate(warehouseId, { name, status })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!warehouse) {
        res.status(400).send('Unable to update warehouse. Please try again')
    }

    res.status(201).json({ warehouse })
}

const deleteWarehouse = async (req, res) => {
    const warehouseId = req.params.warehouseId

    let warehouse
    try {
        warehouse = await Warehouse.findByIdAndRemove(warehouseId)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!warehouse) {
        res.status(400).send('Unable to delete warehouse. Please try again')
    }

    res.status(201).json({ warehouse })
}


module.exports = {
    createWarehouse,
    getWarehouses,
    getWarehouseByName,
    updateWarehouse,
    deleteWarehouse
}