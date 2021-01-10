const got = require('got')
const { snakeCase } = require('lodash')
const { NotFoundError } = require('../lib/errors')

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'

function makeLastFmRequest (method, user, query) {
  return got(BASE_URL, {
    resolveBodyOnly: true,
    responseType: 'json',
    searchParams: {
      method,
      api_key: query.apiKey,
      format: 'json',
      user,
      ...query
    }
  })
}

async function getTopArtists ({ apiKey, user, period }, limit) {
  let artists = []

  try {
    const res = await makeLastFmRequest('user.gettopartists', user, {
      apiKey,
      limit,
      period
    })

    artists = res.topartists.artist
  } catch (err) {
    if (err instanceof got.HTTPError && err.response.statusCode === 404) {
      throw new NotFoundError(`user ${user} does not appear to be a valid last.fm user.`)
    } else {
      throw err
    }
  }

  return artists
}

function toBitLastFmArtist (data) {
  return {
    type: 'lastfm_artist',
    data: {
      id: snakeCase(data.name),
      url: data.url,
      plays: data.playcount,
      title: data.name
    }
  }
}

module.exports = async function getBits () {
  const artists = await getTopArtists({
    apiKey: process.env.LASTFM_API_KEY,
    user: process.env.LASTFM_USER,
    period: '1month'
  }, Infinity)

  return artists
    .map(toBitLastFmArtist)
    .filter((_, i) => i < 8)
}
