function isMaxDaysAgo (date, days) {
  if (!(date instanceof Date) || Number.isNaN(date.valueOf())) return false
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  return startDate.getTime() < date.getTime()
}

function asyncHandler (callback) {
  return function (req, res, next) {
    callback(req, res, next).catch(next)
  }
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  asyncHandler,
  isMaxDaysAgo,
  randomInt
}
