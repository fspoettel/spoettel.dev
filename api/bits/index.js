const debug = require('debug')('app:bits')
const Cache = require('../lib/cache')
const getGithubStars = require('./github')
const getLastFmArtistBits = require('./lastfm')
const getLetterboxdWatchedBits = require('./letterboxd')
const getSteamPlayingBits = require('./steam')
const getTraktWatchingBits = require('./trakt')

const bitMapping = {
  letterboxd_watch: getLetterboxdWatchedBits,
  lastfm_artist: getLastFmArtistBits,
  github_star: getGithubStars,
  steam_playing: getSteamPlayingBits,
  trakt_watching: getTraktWatchingBits
}

const cache = new Cache()

async function retrieveBitsForType (type, fn) {
  debug(`${type}: retrieval request`)
  const cachedEntry = cache.get(type)

  if (cachedEntry) {
    debug(`${type}: returning cached entry with ${cachedEntry.value.length} bits`)
    return { [type]: cachedEntry.value }
  }

  try {
    const response = await fn()
    debug(`${type}: retrieved ${response.length} bits`)
    cache.set(type, response)
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
