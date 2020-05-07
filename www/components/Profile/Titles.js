import React from 'react'

export const Titles = ({ name, children }) => (
  <div className='titles'>
    <h1 className='name'>
      <a
        className='p-name u-url'
        href='https://spoettel.dev/'
      >
        {name}
      </a>
    </h1>
    <h2 className='position'>{children}</h2>
    <style jsx>{`
      .titles {
        margin-top: 0.5rem;
      }

      .name {
        font-size: 2.25rem;
        margin-bottom: 0.5rem;
      }

      .position {
        font-size: 1.125rem;
        text-transform: lowercase;
        font-weight: 300;
        font-style: italic;
      }
    `}
    </style>
  </div>
)
