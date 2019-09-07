const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const env = require('../config/env')
const Question = require('../models/question');

router.get('/', (req, res, next) => {
    token = req.headers['authorization']
    jwt.verify(token, env.jwtSeed, (err, googleId) => {
        if (err) {
            res.status(401);
            return res.send(err);
        }
        Question.find({presenterId: googleId}).sort([['_id', -1]]).limit(10).exec((err, questions) => {
            if (err) {
                res.status(400);
                return res.send(err);
            }
            res.send(questions);
        })
    })
});

router.post('/', (req, res, next) => {
    token = req.headers['authorization']
    jwt.verify(token, env.jwtSeed, (err, googleId) => {
        if (err) {
            res.status(401);
            return res.send(err);
        }
        req.body['presenterId'] = googleId
        const question = new Question(req.body);
        question.save((err, question) => {
            if (err) {
                res.status(400);
                return res.send(err);
            }
            res.send(question);
        })
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