const debug = require('debug')('app:bits')
const { isMaxDaysAgo } = require('../lib/helpers')
const getGithubStars = require('./github')
const getLastFmArtists = require('./lastfm')
const getLetterboxdWatches = require('./letterboxd')
const getSteamGames = require('./steam')

const cache = new Map()

const bitMapping = {
  letterboxd_watch: getLetterboxdWatches,
  lastfm_artist: getLastFmArtists,
  github_star: getGithubStars,
  steam_playing: getSteamGames
}

async function retrieveBitsForType (type, fn) {
  debug(`${type}: retrieval request`)

  const cachedEntry = cache.get(type)

  if (cachedEntry) {
    debug(`${type}: found cached entry ${cachedEntry.createdAt}`)

    const cachedDate = new Date(cachedEntry.createdAt)

    if (!(isMaxDaysAgo(cachedDate, 1))) {
      debug(`${type}: expiring cache`)
      cache.delete(type)
    }

    debug(`${type}: returning cached entry with ${cachedEntry.response.length} bits`)
    return { [type]: cachedEntry.response }
  }

  debug(`${type}: starting retrieval`)

  try {
    const response = await fn()
    debug(`${type}: retrieved ${response.length} bits`)
    cache.set(type, { createdAt: Date.now(), response })
    return { [type]: response }
  } catch (err) {
    console.error(err)
    return { [type]: [] }
  }
}

async function retrieveBits () {
  const bits = await Promise.all(
    Object.entries(bitMapping).map(([key, value]) => retrieveBitsForType(key, value))
  )

  return bits.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

module.exports = retrieveBits
