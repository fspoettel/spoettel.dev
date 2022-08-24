import React, { useCallback } from 'react';
import { faMoonStars, faSun } from '@fortawesome/pro-solid-svg-icons';
import { IconButton } from '../IconButton';
import { Bits } from '../Bits/Bits';

export function HeroActions(props) {
  const { activeTheme, setTheme, bits, bitCount, bitId, catId } = props;

  const onToggleTheme = useCallback(() => {
    setTheme((t) => {
      const nextTheme = t === 'default' ? 'light' : 'default';
      document.body.classList.remove(`theme-${t}`);
      document.body.classList.add(`theme-${nextTheme}`);
      return nextTheme;
    });
  }, [setTheme]);

  return (
    <aside className="hero-row">
      {bits && (
        <div className="hero-bit">
          <Bits bits={bits} bitCount={bitCount} initialCatId={catId} initialBitId={bitId} />
        </div>
      )}
      <div className="hero-actions">
        <IconButton
          onClick={onToggleTheme}
          icon={activeTheme === 'default' ? faSun : faMoonStars}
          aria-label="Toggle theme"
        />
      </div>
      <style jsx scoped>
        {`
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
            flex: 0 0 auto;
            text-align: right;
          }

          .hero-bit {
            flex: 1 1 auto;
          }
        `}
      </style>
    </aside>
  );
}
