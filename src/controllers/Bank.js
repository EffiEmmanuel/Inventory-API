const Bank = require('../models/Bank')

const createBank = async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(401).send('Some fields are missing!')
    }

    let newBank

    try {
        newBank = await Bank.findOne({ name })
        console.log(newBank)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (newBank) {
        res.status(400).send('This bank already exists!')
    }

    newBank = new Bank({ name, status: true })

    try {
        await newBank.save()
    } catch (error) {
        throw new Error(error)
    }

    res.status(201).json({ newBank })
}

const getBanks = async (req, res) => {
    let banks
    try {
        banks = await Bank.find()
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!banks) {
        res.status(404).send('No bank has been added')
    }

    res.status(200).json({ banks })

}

const getBankByName = async (req, res) => {

    let name = req.params.bankName

    let bank
    try {
        bank = await Bank.find({ name })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!bank) {
        res.status(404).send('No bank has been added')
    }

    res.status(200).json({ bank })

}

const updateBank = async (req, res) => {
    let bankId = req.params.bankId
    let status = req.body.status || false

    let { name } = req.body

    let bank
    try {
        let bank = await Bank.findByIdAndUpdate(bankId, { name, status })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!bank) {
        res.status(400).send('Unable to update bank. Please try again')
    }

    res.status(201).json({ bank })
}

const deleteBank = async (req, res) => {
    const bankId = req.params.bankId

    let bank
    try {
        bank = await Bank.findByIdAndRemove(bankId)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!bank) {
        res.status(400).send('Unable to delete bank. Please try again')
    }

    res.status(201).json({ bank })
}


module.exports = {
    createBank,
    getBanks,
    getBankByName,
    updateBank,
    deleteBank
}