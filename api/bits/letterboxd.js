const stream = require('stream')
const { promisify } = require('util')
const got = require('got')
const FeedParser = require('feedparser')
const { isMaxDaysAgo } = require('../lib/helpers')
const { NotFoundError } = require('../lib/errors')

const pipeline = promisify(stream.pipeline)

const BASE_URL = 'https://letterboxd.com'

async function getDiaryEntries ({ user }, limit) {
  const feedParser = new FeedParser({})

  const url = `${BASE_URL}/${user}/rss`
  const items = []

  const inputStream = got.stream(url, { responseType: 'text' })

  feedParser.on('readable', function () {
    let item

    // eslint-disable-next-line
    while (item = this.read()) {
      if (
        items.length < limit &&
        // eslint-disable-next-line
        item.hasOwnProperty.call(item, 'guid') &&
        item.guid.includes('-watch-')
      ) {
        items.push(item)
      }
    }
  })

  try {
    await pipeline(inputStream, feedParser)
  } catch (err) {
    if (err instanceof got.HTTPError && err.response.statusCode === 404) {
      throw new NotFoundError(`user ${user} does not appear to be a valid letterboxd user.`)
    } else {
      throw err
    }
  }
  return items
}

function toBitLetterboxdWatch (item) {
  const ratingField = item['letterboxd:memberrating']
  const titleField = item['letterboxd:filmtitle']
  const watchedDateField = item['letterboxd:watcheddate']
  const yearField = item['letterboxd:filmyear']

  return {
    type: 'letterboxd_watch',
    data: {
      id: item.guid,
      rating: ratingField ? Number.parseFloat(ratingField['#']) : undefined,
      title: titleField ? titleField['#'] : item.title,
      url: item.link,
      watchedAt: watchedDateField ? new Date(watchedDateField['#']) : undefined,
      year: yearField ? yearField['#'] : undefined
    }
  }
}

module.exports = async function getBits () {
  const entries = await getDiaryEntries({ user: process.env.LETTERBOXD_USER }, Infinity)
  return entries.map(toBitLetterboxdWatch)
    .filter((item, i) => isMaxDaysAgo(item.data.watchedAt, 30))
}
