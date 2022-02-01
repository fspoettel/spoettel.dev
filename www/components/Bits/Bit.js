import cx from 'classnames';
import css from 'styled-jsx/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlbum,
  faGamepad,
  faPopcorn,
  faRepeat,
  faTvRetro,
} from '@fortawesome/pro-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const { className: iconCx, styles: iconStyles } = css.resolve`
  svg {
    margin-top: 0.125em;
  }
`;

function getFormattedDate(val, prefix = 'on ') {
  if (!val) return null;

  try {
    const dateStr = new Intl.DateTimeFormat('de-DE').format(new Date(val));
    return `${prefix}${dateStr}`;
  } catch (err) {
    return null;
  }
}

function BaseBit({ icon, info, children, data, title, onTransitionEnd, visible }) {
  const linkTitle = title || data.title;

  return (
    <div className="bit-container">
      <div className={cx('bit', { bit_visible: visible })} onTransitionEnd={onTransitionEnd}>
        <div className="bit-inner">
          <FontAwesomeIcon className={cx('icon-size', iconCx)} icon={icon} />
          <span className="bit-content">
            {children}&nbsp;
            <a className="bit-link" href={data.url} target="_blank" rel="noopener noreferrer">
              {linkTitle}
            </a>
          </span>
        </div>
        {info && <div className="bit-info">{info}</div>}
      </div>
      {iconStyles}
      <style jsx scoped>
        {`
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
            text-transform: lowercase;
            transform: translateX(calc(-100% - 2rem));
            transition: 0.3s transform ease-in-out 0.15s;
          }

          .bit_visible {
            transform: none;
            transition: 0.3s transform ease-in-out;
          }

          .bit-inner {
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            align-items: flex-start;
            padding: 0.5rem;
            background: rgb(var(--color-bg));
            border-radius: 0.125rem;
            border: 1px solid rgba(var(--color-highlight), 0.25);
            z-index: 2;
            line-height: 1.25;
          }

          .bit-info {
            position: absolute;
            top: calc(100% + 2px);
            right: 0.5rem;
            max-width: 100%;
            background: rgb(var(--color-text));
            color: rgb(var(--color-bg));
            font-size: 0.75rem;
            padding: 0 0.25rem;
            transform: translateY(calc(-100% - 2px));
            transition: 0.15s transform ease-in-out;
            z-index: 1;
          }

          .bit_visible .bit-info {
            transform: none;
            transition: 0.15s transform ease-in-out 0.3s;
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
  );
}

function GithubBit({ bit, ...rest }) {
  return (
    <BaseBit icon={faGithub} info={getFormattedDate(bit.data.starredAt)} {...bit} {...rest}>
      Starred
    </BaseBit>
  );
}

function LastFmArtistBit({ bit, ...rest }) {
  const plays = bit.data.plays;
  return (
    <BaseBit icon={faAlbum} info={`${plays} plays recently`} {...bit} {...rest}>
      Listening to
    </BaseBit>
  );
}

function LastFmTrackBit({ bit, ...rest }) {
  const plays = bit.data.plays;
  return (
    <BaseBit icon={faRepeat} info={`${plays} plays recently`} {...bit} {...rest}>
      On repeat:
    </BaseBit>
  );
}

function SteamBit({ bit, ...rest }) {
  const hours = (Number.parseInt(bit.data.minutesPlayed, 10) / 60).toFixed(1);

  return (
    <BaseBit icon={faGamepad} info={`${hours}h recently`} {...bit} {...rest}>
      Playing
    </BaseBit>
  );
}

function LetterboxdBit({ bit, ...rest }) {
  function getVerb() {
    const { rating } = bit.data;
    if (Number.isNaN()) return null;
    if (rating > 4) return 'Loved';
    if (rating >= 3.5) return 'Liked';
    if (rating === 3) return 'Enjoyed';
    return 'Disliked';
  }

  const verb = getVerb();

  return (
    <BaseBit icon={faPopcorn} info={getFormattedDate(bit.data.watchedAt, 'on ')} {...bit} {...rest}>
      {verb ?? 'Watched'}
    </BaseBit>
  );
}

function TraktBit({ bit, ...rest }) {
  const { seasons } = bit.data;

  const hasMultipleSeasons = seasons.length > 1;

  function getVerb() {
    if (hasMultipleSeasons) return 'Binging';
    return 'Watching';
  }

  const latestSeason = seasons[seasons.length - 1];

  const info = hasMultipleSeasons
    ? `Seasons ${seasons[0]} - ${latestSeason}`
    : `Season ${latestSeason}`;

  return (
    <BaseBit icon={faTvRetro} info={info} {...bit} {...rest}>
      {getVerb()}
    </BaseBit>
  );
}

export function Bit({ bit, ...rest }) {
  if (bit.type === 'github_star') return <GithubBit bit={bit} {...rest} />;
  if (bit.type === 'steam_playing') return <SteamBit bit={bit} {...rest} />;
  if (bit.type === 'letterboxd_watch') return <LetterboxdBit bit={bit} {...rest} />;
  if (bit.type === 'lastfm_artist') return <LastFmArtistBit bit={bit} {...rest} />;
  if (bit.type === 'lastfm_track') return <LastFmTrackBit bit={bit} {...rest} />;
  if (bit.type === 'trakt_watching') return <TraktBit bit={bit} {...rest} />;
  return null;
}
