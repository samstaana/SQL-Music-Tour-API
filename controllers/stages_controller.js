// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Op } = require('sequelize')
const { Stage } = db

stages.get('/', async (req, res) => {
    try {
        const { name = '' } = req.query
        const foundStages = await Stage.findAll ({
            where: {
                name: {
                    [ Op.iLike ]: `%${name}%`
                }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})

stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { events_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully created an event',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = events;