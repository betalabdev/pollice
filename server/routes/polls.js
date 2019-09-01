const express = require('express');
const router = express.Router();
const Question = require('../models/question');

router.get('/', (req, res, next) => {
    Question.find().limit(10).exec((err, questions) => {
        if (err) {
            res.status(400);
            return res.send(err);
        }
        res.send(questions);
    })
});

router.post('/', (req, res, next) => {
    const question = new Question(req.body);
    question.save((err, question) => {
        if (err) {
            res.status(400);
            return res.send(err);
        }
        res.send(question);
    })
});

router.get('/:id', (req, res, next) => {
    Question.findById(req.params.id, (err, question) => {
        if (err) {
            res.status(400);
            return res.send(err);
        }
        res.send(question);
    })
});

router.put('/:id', (req, res, next) => {
    Question.findByIdAndUpdate(req.params.id, req.body, (err, question) => {
        if (err) {
            res.status(400);
            return res.send(err);
        }
        return res.send(question);
    })
});

module.exports = router;