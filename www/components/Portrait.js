import React from 'react'

const hexToRgb = (h) => {
  let r = 0
  let g = 0
  let b = 0

  if (h.length === 4) {
    r = '0x' + h[1] + h[1]
    g = '0x' + h[2] + h[2]
    b = '0x' + h[3] + h[3]
  } else if (h.length === 7) {
    r = '0x' + h[1] + h[2]
    g = '0x' + h[3] + h[4]
    b = '0x' + h[5] + h[6]
  }

  return [+r, +g, +b]
}

const rgba = (rgb, a = 1) => {
  const [r, g, b] = rgb
  return `rgba(${r},${g},${b},${a})`
}

export const Portrait = ({
  color,
  backgroundColor,
  name,
  size,
  src
}) => {
  const c = hexToRgb(color)

  return (
    <div className='portrait'>
      <img src={src} alt={`Portrait of ${name}`} />
      <style jsx>{`
        @keyframes load {
          from { box-shadow: none; }
          to {
            box-shadow:
              8px 8px 0 4px ${backgroundColor},
              10px 10px 0 4px ${rgba(c, 1)},
              20px 20px 0 4px ${backgroundColor},
              22px 22px 0 4px ${rgba(c, 0.8)},
              32px 32px 0 4px ${backgroundColor},
              34px 34px 0 4px ${rgba(c, 0.6)},
              44px 44px 0 4px ${backgroundColor},
              47px 47px 0 4px ${rgba(c, 0.5)},
              56px 56px 0 4px ${backgroundColor},
              59px 59px 0 4px ${rgba(c, 0.4)},
              68px 68px 0 4px ${backgroundColor},
              71px 71px 0 4px ${rgba(c, 0.3)},
              80px 80px 0 4px ${backgroundColor},
              84px 84px 0 4px ${rgba(c, 0.2)},
              92px 92px 0 4px ${backgroundColor},
              96px 96px 0 4px ${rgba(c, 0.05)},
              -8px -8px 0 4px ${backgroundColor},
              -10px -10px 0 4px ${rgba(c, 1)},
              -20px -20px 0 4px ${backgroundColor},
              -22px -22px 0 4px ${rgba(c, 0.8)},
              -32px -32px 0 4px ${backgroundColor},
              -34px -34px 0 4px ${rgba(c, 0.6)},
              -44px -44px 0 4px ${backgroundColor},
              -47px -47px 0 4px ${rgba(c, 0.5)},
              -56px -56px 0 4px ${backgroundColor},
              -59px -59px 0 4px ${rgba(c, 0.4)},
              -68px -68px 0 4px ${backgroundColor},
              -71px -71px 0 4px ${rgba(c, 0.3)},
              -80px -80px 0 4px ${backgroundColor},
              -84px -84px 0 4px ${rgba(c, 0.2)},
              -92px -92px 0 4px ${backgroundColor},
              -96px -96px 0 4px ${rgba(c, 0.1)};
          }
        }

        @keyframes radius {
          0 { border-radius: 0; }
          50% { border-radius: 50%; }
          100% { border-radius: 0; }
        }

        .portrait {
          display: inline-block;
          position: relative;
          height: ${size};
          width: ${size};
          margin: 100px;
        }

        .portrait::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          animation: 0.3s load ease-in-out both, 8s radius linear infinite 0.3s;
        }

        .portrait img {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      `}
      </style>
    </div>
  )
}
