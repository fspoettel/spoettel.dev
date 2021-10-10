import React from 'react';
import cx from 'classnames';

export const Section = ({ content, full, children }) => (
  <section className={cx('section', { section_full: full })}>
    {children && <div className="section-children">{children}</div>}
    <div className="section-content">{content}</div>
    <style jsx scoped>
      {`
        .section {
          position: relative;
          padding: 1.5rem;
          z-index: 2;
        }

        .section_full {
          display: flex;
          flex-flow: column nowrap;
          min-height: 100vh;
        }

        .section_full > * {
          flex: 0 0 auto;
        }

        .section_full > .section-content {
          flex: 1 1 auto;
          display: flex;
          align-items: strech;
        }
      `}
    </style>
  </section>
);
