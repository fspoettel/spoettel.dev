const got = require('got')
const { NotFoundError } = require('../lib/errors')

const BASE_URL = 'https://api.steampowered.com'

async function getRecentlyPlayedGames (config, limit) {
  const res = await got(`${BASE_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/`, {
    searchParams: {
      key: config.apiKey,
      steamid: config.steamId,
      format: 'json',
      count: limit
    },
    responseType: 'json',
    resolveBodyOnly: true
  })

  if (res.response?.total_count === 0 || res.response?.games == null) {
    throw new NotFoundError(`user ${config.steamId} does not exist or has not played any games recently`)
  }

  return res.response.games
}

function toBitPlaying (game) {
  const SUBSTITUTIONS = {
    1111940: 'Quiplash 2',
    730: 'CS:GO',
    1284410: 'Gwent'
  }

  return {
    type: 'steam_playing',
    data: {
      id: game.appid,
      minutesPlayed: game.playtime_2weeks,
      title: SUBSTITUTIONS[game.appid] ?? game.name,
      url: `https://steamcommunity.com/app/${game.appid}`
    }
  }
}

module.exports = async function getBits () {
  const games = await getRecentlyPlayedGames({
    apiKey: process.env.STEAM_API_KEY,
    steamId: process.env.STEAM_USER
  })

  return games
    .map(toBitPlaying)
    .filter(g =>
      g.data.title !== 'SteamVR' &&
      g.data.title !== 'Virtual Desktop' &&
      g.data.minutesPlayed > 30
    )
}
