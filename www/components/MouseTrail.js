import React, { useEffect, useRef, useState } from 'react';

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lifetime = 0;
  }
}

export function MouseTrail() {
  const canvasRef = useRef();
  const pointsRef = useRef([]);

  const [measures, setMeasures] = useState({
    clientHeight: 0,
    clientWidth: 0,
  });

  useEffect(() => {
    function onResize() {
      setMeasures({
        clientHeight: document.body.clientHeight,
        clientWidth: document.body.clientWidth,
      });
    }

    function onMousemove({ clientX, clientY }) {
      const canvas = canvasRef.current;
      const addPoint = (x, y) => {
        pointsRef.current.push(new Point(x, y));
      };
      addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop + window.scrollY);
    }

    function start() {
      const canvas = canvasRef.current;
      const points = pointsRef.current;
      const ctx = canvas.getContext('2d');

      document.addEventListener('mousemove', onMousemove, false);

      const animatePoints = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const duration = (0.7 * (1 * 1000)) / 60;

        points.forEach((point, i) => {
          const lastPoint = points[i - 1] ? points[i - 1] : point;
          point.lifetime += 1;

          if (point.lifetime > duration) {
            points.shift();
          } else {
            const lifePercent = point.lifetime / duration;
            const spreadRate = 7 + -1 * lifePercent;

            ctx.lineJoin = 'round';
            ctx.lineWidth = spreadRate;

            const red = Math.floor(200 - 200 * lifePercent);
            const green = Math.floor(200 - 200 * lifePercent);
            const blue = Math.floor(200 - 200 * lifePercent);
            ctx.strokeStyle = `rgb(${red},${green},${blue}`;

            ctx.beginPath();

            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(point.x, point.y);

            ctx.stroke();
            ctx.closePath();
          }
        });

        window.requestAnimationFrame(animatePoints);
      };

      animatePoints();
    }

    onResize();
    window.addEventListener('resize', onResize, false);
    if (window.matchMedia('(pointer:fine)').matches) start();

    return () => {
      window.removeEventListener('resize', onResize, false);
      window.removeEventListener('mousemove', onMousemove, false);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={measures.clientWidth} height={measures.clientHeight} />
      <style jsx>
        {`
          canvas {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            pointer-events: none;
          }
        `}
      </style>
    </>
  );
}
