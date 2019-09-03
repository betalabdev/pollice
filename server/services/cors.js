const cors = require('cors')
const env = require('../config/env')

const whitelist = env.corsWhitelist

const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            // FIXME: Re-enable this!
            // callback(new Error('Not allowed by CORS'))
            callback(null, true)
        }
    },
}

module.exports = {
    init() {
        return cors(corsOptions)
    },
}
