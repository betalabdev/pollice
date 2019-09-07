const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const http = require('http')
const https = require('https')
const fs = require('fs')

const socket = require('./services/socket')
const cors = require('./services/cors')
const env = require('./config/env')

mongoose.connect(env.mongodbUrl, {
  useNewUrlParser: true
})
mongoose.connection.on(
  'error',
  console.error.bind(console, 'connection error:')
)

const indexRouter = require('./routes/index')
const pollsRouter = require('./routes/polls')
const votesRouter = require('./routes/votes')
const resultsRouter = require('./routes/results')
const responsesRouter = require('./routes/responses')
const authRouter = require('./routes/auth')
const qrRouter = require('./routes/qr')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cors.init())

app.use('/', indexRouter)
app.use('/polls', pollsRouter)
app.use('/votes', votesRouter)
app.use('/results', resultsRouter)
app.use('/responses', responsesRouter)
app.use('/auth', authRouter)
app.use('/qr', qrRouter)

app.set('port', env.port)

let server
if (env.env == "local") {
  server = https.createServer({
      key: fs.readFileSync('./certs/server.key'),
      cert: fs.readFileSync('./certs/server.cert'),
  }, app)
} else {
  server = http.createServer(app)
}

socket.init(server)
server.listen(env.port)