import React from 'react';
import css from 'styled-jsx/css';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { className: svgClassName, styles: svgStyles } = css.resolve`
  svg {
    position: absolute;
    top: 1px;
    left: 0;
    z-index: 2;
    width: 12px;
    height: 12px;
  }
`;

export const Button = ({ className, href, icon, title, ...rest }) => {
  return (
    <a {...rest} className={cx('btn', className)} href={href} title={title}>
      {icon && <FontAwesomeIcon className={svgClassName} icon={icon} />}
      {title}
      {svgStyles}
      <style jsx>
        {`
          .btn {
            position: relative;
            border-radius: 0.125rem;
            border: 1px solid rgb(var(--color-text));
          }

          .btn:focus,
          .btn:active,
          .btn:hover {
            outline: none;
            border-color: rgb(var(--color-highlight));
          }

          .btn:focus::after,
          .btn:active::after,
          .btn:hover::after {
            outline: none;
            border-top-color: rgb(var(--color-highlight));
          }
        `}
      </style>
      <style jsx>
        {`
          .btn {
            position: relative;
            padding: 0.5rem 1.25rem;
            font-size: 1rem;
            line-height: 1.25;
            background-color: rgb(var(--color-bg));
            text-decoration: none;
            text-align: center;
            text-transform: lowercase;
          }

          .btn::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            content: '';
          }
        `}
      </style>
    </a>
  );
};
