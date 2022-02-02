import React from 'react';

export function Container({
  backgroundColor,
  color,
  children,
  title
}) {
  return (
    <article
      className='container'
      style={{
        '--container-background-color': backgroundColor,
        '--container-color': color,
      }}
    >
      <header className='container-header'>
        <h2 className='container-title'>{title}</h2>
      </header>
      {children}

      <style jsx scoped>{`
        .container {
          background-color: var(--container-background-color, inherit);
          color: var(--container-color);
        }
      `}</style>

      <style jsx scoped>{`
        .container {
          width: 100%;
          min-height: 100vh;
          padding-top: 1.5rem;
          z-index: 2;
        }

        .container-header {
          padding: 0 1.5rem;
        }

        .container-title {
          font-size: 2.75rem;
        }
      `}</style>
    </article>
  );
}
