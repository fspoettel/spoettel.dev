import React, { useState } from 'react';
import Head from 'next/head';
import { description, name, ogDescription, title, url } from 'constants/data';
import { Hero } from 'components/Hero';
import { MouseTrail } from 'components/MouseTrail';
import apiService from 'lib/apiService';
import { getBitCount, getRandomBit } from 'components/Bits/helpers';
import { Container } from 'components/Container';

export async function getServerSideProps() {
  try {
    const bits = await apiService.getBits();
    const randomBit = getRandomBit(bits, []);

    return {
      props: {
        bits,
        bitCount: getBitCount(bits),
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

  return (
    <div className="page">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />

        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${url}/assets/images/thumbnail.jpg`} />
        <meta property="og:description" content={ogDescription} />
      </Head>

      <MouseTrail />

      <div className="hero-container">
        <Hero activeTheme={activeTheme} setTheme={setTheme} {...props} />
      </div>

      <Container
        backgroundColor="#ffd700"
        color="rgb(4, 4, 4)"
        title="My Mixtapes"
      >
        <iframe className='mixtapes-embed' src="https://stakk.ltd/felix?embed" loading="lazy" />
      </Container>

      <style jsx scoped>{`
        .hero-container {
          position: relative;
          z-index: 1;
        }

        .mixtapes-embed {
          width: 100%;
          height: 100vh;
          border: none;
          display: block;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
