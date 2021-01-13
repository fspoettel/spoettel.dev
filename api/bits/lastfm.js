const got = require('got')
const snakeCase = require('lodash.snakecase')
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

async function getTopTracks ({ apiKey, user, period }, limit) {
  let tracks = []

  try {
    const res = await makeLastFmRequest('user.gettoptracks', user, {
      apiKey,
      limit,
      period
    })

    tracks = res.toptracks.track
  } catch (err) {
    if (err instanceof got.HTTPError && err.response.statusCode === 404) {
      throw new NotFoundError(`user ${user} does not appear to be a valid last.fm user.`)
    } else {
      throw err
    }
  }

  return tracks
}

function toBitLastFmArtist (data) {
  return {
    type: 'lastfm_artist',
    data: {
      id: data.mbid || snakeCase(data.name),
      url: data.url,
      plays: data.playcount,
      title: data.name
    }
  }
}

function toBitLastFmTrack (track) {
  const title = `${track.artist.name} - ${track.name}`

  return {
    type: 'lastfm_track',
    data: {
      id: track.mbid || snakeCase(title),
      title,
      url: track.url,
      plays: track.playcount
    }
  }
}

module.exports = {
  async getTopArtistBits () {
    const artists = await getTopArtists({
      apiKey: process.env.LASTFM_API_KEY,
      user: process.env.LASTFM_USER,
      period: '1month'
    }, 5)

    return artists.map(toBitLastFmArtist)
  },
  async getTopTrackBits () {
    const tracks = await getTopTracks({
      apiKey: process.env.LASTFM_API_KEY,
      user: process.env.LASTFM_USER,
      period: '1month'
    }, 5)

    return tracks.map(toBitLastFmTrack)
  }
}
