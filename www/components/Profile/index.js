import React from 'react';
import css from 'styled-jsx/css';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeMerge } from '@fortawesome/pro-solid-svg-icons';
import { Portrait } from './Portrait';
import { Titles } from './Titles';

import { company, links, name, title } from '../../constants/data';
import { Button } from '../Button';

const { className, styles } = css.resolve`
  .btn {
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  @media screen and (min-width: 30rem) {
    .btn {
      display: inline;
      width: auto;
      margin-bottom: 0;
    }

    .btn:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

const { className: iconClassName, styles: iconStyles } = css.resolve`
  svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
`;

export const Profile = ({ activeTheme }) => (
  <div className="h-card">
    <Portrait name={name} size="8rem" />
    <Titles name={name}>
      <span className="p-job-title">{title}</span>
      &nbsp;
      <FontAwesomeIcon className={iconClassName} icon={faCodeMerge} size="1x" />
      &nbsp;
      <a className="p-org h-card" href={company.href}>
        {company.name}
      </a>
    </Titles>
    <nav className="nav">
      {links.map(({ href, icon, title }) => (
        <Button
          className={cx(className, {
            'u-email': href.includes('mailto:'),
            'u-url': href.includes('http'),
          })}
          href={href}
          icon={icon}
          key={href}
          rel={href.includes('http') ? 'me' : null}
          theme={activeTheme}
          title={title}
        />
      ))}
    </nav>
    <style scoped jsx>
      {`
        .nav {
          margin-top: 1.5rem;
        }

        @media screen and (min-width: 30rem) {
          .nav {
            display: flex;
            flex-flow: row nowrap;
            flex: 0 0 auto;
            justify-content: center;
          }
        }
      `}
    </style>
    {styles}
    {iconStyles}
  </div>
);
