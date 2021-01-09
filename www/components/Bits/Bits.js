import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlbum, faGamepad, faPopcorn } from '@fortawesome/pro-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function BaseBit ({ icon, children, url, title }) {
  return (
    <div className='bit'>
      <FontAwesomeIcon className='icon-size' icon={icon} />
      <span className='bit-content'>{children}</span>&nbsp;
      <a className='bit-link' href={url} target='_blank' rel='noopener noreferrer'>{title}</a>
      <style jsx scoped>{`
        .bit {
          display: inline-block;
          text-transform: lowercase;
          line-height: 1;
          background: rgba(var(--color-bg), 1);
          padding: 0.5rem;
          border: 1px solid rgba(var(--color-highlight), 0.25);
          border-radius: 0.25rem;
        }

        .bit-content {
          margin-left: 0.375em;
        }

        .bit-link {
          text-decoration-style: dotted;
          text-decoration-skip-ink: all;
        }
      `}
      </style>
    </div>
  )
}

function GithubBit ({ bit }) {
  return <BaseBit icon={faGithub} {...bit}>Starred</BaseBit>
}

function LastFmBit ({ bit }) {
  return <BaseBit icon={faAlbum} {...bit}>Listening to</BaseBit>
}

function SteamBit ({ bit }) {
  return <BaseBit icon={faGamepad} {...bit}>Playing</BaseBit>
}

function LetterboxdBit ({ bit }) {
  const { rating } = bit

  function getVerb (rating) {
    if (rating > 4) return 'Loved'
    if (rating > 3) return 'Liked'
    if (rating > 2) return 'Disliked'
    return 'hated'
  }

  return <BaseBit icon={faPopcorn} {...bit}>{getVerb(rating)}</BaseBit>
}

export function Bit ({ bit }) {
  if (bit.type === 'github') return <GithubBit bit={bit} />
  if (bit.type === 'steam') return <SteamBit bit={bit} />
  if (bit.type === 'letterboxd') return <LetterboxdBit bit={bit} />
  return <LastFmBit bit={bit} />
}
