import { faAt } from '@fortawesome/pro-regular-svg-icons'
import { faPopcorn } from '@fortawesome/pro-solid-svg-icons'
import { faGithub, faLastfm } from '@fortawesome/free-brands-svg-icons'

const firstName = 'Felix'
const lastName = 'Spöttel'

export const name = `${firstName} ${lastName}`
export const title = 'Software Developer'

const location = 'Berlin'

export const description = `Hey! I am ${firstName}, a ${title.toLowerCase()} from ${location}.`

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
