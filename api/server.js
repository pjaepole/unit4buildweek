const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
// const db = require('./data/db-config')
const UserRouter = require('./users/users-router')
const ShelfRouter = require('./shelf/shelf-router')
const ItemRouter = require('./items/items-router')
const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/users', UserRouter)
server.use('/api/shelf', ShelfRouter)
server.use('/api/owner', ItemRouter)

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server