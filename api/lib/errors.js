class NotFoundError extends Error {}

function errorHandler (err, req, res, next) {
  if (res.headersSent) return next(err)
  console.error(err)
  const status = 500
  res.status(status)
  return res.json({ message: 'Internal server error' })
}

module.exports = { errorHandler, NotFoundError }
