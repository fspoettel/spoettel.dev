function isMaxDaysAgo (date, days = 31) {
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

module.exports = {
  asyncHandler,
  isMaxDaysAgo
}
