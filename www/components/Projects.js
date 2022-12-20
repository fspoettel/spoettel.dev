import {
  faDocker,
  faGithub,
  faNodeJs,
  faPhp,
  faPython,
  faRaspberryPi,
  faReact,
  faRust,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobeEurope } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Heading } from './Heading';
import { Section } from './Section';

const tags = {
  docker: {
    name: 'Docker',
    icon: faDocker,
  },
  raspberrypi: {
    name: 'Raspberry Pi',
    icon: faRaspberryPi,
  },
  react: {
    name: 'React',
    icon: faReact,
  },
  python: {
    name: 'Python',
    icon: faPython,
  },
  php: {
    name: 'PHP',
    icon: faPhp,
  },
  nodejs: {
    name: 'Node.js',
    icon: faNodeJs,
  },
  rust: {
    name: 'Rust',
    icon: faRust,
  },
};

const projects = [
  {
    description:
      '📍 command-line tool for clustering geolocations.',
    href: 'https://github.com/bellingcat/geoclustering',
    title: 'bellingcat/geoclustering',
    tags: ['python'],
    year: 2022,
    type: 'github',
  },
  {
    description:
      '🛫 discover ambient records while listening to live airport chatter from all around the world.',
    href: 'https://ambient-and-airports.vercel.app/',
    title: 'Ambient & Airports',
    tags: ['react'],
    year: 2022,
    type: 'website',
  },
  {
    description:
      '🎄Template for solving Advent of Code in Rust.',
    href: 'https://github.com/fspoettel/advent-of-code-rust',
    title: 'advent-of-code-rust',
    tags: ['rust'],
    year: 2022,
    type: 'github',
  },
  {
    description: '📟 command-line tool to generate random ids.',
    href: 'https://github.com/fspoettel/getid',
    title: 'getid',
    tags: ['rust'],
    year: 2022,
    type: 'github',
  },
  {
    description: '🌍 contributed deployment instructions for fly.',
    href: 'https://github.com/sissbruecker/linkding',
    title: 'sissbruecker/linkding',
    tags: ['docker'],
    year: 2022,
    type: 'github',
  },
  {
    description: '🌍 contributed UI components & bug fixes.',
    href: 'https://github.com/bellingcat/ukraine-timemap',
    title: 'bellingcat/ukraine-timemap',
    tags: ['react'],
    year: 2022,
    type: 'github',
  },
  {
    description: '💿 tool for sharing mixtapes and playlists as a stack of records.',
    href: 'https://stakk.space',
    title: 'stakk',
    tags: ['react'],
    year: 2021,
    type: 'website',
  },
  {
    description: '🎄 rust solutions for advent of code 2021.',
    href: 'https://github.com/fspoettel/advent-of-code-2021',
    title: 'advent of code 2021',
    tags: ['rust'],
    year: 2021,
    type: 'github',
  },
  {
    description: '📧 contributed admin panel 2FA.',
    href: 'https://github.com/mail-in-a-box/mailinabox',
    title: 'mail-in-a-box/mailinabox',
    tags: ['python'],
    year: 2020,
    type: 'github',
  },
  {
    description: '🖼️ wireless LED album art display for spotify, mpd+ncmpcpp and other players.',
    href: 'https://github.com/fspoettel/thirtytwopixels',
    title: 'thirtytwopixels',
    tags: ['raspberrypi', 'python'],
    year: 2020,
    type: 'github',
  },
  {
    description: '🤖 media transcription service built around the Google Cloud Speech-To-Text API.',
    href: 'https://github.com/fspoettel/moneypenny',
    title: 'Moneypenny',
    tags: ['nodejs'],
    year: 2020,
    type: 'github',
  },
  {
    description: '🧰 open-sourced our react bindings for the Salesforce Lightning Design System.',
    href: 'https://github.com/react-lds/react-lds',
    title: 'react-lds/react-lds',
    tags: ['react'],
    year: 2018,
    type: 'github',
  },
  {
    description: '🎭 website for a local puppet theater.',
    href: 'https://weidringer.de',
    title: 'Figurentheater Weidringer',
    tags: ['php'],
    year: 2017,
    type: 'website',
  },
];

export function Projects() {
  return (
    <Section header={<Heading>Projects &amp; Contributions</Heading>}>
      <div className="projects">
        {projects.map((p) => (
          <article className="project" key={p.href}>
            <a target="_blank" rel="noreferrer" href={p.href}>
              <header className="project-header">
                <h3 className="project-title">{p.title.toLocaleLowerCase()}</h3>
              </header>
              <p className="project-description">{p.description}</p>
              <footer className="project-footer">
                <div className="project-year">
                  <FontAwesomeIcon
                    icon={p.type === 'github' ? faGithub : faGlobeEurope}
                    size="1x"
                  />
                  <span>{p.year}</span>
                </div>
                <ul className="project-tags">
                  {p.tags.map((t) => (
                    <li className="tag" key={t}>
                      <FontAwesomeIcon title={tags[t].name} icon={tags[t].icon} />
                    </li>
                  ))}
                </ul>
              </footer>
            </a>
          </article>
        ))}
      </div>
      <style jsx scoped>{`
        .projects {
          margin: 3rem 0;
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          grid-auto-flow: row dense;
          gap: 1.5rem;
          align-content: flex-start;
        }

        @media screen and (min-width: 40rem) {
          .projects {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media screen and (min-width: 54rem) {
          .projects {
            grid-template-columns: repeat(3, 1fr);
            max-width: 82.5rem;
            margin: 3rem auto;
            gap: 3rem;
          }
        }

        .project {
          --padding: 1rem;
          --radius: 0.5rem;
          border: 1px solid rgba(var(--color-text), 0.12);
          background: rgba(var(--color-text), 0.03);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 4px 4px 0 rgba(var(--color-text), 0.09);
          transition: 0.2s all ease-in-out;
        }

        .project:hover {
          transform: scale(1.01);
          box-shadow: 7px 7px 0 rgba(var(--color-text), 0.09);
          transition: 0.2s all ease-in-out;
        }

        .project > a {
          display: flex;
          flex-flow: column nowrap;
          text-decoration: none;
          height: 100%;
        }

        .project-header {
          flex: 0 0 auto;
          padding: var(--padding);
          max-width: 40ch;
        }

        .project-title {
          font-size: 1.375rem;
          line-height: 1.25;
        }

        .project-description {
          flex: 1 1 auto;
          margin: 0;
          padding: 0 var(--padding) var(--padding) var(--padding);
          max-width: 40ch;
        }

        .project-footer {
          flex: 0 0 auto;
          padding: 0 var(--padding) var(--padding) var(--padding);
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;
        }

        .project-year {
          font-size: 82.5%;
        }

        .project-year span {
          margin-left: 0.375rem;
        }

        .project-tags {
          list-style: none;
          display: inline-flex;
          margin: 0;
          padding: 0;
        }

        .project-tags > *:not(:last-child) {
          margin-right: 0.5rem;
        }
      `}</style>
    </Section>
  );
}
