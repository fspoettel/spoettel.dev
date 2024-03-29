const got = require('got');
const { NotFoundError } = require('../lib/errors');
const { isMaxDaysAgo } = require('../lib/helpers');

const BASE_URL = 'https://api.trakt.tv';

function uniq(arr) {
  return Array.from(new Set(arr));
}

async function getShowHistory(config, limit) {
  let shows = [];

  try {
    const res = await got(`${BASE_URL}/users/${config.user}/history/shows`, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': config.clientId,
      },
      searchParams: {
        ...(config.params ?? {}),
        page: '1',
        limit: limit ?? 100,
      },
      responseType: 'json',
      resolveBodyOnly: true,
    });

    shows = res;
  } catch (err) {
    if (err instanceof got.HTTPError && err.response.statusCode === 404) {
      throw new NotFoundError(`user ${config.user} does not appear to be a valid trakt user.`);
    } else {
      throw err;
    }
  }

  return shows;
}

function toBitTraktWatch(watch) {
  return {
    type: 'trakt_watching',
    data: {
      seasons: [watch.episode?.season],
      id: watch.show.ids.trakt,
      title: watch.show.title,
      url: `https://trakt.tv/shows/${watch.show.ids.slug}`,
      watchedAt: new Date(watch.watched_at),
    },
  };
}

module.exports = async function getBits() {
  const watches = await getShowHistory(
    {
      user: process.env.TRAKT_USER,
      clientId: process.env.TRAKT_CLIENT_ID,
      params: {
        // TODO temporary, remove me
        start_at: '2021-01-10T08:00:00+0000',
      },
    },
    50,
  );

  const bits = watches
    .filter((x) => Object.hasOwnProperty.call(x, 'show') && x.type === 'episode')
    .map(toBitTraktWatch)
    .filter((w) => isMaxDaysAgo(w.data.watchedAt, 30));

  const collectedShows = bits.reduce((acc, curr) => {
    const { id } = curr.data;

    const current = acc[id];

    return {
      ...acc,
      [id]: {
        ...(curr ?? {}),
        data: {
          ...curr.data,
          seasons: uniq([...(current?.data.seasons ?? []), ...curr.data.seasons]).sort(
            (a, b) => a - b,
          ),
        },
      },
    };
  }, {});

  return Object.values(collectedShows);
};
