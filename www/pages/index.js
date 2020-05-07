import React from 'react'
import Head from 'next/head'
import { Nav } from '../components/Nav'
import { Portrait } from '../components/Portrait'

const name = 'Felix Spöttel'
const title = 'Software Developer'

const company = {
  name: 'Ciara',
  href: 'https://www.getciara.com/'
}

const links = [
  {
    href: 'mailto://felix@spoet.tel',
    title: 'Email'
  },
  {
    href: 'https://github.com/fspoettel',
    title: 'Github'
  },
  {
    href: 'https://last.fm/user/spoeti',
    title: 'Last.fm'
  },
  {
    href: 'https://letterboxd.com/fspoettel',
    title: 'Letterboxd'
  }
]

export default function Home () {
  return (
    <div className='container'>
      <Head>
        <title>{name} | {title}</title>
        <link rel='icon' href='/favicon.ico' />
        <link href='https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,800;1,300;1,800&display=swap' rel='stylesheet' />
      </Head>
      <main>
        <header className='header'>
          <div>
            <Portrait
              backgroundColor='#101010'
              color='#dedede'
              name={name}
              size='8rem'
              src='/portrait.jpg'
            />
            <div className='titles'>
              <h1 className='name'>{name}</h1>
              <h2 className='position'>{title} @ <a href={company.href}>{company.name}</a></h2>
            </div>
          </div>
        </header>
        <Nav links={links} />
      </main>
      <style jsx>{`
        main {
          display: flex;
          flex-flow: column nowrap;
          height: 100%;
          position: relative;
          padding: 0.5rem;
          overflow-y: auto;
        }

        header {
          flex: 1 1 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-bottom: 2rem;
        }

        .titles {
          margin-top: 0.5rem;
        }

        .name {
          font-size: 2.25rem;
          margin-bottom: 0.5rem;
        }

        .position {
          font-size: 1.125rem;
          text-transform: lowercase;
          font-weight: 300;
          font-style: italic;
        }

        @media screen and (min-width: 30rem) {
          main {
            padding: 1.5rem;
          }
        }
      `}
      </style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          font-family: 'Work Sans', sans-serif;
          font-weight: 300;
          color: currentColor;
          line-height: 1.45;
          background: #101010;
          color: #fefefe;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 800;
          line-height: 1;
          margin: 0;
        }

        a {
          color: currentColor;
        }

        a:focus {
          outline: 1px solid #fefefe;
        }

        html,
        body,
        #__next,
        .container {
          padding: 0;
          margin: 0;
          position: relative;
          height: 100%;
        }
      `}
      </style>
    </div>
  )
}
