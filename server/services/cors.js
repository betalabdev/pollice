const cors = require('cors')
const env = require('../config/env')

const whitelist = env.corsWhitelist

const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}

module.exports = {
    init() {
        return cors(corsOptions)
    },
}
