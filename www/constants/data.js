import { faAt } from '@fortawesome/pro-regular-svg-icons';
import { faPopcorn } from '@fortawesome/pro-solid-svg-icons';
import { faGithub, faLastfm, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const firstName = 'Felix';
const lastName = 'Spöttel';

export const name = `${firstName} ${lastName}`;
export const title = 'software engineer';

const email = 'felix@spoet.tel';

export const description =
  `Hey! ` +
  "I'm Felix, a software engineer from Berlin interested in user interfaces, music and microcontrollers.";

export const ogDescription = description;

export const url = 'https://spoettel.dev';

export const company = {
  name: 'Hema.to',
  href: 'https://www.hema.to/',
};

export const links = [
  {
    href: `mailto://${email}`,
    title: 'Email',
    icon: faAt,
  },
  {
    href: 'https://www.linkedin.com/in/fspoettel/',
    title: 'Linkedin',
    icon: faLinkedin,
  },
  {
    href: 'https://github.com/fspoettel',
    title: 'Github',
    icon: faGithub,
  },
  {
    href: 'https://last.fm/user/otiswedding',
    title: 'Last.fm',
    icon: faLastfm,
  },
  {
    href: 'https://letterboxd.com/fspoettel',
    title: 'Letterboxd',
    icon: faPopcorn,
  },
];
