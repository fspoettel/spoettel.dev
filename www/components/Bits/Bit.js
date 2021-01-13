import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlbum, faGamepad, faPopcorn, faRepeat, faTvRetro } from '@fortawesome/pro-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function getFormattedDate (val, prefix = 'on ') {
  if (!val) return null

  try {
    const dateStr = new Intl.DateTimeFormat('de-DE').format(new Date(val))
    return `${prefix}${dateStr}`
  } catch (err) {
    return null
  }
}

function BaseBit ({
  icon,
  info,
  children,
  data,
  title
}) {
  const linkTitle = title || data.title

  return (
    <div className='bit-container'>
      <div className='bit'>
        <div className='bit-inner'>
          <FontAwesomeIcon className='icon-size' icon={icon} />
          <span className='bit-content'>{children}&nbsp;<a className='bit-link' href={data.url} target='_blank' rel='noopener noreferrer'>{linkTitle}</a></span>
        </div>
        {info && (
          <div className='bit-info'>{info}</div>
        )}
      </div>
      <style jsx scoped>{`
        .bit-container {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: flex-start;
          min-height: calc(1.2rem * 2 + 0.5rem * 2 + 2px);
          max-width: 28rem;
        }

        .bit {
          position: relative;
          animation: fadeInLeft 0.3s ease-in-out forwards;
          text-transform: lowercase;
        }

        .bit-inner {
          position: relative;
          display: flex;
          flex-flow: row nowrap;
          padding: 0.5rem;
          background: rgb(var(--color-bg));
          border-radius: 0.25rem;
          border: 1px solid rgba(var(--color-highlight), 0.25);
          z-index: 2;
          line-height: 1.25;
        }

        .bit-info {
          position: absolute;
          top: calc(100% + 2px);
          right: 0.75rem;
          max-width: 100%;
          background: rgb(var(--color-text));
          color: rgb(var(--color-bg));
          font-size: 0.75rem;
          padding: 0 0.25rem;
          transform: translateY(calc(-100% - 2px));
          animation: slideInTop 0.15s ease-in-out forwards 0.3s;
          z-index: 1;
        }

        .bit-content {
          margin-left: 0.375em;
        }

        .bit-link {
          text-decoration-style: dotted;
          text-decoration-skip-ink: all;
        }

  
        @keyframes slideInTop {
          from {
            transform: translateY(calc(-100% - 2px));
          }

          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(calc(-100% + 2rem));
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}
      </style>
    </div>
  )
}

function GithubBit ({ bit }) {
  return (
    <BaseBit
      icon={faGithub}
      info={getFormattedDate(bit.data.starredAt)}
      {...bit}
    >
      Starred
    </BaseBit>
  )
}

function LastFmArtistBit ({ bit }) {
  const plays = bit.data.plays
  return (
    <BaseBit
      icon={faAlbum}
      info={`${plays} plays recently`}
      {...bit}
    >
      Listening to
    </BaseBit>
  )
}

function LastFmTrackBit ({ bit }) {
  const plays = bit.data.plays
  return (
    <BaseBit
      icon={faRepeat}
      info={`${plays} plays recently`}
      {...bit}
    >
      On repeat:
    </BaseBit>
  )
}

function SteamBit ({ bit }) {
  const hours = (Number.parseInt(bit.data.minutesPlayed) / 60).toPrecision(1)

  return (
    <BaseBit
      icon={faGamepad}
      info={`${hours}h recently`}
      {...bit}
    >
      Playing
    </BaseBit>
  )
}

function LetterboxdBit ({ bit }) {
  function getVerb () {
    const { rating } = bit.data
    if (Number.isNaN()) return null
    if (rating > 4) return 'Loved'
    if (rating >= 3.5) return 'Liked'
    if (rating === 3) return 'Enjoyed'
    return 'Disliked'
  }

  const verb = getVerb()

  return (
    <BaseBit
      {...bit}
      icon={faPopcorn}
      info={getFormattedDate(bit.data.watchedAt, 'on ')}
    >
      {verb ?? 'Watched'}
    </BaseBit>
  )
}

function TraktBit ({ bit }) {
  function getVerb () {
    if (bit.data.seasons.length > 1 || bit.data.episodes.length > 15) return 'Binging'
    return 'Watching'
  }

  const season = bit.data.seasons
    .sort((a, b) => a - b)[0]

  return (
    <BaseBit
      icon={faTvRetro}
      info={`Season ${season}`}
      {...bit}
    >
      {getVerb()}
    </BaseBit>
  )
}

export function Bit ({ bit }) {
  if (bit.type === 'github_star') return <GithubBit bit={bit} />
  if (bit.type === 'steam_playing') return <SteamBit bit={bit} />
  if (bit.type === 'letterboxd_watch') return <LetterboxdBit bit={bit} />
  if (bit.type === 'lastfm_artist') return <LastFmArtistBit bit={bit} />
  if (bit.type === 'lastfm_track') return <LastFmTrackBit bit={bit} />
  if (bit.type === 'trakt_watching') return <TraktBit bit={bit} />
  return null
}
