import React from 'react'

export const Nav = ({ links }) => (
  <nav className='nav'>
    {links.map(({ href, title }) => (
      <a
        key={href}
        href={href}
        title={title}
        target={href.includes('http') ? '_blank' : null}
        rel='noreferrer noopener'
      >
        {title}
      </a>
    ))}
    <style jsx>{`
      .nav a {
        position: relative;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        text-decoration: none;
        background-color: transparent;

        display: block;
        width: 100%;
        margin-bottom: 0.5rem;
        text-align: center;
        text-transform: lowercase;
      }

      .nav a::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-top: 0.5rem solid #fefefe;
        border-right: 0.5rem solid transparent;
      }

      .nav a:focus,
      .nav a:active,
      .nav a:hover {
        background: none;
        outline: none;
        border-color: #aaa;
      }

      .nav a:focus::after,
      .nav a:active::after,
      .nav a:hover::after {
        outline: none;
        border-top-color: #aaa;
      }


      @media screen and (min-width: 30rem) {
        .nav {
          display: flex;
          flex-flow: row nowrap;
          flex: 0 0 auto;
          justify-content: center;
        }

        .nav a {
          display: inline;
          width: auto;
          margin-bottom: 0;
        }

        .nav a:not(:first-child) {
          margin-left: 1rem;
        }  
      }
    `}
    </style>
  </nav>
)
