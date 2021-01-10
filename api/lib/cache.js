// TODO back this with e.g. redis
class Cache {
  constructor () {
    this.store = new Map()
  }

  delete (key) {
    this.store.delete(key)
  }

  entries () {
    return this.store.entries()
  }

  set (key, value, ttl = 24 * 60 * 60 * 1000) {
    this.store.set(key, {
      createdAt: Date.now(),
      ttl,
      value
    })
  }

  get (key) {
    const entry = this.store.get(key)
    if (!entry) return undefined

    if (!this.isValid(entry)) {
      this.store.delete(key)
      return undefined
    }

    return entry
  }

  isValid (entry) {
    const { createdAt, ttl } = entry
    const now = Date.now()
    const age = now - createdAt
    return age <= ttl
  }
}

module.exports = Cache
