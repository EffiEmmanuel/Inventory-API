const Transport = require('../models/Transport')

const createTransport = async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(401).send('Some fields are missing!')
    }

    let newTransport

    try {
        newTransport = await Transport.findOne({ name })
        console.log(newTransport)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (newTransport) {
        res.status(400).send('This transport already exists!')
    }

    newTransport = new Transport({ name, status: true })

    try {
        await newTransport.save()
    } catch (error) {
        throw new Error(error)
    }

    res.status(201).json({ newTransport })
}

const getTransports = async (req, res) => {
    let transports
    try {
        transports = await Transport.find()
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!transports) {
        res.status(404).send('No transport has been added')
    }

    res.status(200).json({ transports })

}

const getTransportByName = async (req, res) => {

    let name = req.params.expenseHeadName

    let transport
    try {
        transport = await Transport.find({ name })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!transport) {
        res.status(404).send('No transport has been added')
    }

    res.status(200).json({ transport })

}

const updateTransport = async (req, res) => {
    let transportId = req.params.transportId
    let status = req.body.status || false

    let { name } = req.body

    let transport
    try {
        let transport
        = await Transport.findByIdAndUpdate(transportId, { name, status })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!transport) {
        res.status(400).send('Unable to update transport. Please try again')
    }

    res.status(201).json({ transport })
}

const deleteTransport = async (req, res) => {
    const transportId = req.params.transportId

    let transport
    try {
        transport = await Transport.findByIdAndRemove(transportId)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!transport) {
        res.status(400).send('Unable to delete transport. Please try again')
    }

    res.status(201).json({ transport })
}


module.exports = {
    createTransport,
    getTransports,
    getTransportByName,
    updateTransport,
    deleteTransport
}