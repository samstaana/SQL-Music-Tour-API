// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Op } = require('sequelize')
const { Event } = db

events.get('/', async (req, res) => {
    try {
        const { name = '' } = req.query
        const foundEvents = await Event.findAll ({
            where: {
                name: {
                    [ Op.iLike ]: `%${name}%`
                }
            },
            order: [
                [ 'date', 'ASC' ],
                [ 'name', 'ASC' ]
            ]
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { events_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(200).json({
            message: 'Successfully created an event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = events;