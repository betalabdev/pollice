const express = require('express')
const Question = require('../models/question')
const socket = require('../services/socket')
const form = require('../utils/form')
const env = require('../config/env')

const router = express.Router()

router.get('/:questionId', (req, res, next) => {
    const questionId = req.params.questionId
    Question.findById(queOneonId, (err, question) => {
        if (err) {
            res.status(400)
            return res.send(err)
        }
        res.send(form.getVoteForm(env.baseUrl, question))
    })
})

router.post('/:questionId', (req, res, next) => {
    const questionId = req.params.questionId
    Question.find({ questionId }, (err, question) => {
        if (question.openEnded) {
            const response = new Response(req.body)
            response.save((err, response) => {
                if (err) {
                    res.status(400)
                    return res.send(err)
                }
                res.send(form.getWaitForm())
                socket.send(questionId, {
                    text: response.text,
                    type: 'response',
                })
            })
        } else {
            Vote.findOneAndUpdate(
                { userId: req.body.userId, questionId },
                { answerIds: req.body.answerIds },
                { upsert: true, new: true },
                (err, vote) => {
                    if (err) {
                        res.status(400)
                        return res.send(err)
                    }
                    res.send(form.getWaitForm())
                    socket.send(questionId, { questionId, type: 'vote' })
                }
            )
        }
    })
})

module.exports = router
