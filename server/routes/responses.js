const express = require('express')
const Response = require('../models/response')
const socket = require('../services/socket')

const router = express.Router()

router.get('/:questionId', (req, res, next) => {
    Response.aggregate([
        { $match: { questionId: req.params.questionId } },
        { $group: { _id: '$text', count: { $sum: 1 } } },
    ]).then(
        responses => {
            res.send(responses)
        },
        err => {
            res.status(400)
            res.send(err)
        }
    )
})

router.post('/:questionId', (req, res, next) => {
    const questionId = req.params.questionId
    const response = new Response(req.body)
    response.save((err, response) => {
        if (err) {
            res.status(400)
            return res.send(err)
        }
        res.send(response)
        const text = response.text
        Response.count({ questionId, text }, (err, count) => {
            if (!err) socket.send(questionId, { payload: { _id: text, count }, type: 'response' })
        })
    })
})

module.exports = router
