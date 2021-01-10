const debug = require('debug')('app:bits')
const { isMaxDaysAgo } = require('../lib/helpers')
const getGithubStars = require('./github')
const getLastFmArtistBits = require('./lastfm')
const getLetterboxdWatchedBits = require('./letterboxd')
const getSteamPlayingBits = require('./steam')
const getTraktWatchingBits = require('./trakt')

const cache = new Map()

const bitMapping = {
  letterboxd_watch: getLetterboxdWatchedBits,
  lastfm_artist: getLastFmArtistBits,
  github_star: getGithubStars,
  steam_playing: getSteamPlayingBits,
  trakt_watching: getTraktWatchingBits
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
