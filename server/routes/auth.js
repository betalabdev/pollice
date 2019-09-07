const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const env = require('../config/env')

const Presenter = require('../models/presenter');


router.post('/', (req, res, next) => {
    const tokenId = req.body.idtoken
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(tokenId);

    async function verify(req, res, next) {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: env.clientId,
        });
        const payload = ticket.getPayload();
        const userId = payload['sub'];
 
        Presenter.find({googleId: userId}, (err, existedPresenter) => {
            const token = jwt.sign(userId, env.jwtSeed);
            if (existedPresenter) {
                return res.send({token})
            } 
            const newPresenter = new Presenter({googleId: userId});
            newPresenter.save((err, presenter) => {
                if(err) {
                    res.status(400);
                    return res.send(err);
                }
                return res.send({token});
            })
        });
    }
    verify(req, res, next);
});

module.exports = router;