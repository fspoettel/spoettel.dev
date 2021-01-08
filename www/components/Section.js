import React from 'react'
import cx from 'classnames'

export const Section = ({
  children,
  full,
  title
}) => (
  <section className={cx('section', { section_full: full })}>
    {title && (
      <div className='section-header'>
        {typeof title === 'string'
          ? <h2 className='section-title'>{title}</h2>
          : title}
      </div>
    )}
    <div className='section-content'>
      {children}
    </div>
    <style jsx scoped>{`
      .section {
        position: relative;
        padding: 1.5rem;
        z-index: 2;
      }

      .section-header {
        text-align: right;
      }

      .section-title {
        display: inline-block;
        background: rgb(var(--color-text));
        color: rgb(var(--color-bg));
        padding: 0.5em 1em;
        margin-bottom: 3rem;
        box-shadow:
          8px 8px 0 4px rgb(var(--color-bg)),
          10px 10px 0 4px rgba(var(--color-highlight), 0.8);
      }

      .section_full {
        display: flex;
        flex-flow: column nowrap;
        min-height: 100vh;
      }

      .section_full .section-header {
        flex: 0 0 auto;
      }

      .section_full .section-content {
        flex: 1 1 auto;
        display: flex;
        align-items: strech;
      }
    `}
    </style>
  </section>
)
