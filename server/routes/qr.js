const express = require('express')
const Question = require('../models/question')
const Vote = require('../models/vote')
const Response = require('../models/response')

const socket = require('../services/socket')
const form = require('../utils/form')

const router = express.Router()

router.get('/:questionId', (req, res, next) => {
    const questionId = req.params.questionId
    Question.findById(questionId, (err, question) => {
        if (err) {
            res.status(400)
            return res.send(err)
        }
        res.send(form.getVoteForm(question))
    })
})

router.post('/:questionId', (req, res, next) => {
    const questionId = req.params.questionId
    const answer = req.body[questionId]
    const userId = req.headers.user_id || req.headers.session
    Question.findById(questionId, (err, question) => {
        if (question.openEnded) {
            const response = new Response({ userId, questionId, text: answer })
            response.save((err, response) => {
                if (err) {
                    res.status(400)
                    return res.send(err)
                }
                res.send(form.getVoteForm(question, true))
                socket.send(questionId, {
                    text: response.text,
                    type: 'response',
                })
            })
        } else {
            const answerIds = typeof answer === 'string' ? [answer] : answer
            Vote.findOneAndUpdate(
                { userId, questionId },
                { answerIds },
                { upsert: true, new: true },
                (err, vote) => {
                    if (err) {
                        res.status(400)
                        return res.send(err)
                    }
                    res.send(form.getVoteForm(question, true))
                    socket.send(questionId, { questionId, type: 'vote' })
                }
            )
        }
    })
})

module.exports = router
