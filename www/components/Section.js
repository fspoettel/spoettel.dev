import React from 'react';
import cx from 'classnames';

export const Section = ({
  backgroundColor,
  color,
  header,
  height,
  children,
  tagName = 'section',
}) => {
  const Tag = tagName;

  return (
    <Tag
      className={cx('section', { section_full: height })}
      style={{
        '--container-background-color': backgroundColor,
        '--container-color': color,
      }}
    >
      {header && <div className="section-header">{header}</div>}
      <div className="section-content">{children}</div>
      <style jsx scoped>
        {`
          .section {
            background-color: var(--container-background-color, inherit);
            color: var(--container-color);

            position: relative;
            padding: 1.5rem;
            z-index: 2;
          }

          .section_full {
            display: flex;
            flex-flow: column nowrap;
            min-height: ${height};
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
    </Tag>
  );
};
