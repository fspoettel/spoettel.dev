import React from 'react';
export const Portrait = ({ name, size }) => {
  return (
    <div className="portrait">
      <picture>
        <source srcSet="/assets/images/portrait.webp" type="image/webp" />
        <img
          className="portrait-image u-photo"
          src="/assets/images/portrait.jpg"
          alt={`Portrait of ${name}`}
        />
      </picture>
      <style jsx>
        {`
          .portrait-image {
            position: absolute;
            z-index: 2;
            top: 12.5%;
            left: 12.5%;
            width: 75%;
            height: 75%;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
          }

          .portrait {
            display: inline-block;
            position: relative;
          }

          .portrait::after {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            border-radius: 25%;
            transform: rotate(134.5deg);
            animation: 0.3s load ease-in-out both, 16s pulse linear infinite 0.3s;
          }

          @keyframes load {
            0% {
              box-shadow: none;
            }
            100% {
              box-shadow: 0 0 4px rgb(var(--color-bg)), 2px 2px 0 4px rgb(var(--color-bg)),
                4px 4px 0 4px rgb(var(--color-bg)), 8px 8px 0 4px rgba(var(--color-bg)),
                10px 10px 0 4px rgba(var(--color-highlight), 1),
                20px 20px 0 4px rgb(var(--color-bg)),
                22px 22px 0 4px rgba(var(--color-highlight), 0.8),
                32px 32px 0 4px rgb(var(--color-bg)),
                34px 34px 0 4px rgba(var(--color-highlight), 0.6),
                44px 44px 0 4px rgb(var(--color-bg)),
                47px 47px 0 4px rgba(var(--color-highlight), 0.5),
                56px 56px 0 4px rgb(var(--color-bg)),
                59px 59px 0 4px rgba(var(--color-highlight), 0.4),
                68px 68px 0 4px rgb(var(--color-bg)),
                71px 71px 0 4px rgba(var(--color-highlight), 0.3),
                80px 80px 0 4px rgb(var(--color-bg)),
                84px 84px 0 4px rgba(var(--color-highlight), 0.2),
                92px 92px 0 4px rgb(var(--color-bg)),
                96px 96px 0 4px rgba(var(--color-highlight), 0.05),
                -2px -2px 0 4px rgb(var(--color-bg)), -4px -4px 0 4px rgb(var(--color-bg)),
                -8px -8px 0 4px rgb(var(--color-bg)),
                -10px -10px 0 4px rgba(var(--color-highlight), 1),
                -20px -20px 0 4px rgb(var(--color-bg)),
                -22px -22px 0 4px rgba(var(--color-highlight), 0.8),
                -32px -32px 0 4px rgb(var(--color-bg)),
                -34px -34px 0 4px rgba(var(--color-highlight), 0.6),
                -44px -44px 0 4px rgb(var(--color-bg)),
                -47px -47px 0 4px rgba(var(--color-highlight), 0.5),
                -56px -56px 0 4px rgb(var(--color-bg)),
                -59px -59px 0 4px rgba(var(--color-highlight), 0.4),
                -68px -68px 0 4px rgb(var(--color-bg)),
                -71px -71px 0 4px rgba(var(--color-highlight), 0.3),
                -80px -80px 0 4px rgb(var(--color-bg)),
                -84px -84px 0 4px rgba(var(--color-highlight), 0.2),
                -92px -92px 0 4px rgb(var(--color-bg)),
                -96px -96px 0 4px rgba(var(--color-highlight), 0.1);
            }
          }

          @keyframes pulse {
            0% {
              border-radius: 25%;
            }
            25% {
              border-radius: 50%;
              transform: rotate(134.5deg) scaleX(0.95);
            }
            50% {
              border-radius: 25%;
            }
            75% {
              border-radius: 50%;
              transform: rotate(134.5deg) scaleX(0.95);
            }
            100% {
              border-radius: 25%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .portrait::after {
              animation: 0.3s load ease-in-out both;
            }
          }
        `}
      </style>
      <style jsx>
        {`
          .portrait {
            height: ${size};
            width: ${size};
            margin: 2rem;
          }
        `}
      </style>
    </div>
  );
};
