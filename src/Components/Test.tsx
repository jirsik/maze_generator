import React, { useEffect, useState } from 'react';

const Test = () => {
  const [x, setX] = useState(0);
  
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
  }, []);

  const handleKey = () => {
    console.log(x);
    setX(x + 1);
  }
 
  return (
    <h1>test</h1>
  );
};

export default Test;
