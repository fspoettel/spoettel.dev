import React from 'react'
import { faMoonStars, faSun } from '@fortawesome/pro-solid-svg-icons'
import { IconButton } from './IconButton'
import { Section } from './Section'
import { Profile } from './Profile'

export const Hero = ({ activeTheme, setTheme }) => (
  <Section
    full
    title={(
      <IconButton
        onClick={() => {
          setTheme(t => {
            const nextTheme = t === 'default' ? 'light' : 'default'
            document.body.classList.remove(`theme-${t}`)
            document.body.classList.add(`theme-${nextTheme}`)
            return nextTheme
          })
        }}
        icon={activeTheme === 'default'
          ? faSun
          : faMoonStars}
      />
    )}
  >
    <div className='hero'>
      <header className='header'>
        <Profile />
      </header>
    </div>
    <style jsx>{`
      .hero {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      .header {
        text-align: center;
      }

      @media screen and (min-width: 30rem) {
        .section {
          padding: 1.5rem;
        }
      }
    `}
    </style>
  </Section>
)
