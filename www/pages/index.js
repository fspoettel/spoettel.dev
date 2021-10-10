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

      <Hero activeTheme={activeTheme} setTheme={setTheme} {...props} />
      <MouseTrail />

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

          .container {
            position: relative;
          }
        `}
      </style>
    </div>
  );
}
