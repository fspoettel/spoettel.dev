import { faAt } from '@fortawesome/pro-regular-svg-icons'
import { faPopcorn } from '@fortawesome/pro-solid-svg-icons'
import { faGithub, faLastfm } from '@fortawesome/free-brands-svg-icons'

const firstName = 'Felix'
const lastName = 'Spöttel'

export const name = `${firstName} ${lastName}`
export const title = 'Software Developer'

const location = 'Berlin'

export const description = `Personal website of ${name}.`
export const ogDescription = `Hey there, I'm ${firstName}! 👋 ` +
  `I live in ${location} and am interested in music, code and tinkering.`

export const url = 'https://spoettel.dev'

export const company = {
  name: 'Ciara',
  href: 'https://www.getciara.com/'
}

export const links = [
  {
    href: 'mailto://felix@spoet.tel',
    title: 'Email',
    icon: faAt
  },
  {
    href: 'https://github.com/fspoettel',
    title: 'Github',
    icon: faGithub
  },
  {
    href: 'https://last.fm/user/spoeti',
    title: 'Last.fm',
    icon: faLastfm
  },
  {
    href: 'https://letterboxd.com/fspoettel',
    title: 'Letterboxd',
    icon: faPopcorn
  }
]
