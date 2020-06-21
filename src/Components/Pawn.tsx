import React, { useEffect, useState, useRef } from 'react';

import './index.scss';

interface IProps {
  mazeHeight: number,
  mazeWidth: number,
  aproveMove: (x: number, y: number, nextX: number, nextY: number) => boolean,
};

const Pawn = (props: IProps) => {
  const [x, _setX] = useState<number>(5);
  const [y, _setY] = useState<number>(5);
  
  const xRef = useRef(x);
  const setX = (x: number) => {
    xRef.current = x;
    _setX(x);
  };
  const yRef = useRef(y);
  const setY = (y: number) => {
    yRef.current = y;
    _setY(y);
  };

  useEffect(() => {
    document.addEventListener('keydown', move);
  }, []);

  const move = (event: KeyboardEvent): void => {
    const { aproveMove, mazeHeight, mazeWidth } = props;
    let nextX = xRef.current;
    let nextY = yRef.current;
    switch (event.key) {
      case "ArrowRight":
        if (nextX < (mazeWidth - 3) / 2) {
          nextX ++;
        }
        break;
      case "ArrowLeft":
        if (nextX > 0) {
          nextX --;
        }
        break;
      case "ArrowUp":
        if (nextY > 0) {
          nextY --;
        }
        break;
      case "ArrowDown":
        if (nextY < (mazeHeight - 3) / 2) {
          nextY ++;
        }
        break;
    }
    if (aproveMove(xRef.current, yRef.current, nextX, nextY) === true) {
      setX(nextX);
      setY(nextY); 
    }
  }
 
  return (
    <div className="pawn" style={{top: `${(y * 21) - ((props.mazeHeight - 1) / 2 * 21)}px`, left: `${x * 21}px`}}>
    </div>
  );
};

export default Pawn;
