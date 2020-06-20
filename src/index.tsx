import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './index.scss';

import Maze from './Components/Maze';

ReactDOM.render(
  <Maze
    height= {41}
    width= {99}
  />,
  document.getElementById('app')
);
