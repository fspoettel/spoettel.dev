const express = require('express')
const helmet = require('helmet')
const retrieveBits = require('./bits')
const { asyncHandler } = require('./lib/helpers')
const schedule = require('./lib/schedule')

const app = express()

app.use(helmet())

app.set('port', process.env.PORT || 3001)

app.get('/api/bits', asyncHandler(async (req, res) => {
  try {
    const bits = await retrieveBits()
    return res.json(bits)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: { code: 'internal_server_error' }
    })
  }
}))

schedule(4 * 60 * 60 * 1000, () => retrieveBits({ isForced: true }))

module.exports = app
