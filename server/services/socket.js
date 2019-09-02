const WebSocket = require('ws')

let wss

module.exports = {
    init(server) {
        wss = new WebSocket.Server({ server })

        wss.on('connection', ws => {
            console.log('Websocket connected')

            ws.isAlive = true

            ws.on('pong', () => {
                ws.isAlive = true
            })

            ws.on('close', () => {
                console.log('Websocket disconnected')
            })
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

    send(data) {
        wss.clients.forEach(ws => {
            if (ws.isAlive) ws.send(JSON.stringify(data))
        })
    },
}
