const express = require('express');
const Vote = require('../models/vote');

const router = express.Router();

router.get('/:questionId', (req, res, next) => {
    Vote.findOne({'questionId': req.params.questionId}, (err, votes) => {
        if (err) {
            res.status(400);
            return res.send(err);
        }
        res.send(votes);
    });
});

router.post('/:questionId', (req, res, next) => {
    Vote.findOneAndUpdate(
        { userId: req.body.userId, questionId: req.params.questionId },
        { answerIds: req.body.answerIds },
        { upsert: true, new: true },
        (err, vote) => {
            if (err) {
                res.status(400);
                return res.send(err);
            }
            res.send(vote);
        }
    );
});


module.exports = router;