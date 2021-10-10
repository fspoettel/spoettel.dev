import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const IconButton = ({ icon, ...rest }) => (
  <button {...rest}>
    <FontAwesomeIcon className="icon-size" icon={icon} />
    <style jsx>
      {`
        button {
          -webkit-appearance: none;
          appearance: none;
          border: none;
          outline: none;
          background: transparent;
          display: inline-block;
          font-size: 1.25rem;
          cursor: pointer;
          color: currentColor;
          padding: 0.5rem;
          border: 1px solid transparent;
        }

        button:active,
        button:hover {
          opacity: 0.8;
        }

        button:focus {
          border: 1px solid rgb(var(--color-highlight));
        }
      `}
    </style>
  </button>
);
