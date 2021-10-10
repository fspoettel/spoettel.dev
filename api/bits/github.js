const got = require('got');
const { NotFoundError } = require('../lib/errors');
const { isMaxDaysAgo } = require('../lib/helpers');

const BASE_URL = 'https://api.github.com';

async function getStarsForUser({ accessToken, user }, limit) {
  let stars = [];

  try {
    stars = await got(`${BASE_URL}/users/${user}/starred`, {
      headers: {
        Accept: 'application/vnd.github.v3.star+json',
        Authorization: `Basic ${Buffer.from(`${user}:${accessToken}`).toString('base64')}`,
      },
      searchParams: {
        sort: 'created',
        direction: 'desc',
        per_page: limit,
        page: 0,
      },
      resolveBodyOnly: true,
      responseType: 'json',
    });
  } catch (err) {
    if (err instanceof got.HTTPError && err.response.statusCode === 404) {
      throw new NotFoundError(`user ${user} does not appear to be a valid GitHub user.`);
    } else {
      throw err;
    }
  }

  return stars;
}

function toBitGithubStar(data) {
  return {
    type: 'github_star',
    data: {
      id: data.repo.id,
      starredAt: new Date(data.starred_at),
      url: data.repo.html_url,
      title: `${data.repo.owner.login}/${data.repo.name}`,
      description: data.repo.description,
    },
  };
}

async function getGithubStars() {
  const stars = await getStarsForUser(
    {
      user: process.env.GITHUB_USER,
      accessToken: process.env.GITHUB_ACCESS_TOKEN,
    },
    50,
  );

  return stars.map(toBitGithubStar).filter((s) => isMaxDaysAgo(s.data.starredAt, 30));
}

module.exports = getGithubStars;
