import React, { useEffect, useState, useRef } from 'react';

import './index.scss';

interface IProps {
  mazeHeight: number,
  mazeWidth: number,
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
    const { mazeHeight, mazeWidth } = props;
    let myX = xRef.current;
    let myY = yRef.current;
    switch (event.key) {
      case "ArrowRight":
        if (myX < (mazeWidth - 3) / 2) {
          myX ++;
        }
        break;
      case "ArrowLeft":
        if (myX > 0) {
          myX --;
        }
        break;
      case "ArrowUp":
        if (myY > 0) {
          myY --;
        }
        break;
      case "ArrowDown":
        if (myY < (mazeHeight - 3) / 2) {
          myY ++;
        }
        break;
    }
      setX(myX);
      setY(myY); 
  }
 
  return (
    <div className="pawn" style={{top: `${(y * 21) - ((props.mazeHeight - 1) / 2 * 21)}px`, left: `${x * 21}px`}}>
    </div>
  );
};

export default Pawn;
