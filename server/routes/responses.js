const express = require('express')
const Response = require('../models/response')
const socket = require('../services/socket')

const router = express.Router()

router.get('/:questionId', (req, res, next) => {
    Response.find({ questionId: req.params.questionId }, (err, responses) => {
        if (err) {
            res.status(400)
            return res.send(err)
        }
        res.send(responses)
    })
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
        socket.send(questionId, { text: response.text, type: 'response' })
    })
})

module.exports = router
