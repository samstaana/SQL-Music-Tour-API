// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Band } = db

bands.get('/', async (req, res) => {
    try { 
        const foundBands = await Band.findAll();
        res.status(200).json(foundBands)
    } catch (e) {
        res.status(500).json(e)
    }
})

bands.post('/', async (req, res) => {
    try{
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully created a band',
            data: newBand
        })
    } catch (e) {
        res.status(500).json(e)
    }
})

// EXPORT
module.exports = bands