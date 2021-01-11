const debug = require('debug')('app:schedule')

function schedule (interval, task) {
  const invoke = () => {
    debug('running scheduled task')
    task().catch((err) => { console.err(err) })
    setTimeout(invoke, interval)
  }

  invoke()
}

module.exports = schedule
