import React, { useCallback } from 'react'
import css from 'styled-jsx/css'
import { faMoonStars, faSun } from '@fortawesome/pro-solid-svg-icons'
import { IconButton } from './IconButton'
import { Section } from './Section'
import { Profile } from './Profile'
import { Bit } from './Bits/Bits'

const { className: heroCx, styles: heroStyles } = css.resolve`
div {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
`

const { className: heroHeaderCx, styles: heroHeaderStyles } = css.resolve`
header {
  text-align: center;
}
`

export function Hero (props) {
  const {
    activeTheme,
    bits,
    initialBitIndex,
    setTheme
  } = props

  const onToggleTheme = useCallback(() => {
    setTheme(t => {
      const nextTheme = t === 'default' ? 'light' : 'default'
      document.body.classList.remove(`theme-${t}`)
      document.body.classList.add(`theme-${nextTheme}`)
      return nextTheme
    })
  })

  return (
    <Section
      full
      content={(
        <div className={heroCx}>
          <header className={heroHeaderCx}>
            <Profile />
          </header>
          {heroHeaderStyles}
          {heroStyles}
        </div>
      )}
    >
      <aside className='hero-row'>
        <div className='hero-bit'>
          <Bit bit={bits[initialBitIndex]} />
        </div>
        <div className='hero-actions'>
          <IconButton
            onClick={onToggleTheme}
            icon={activeTheme === 'default' ? faSun : faMoonStars}
          />
        </div>
      </aside>
      <style jsx scoped>{`
        .hero-actions {
          text-align: right;
        }

        .hero-row {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
        }

        .hero-actions {
          flex: 0;
          order: 2;
        }

        .hero-bit {
          flex: 1;
        }
      `}
      </style>
    </Section>
  )
}
