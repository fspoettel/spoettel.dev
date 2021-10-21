import React, { useState } from 'react';
import Head from 'next/head';
import { description, name, ogDescription, title, url } from 'constants/data';
import { Hero } from 'components/Hero';
import { MouseTrail } from 'components/MouseTrail';
import apiService from 'lib/apiService';
import { getRandomBit } from 'components/Bits/helpers';

export async function getServerSideProps() {
  try {
    const bits = await apiService.getBits();
    const randomBit = getRandomBit(bits, []);

    return {
      props: {
        bits,
        bitId: randomBit.data.id,
        catId: randomBit.type,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: { bits: null },
    };
  }
}

export default function Home(props) {
  const [activeTheme, setTheme] = useState('default');

  const metaTitle = `${name} | ${title}`;

  const fontUrl =
    'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,800;1,400&display=swap';

  return (
    <div className="container">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />

        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${url}/assets/optimized/thumbnail.jpg`} />
        <meta property="og:description" content={ogDescription} />

        <link href={fontUrl} rel="stylesheet" type="text/css" />
      </Head>

      <div className='hero-container'>
        <Hero
          activeTheme={activeTheme}
          setTheme={setTheme}
          {...props}
        />
      </div>

      <div className='wave-container'></div>

      <MouseTrail />

      <article className='mixtapes-container'>
        <header className='mixtapes-header'>
          <h2 className='mixtapes-title'>Mixtapes</h2>
        </header>
        <iframe src="https://stakk.ltd/felix?embed" loading="lazy" />
      </article>

      <style jsx global>
        {`
          * {
            box-sizing: border-box;
          }

          :root {
            font-size: 90%;
          }

          @media screen and (min-width: 40rem) {
            :root {
              font-size: 100%;
            }
          }

          @media screen and (min-width: 95rem) {
            :root {
              font-size: 120%;
            }
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
            font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            font-weight: 400;
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

          .hero-container {
            position: relative;
            z-index: 1;
          }

          .mixtapes-container {
            background-color: #ffd700;
            color: rgb(4, 4, 4);
            padding-top: 1.5rem;
            z-index: 2;
            position: relative;
          }

          .mixtapes-header {
            padding: 0 1.5rem;
          }

          .mixtapes-title {
            font-size: 2.75rem;
          }

          .mixtapes-container iframe {
            width: 100%;
            height: 100vh;
            border:none;
            display: block;
            margin: 0;
          }

          .wave-container {
            position: relative;
          }
          
          .wave-container::before {
            content: "";
            width: 100%;
            height: 57px;
            position: absolute;
            bottom: 0;
            left: 0;
            background-size: auto;
            background-repeat: repeat no-repeat;
            background-position: 10vw bottom;
            background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1200 134' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 22L33 19C82 13 133 14 200 29C267 44 333 67 400 70C467 74 533 59 600 40C667 22 733 0 800 0C867 0 933 22 1000 29C1067 37 1133 29 1167 26L1200 22V134H1167C1133 134 1067 134 1000 134C933 134 867 134 800 134C733 134 667 134 600 134C533 134 467 134 400 134C333 134 267 134 200 134C133 134 67 134 33 134H0V22.332Z' fill='%23FFD700'/></svg>");
          }
        `}
      </style>
    </div>
  );
}
