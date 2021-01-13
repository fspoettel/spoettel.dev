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

async function getWeeklyTopTracks ({ apiKey, user }, limit) {
  let tracks = []

  try {
    const {
      weeklychartlist: { chart }
    } = await makeLastFmRequest('user.getWeeklyChartList', user, { apiKey })

    if (chart.length === 0) return tracks

    const chartDefinitions = chart.length <= limit
      ? chart
      : chart.slice(chart.length - limit - 1, chart.length - 1)

    const charts = await Promise.all(
      chartDefinitions.map(
        c => makeLastFmRequest('user.getWeeklyTrackChart', user, {
          apiKey,
          from: c.from,
          to: c.to
        })
      )
    )

    tracks = charts
      .filter(c => c?.weeklytrackchart?.track?.length > 0)
      .map(c => ({
        track: c.weeklytrackchart.track[0],
        from: c.weeklytrackchart?.['@attr']?.from,
        to: c.weeklytrackchart?.['@attr']?.to
      }))
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

function toBitLastFmTrack ({ track, from, to }) {
  const title = `${track.artist['#text']} - ${track.name}`

  return {
    type: 'lastfm_track',
    data: {
      id: track.mbid || snakeCase(title),
      title,
      url: track.url,
      plays: track.playcount,
      week: [from, to]
    }
  }
}

module.exports = {
  async getTopArtistBits () {
    const artists = await getTopArtists({
      apiKey: process.env.LASTFM_API_KEY,
      user: process.env.LASTFM_USER,
      period: '1month'
    }, Infinity)

    return artists
      .map(toBitLastFmArtist)
      .filter((_, i) => i < 8)
  },
  async getTopTrackBits () {
    const tracks = await getWeeklyTopTracks({
      apiKey: process.env.LASTFM_API_KEY,
      user: process.env.LASTFM_USER
    }, 4)

    return tracks.reverse().map(toBitLastFmTrack)
  }
}
