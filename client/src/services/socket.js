import api from '../services/api'

const baseUrl = "wss://127.0.0.1:3000"

export default {
    install(Vue, options) {
        let ws = new WebSocket(baseUrl)
        let reconnectInterval = options.reconnectInterval || 1000

        Vue.prototype.$wsConnect = (questionId) => {
            ws = new WebSocket(baseUrl + "?questionId=" + questionId)

            ws.onopen = () => {
                reconnectInterval = options.reconnectInterval || 1000
            }

            ws.onmessage = event => {
                const data = JSON.parse(event.data)
                if (data && data.type == 'vote') handleVote(data)
            }

            ws.onclose = event => {
                if (event) {
                    // Event.code 1000 is our normal close event
                    if (event.code !== 1000) {
                        let maxReconnectInterval =
                            options.maxReconnectInterval || 3000
                        setTimeout(() => {
                            if (reconnectInterval < maxReconnectInterval) {
                                // Reconnect interval can't be > x seconds
                                reconnectInterval += 1000
                            }
                            Vue.prototype.$wsConnect(questionId)
                        }, reconnectInterval)
                    }
                }
            }

            ws.onerror = () => {
                ws.close()
            }
        }

        Vue.prototype.$wsDisconnect = () => {
            ws.close()
        }

        Vue.prototype.$wsSend = data => {
            ws.send(data)
        }

        function handleVote(data) {
            api.getResult(data.questionId, (err, question) => {
                if (!err) options.store.dispatch('result/setResult', question)
            })
        }
    },
}
