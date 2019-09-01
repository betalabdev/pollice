const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Question = require('../models/question');
const Vote = require('../models/vote');


router.get('/:id', (req, res, next) => {
    Question.findById(req.params.id, (err, question) => {
        if (err) {
            res.status(400);
            return res.send(err);
        }

        Vote.aggregate([
            { $match: { questionId: req.params.id } },
            { $unwind: "$answerIds" },
            { $group: {_id: "$answerIds", count: {$sum: 1}} },
        ])
        .then((votes) => {
            res.send({ question, votes });
        }, (err) => {
            res.status(400);
            res.send(err);
        });

    })
});

module.exports = router;