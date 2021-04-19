const debug = require('debug')('app:bits')
const Cache = require('../lib/cache')
const getGithubStars = require('./github')
const { getTopArtistBits, getTopTrackBits } = require('./lastfm')
const getLetterboxdWatchedBits = require('./letterboxd')
const getSteamPlayingBits = require('./steam')
const getTraktWatchingBits = require('./trakt')

const BIT_MAPPING = {
  letterboxd_watch: getLetterboxdWatchedBits,
  lastfm_artist: getTopArtistBits,
  lastfm_track: getTopTrackBits,
  github_star: getGithubStars,
  steam_playing: getSteamPlayingBits,
  trakt_watching: getTraktWatchingBits
}

const cache = new Cache()

async function retrieveBitsForType (type, fn, { isForced }) {
  debug(`starting retrieve for: ${type}`)

  if (!isForced && cache.has(type)) {
    const cachedEntry = cache.get(type)
    debug(`${type}: returning cached entry with ${cachedEntry.value.length} bits`)
    return { [type]: cachedEntry.value }
  }

  const response = await fn()
  debug(`retrieved ${response.length} bits for ${type}`)

  cache.set(type, response)
  return { [type]: response }
}

async function retrieveBits ({ isForced = false } = {}) {
  debug('starting retrieve for all types')

  const results = await Promise.allSettled(
    Object.entries(BIT_MAPPING).map(([key, value]) => retrieveBitsForType(key, value, { isForced }))
  )

  const bits = []

  results.forEach(({ status, value, reason }) => {
    if (status === 'fulfilled') {
      bits.push(value)
    } else {
      // TODO log to sentry
      console.error(reason)
    }
  })

  return bits.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

module.exports = {
  BIT_MAPPING,
  retrieveBits,
  retrieveBitsForType
}
