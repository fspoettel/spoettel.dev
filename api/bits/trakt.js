const got = require('got')
const { uniq } = require('lodash')
const { NotFoundError } = require('../lib/errors')
const { isMaxDaysAgo } = require('../lib/helpers')

const BASE_URL = 'https://api.trakt.tv'

async function getShowHistory (config, limit) {
  let shows = []

  try {
    const res = await got(`${BASE_URL}/users/${config.user}/history/shows`, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': config.clientId
      },
      searchParams: {
        ...(config.params ?? {}),
        page: '1',
        limit: limit ?? 100
      },
      responseType: 'json',
      resolveBodyOnly: true
    })

    shows = res
  } catch (err) {
    if (err instanceof got.HTTPError && err.response.statusCode === 404) {
      throw new NotFoundError(`user ${config.user} does not appear to be a valid trakt user.`)
    } else {
      throw err
    }
  }

  return shows
}

function toBitTraktWatch (watch) {
  return {
    type: 'trakt_watching',
    data: {
      episodes: [watch.episode?.number],
      seasons: [watch.episode?.season],
      showId: watch.show.ids.trakt,
      title: watch.show.title,
      url: `https://trakt.tv/shows/${watch.show.ids.slug}`,
      watchedAt: new Date(watch.watched_at)
    }
  }
}

module.exports = async function getBits () {
  const watches = await getShowHistory({
    user: process.env.TRAKT_USER,
    clientId: process.env.TRAKT_CLIENT_ID,
    params: {
      // TODO temporary, remove me
      start_at: '2021-01-10T08:00:00+0000'
    }
  }, 50)

  const bits = watches
    .filter(x => Object.hasOwnProperty.call(x, 'show') && x.type === 'episode')
    .map(toBitTraktWatch)
    .filter((w, i) => i === 0 || isMaxDaysAgo(w.data.watchedAt, 30))

  const collectedShows = bits
    .reduce((acc, curr) => {
      const { showId } = curr.data

      const current = acc[showId]

      return {
        ...acc,
        [showId]: {
          ...(curr ?? {}),
          data: {
            ...curr.data,
            episodes: uniq([
              ...(current?.data.episodes ?? []),
              ...curr.data.episodes
            ]),
            seasons: uniq([
              ...(current?.data.seasons ?? []),
              ...curr.data.seasons
            ])
          }
        }
      }
    }, {})

  return Object.values(collectedShows)
}
