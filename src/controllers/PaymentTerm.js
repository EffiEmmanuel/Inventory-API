const PaymentTerm = require('../models/PaymentTerm')

const createPaymentTerm = async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(401).send('Some fields are missing!')
    }

    let newPaymentTerm

    try {
        newPaymentTerm = await PaymentTerm.findOne({ name })
        console.log(newPaymentTerm)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (newTransport) {
        res.status(400).send('This payment term already exists!')
    }

    newPaymentTerm = new PaymentTerm({ name, status: true })

    try {
        await newPaymentTerm.save()
    } catch (error) {
        throw new Error(error)
    }

    res.status(201).json({ newPaymentTerm })
}

const getPaymentTerms = async (req, res) => {
    let paymentTerms
    try {
        paymentTerms = await PaymentTerm.find()
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!paymentTerms) {
        res.status(404).send('No payment term has been added')
    }

    res.status(200).json({ paymentTerms })

}

const getPaymentTermByName = async (req, res) => {

    let name = req.params.paymentTermName

    let paymentTerm
    try {
        paymentTerm = await PaymentTerm.find({ name })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!paymentTerm) {
        res.status(404).send('No paymentTerm has been added')
    }

    res.status(200).json({ paymentTerm })

}

const updatePaymentTerm = async (req, res) => {
    let paymentTermId = req.params.paymentTermId
    let status = req.body.status || false

    let { name } = req.body

    let paymentTerm
    try {
        let paymentTerm
        = await PaymentTerm.findByIdAndUpdate(paymentTermId, { name, status })
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!paymentTerm) {
        res.status(400).send('Unable to update paymentTerm. Please try again')
    }

    res.status(201).json({ paymentTerm })
}

const deletePaymentTerm = async (req, res) => {
    const paymentTermId = req.params.paymentTermId

    let paymentTerm
    try {
        paymentTerm = await PaymentTerm.findByIdAndRemove(paymentTermId)
    } catch (error) {
        res.status(500).send(`An error occured: ${error.message}`)
    }

    if (!paymentTerm) {
        res.status(400).send('Unable to delete paymentTerm. Please try again')
    }

    res.status(201).json({ paymentTerm })
}


module.exports = {
    createPaymentTerm,
    getPaymentTerms,
    getPaymentTermByName,
    updatePaymentTerm,
    deletePaymentTerm
}