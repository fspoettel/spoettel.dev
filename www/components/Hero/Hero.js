import React from 'react';
import { Section } from '../Section';
import { Profile } from '../Profile';
import { HeroActions } from './HeroActions';

export function Hero(props) {
  return (
    <Section height="calc(100vh - 0.5rem)" header={<HeroActions {...props} />}>
      <div>
        <header>
          <Profile />
        </header>
        <style jsx scoped>{`
          div {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>
    </Section>
  );
}
