import React, { useState } from 'react'
import Head from 'next/head'
import {
  description,
  name,
  title,
  url
} from 'constants/data'
import { Hero } from 'components/Hero'

export default function Home () {
  const [activeTheme, setTheme] = useState('default')

  const metaTitle = `${name} | ${title}`

  return (
    <div className='container'>
      <Head>
        <title>{metaTitle}</title>
        <link rel='icon' href='/favicon.ico' />
        <link href='https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,800;1,300;1,800&display=swap' rel='stylesheet' />

        <meta property='og:title' content={metaTitle} />
        <meta property='og:url' content={url} />
        <meta property='og:image' content={`${url}/assets/optimized/thumbnail.jpg`} />
        <meta property='og:description' content={description} />
      </Head>

      <Hero activeTheme={activeTheme} setTheme={setTheme} />

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          --color-bg: 4, 4, 4;
          --color-text: 255, 255, 255;
          --color-highlight: 187, 187, 187;
        }

        body.theme-light {
          --color-bg: 250, 250, 250;
          --color-text: 4, 4, 4;
          --color-highlight: 153, 153, 153;
        }

        body {
          font-family: 'Work Sans', sans-serif;
          font-weight: 300;
          color: currentColor;
          line-height: 1.45;
          background: rgb(var(--color-bg));
          color: rgb(var(--color-text));
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
          outline: 1px solid rgb(var(--color-highlight));
        }

        .icon-size {
          width: 1em;
          height: 1em;
        }
      `}
      </style>
    </div>
  )
}
