const url = require('url')
const WebSocket = require('ws')

let wss

module.exports = {
    init(server) {
        wss = new WebSocket.Server({ server })

        wss.on('connection', (ws, req) => {
            const parameters = url.parse(req.url, true)

            ws.isAlive = true
            ws.questionId = parameters.query.questionId

            ws.on('pong', () => {
                ws.isAlive = true
            })

            ws.on('close', () => {})
        })

        // Check for alive conn
        setInterval(() => {
            wss.clients.forEach(ws => {
                if (!ws.isAlive) return ws.terminate()

                ws.isAlive = false
                ws.ping(null, false, true)
            })
        }, 10000)

        return wss
    },

    send(questionId, data) {
        wss.clients.forEach(ws => {
            if (ws.isAlive && ws.questionId == questionId)
                ws.send(JSON.stringify(data))
        })
    },
}
