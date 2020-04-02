/* eslint-disable no-continue */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import './index.scss';

export default function App({
  height,
  width,
}) {
  const [maze, setMaze] = useState([]);
  const [builds, setBuilds] = useState([]);

  const prepareStage = () => {
    const stage = [];

    for (let x = 0; x < height; x += 1) {
      stage[x] = [];
      for (let y = 0; y < width; y += 1) {
        if (x === 0 || x === height - 1 || y === 0 || y === width - 1) {
          stage[x][y] = 'wall';
          continue;
        } else if (x % 2 === 0 && y % 2 === 0) {
          stage[x][y] = 'build';
          setBuilds(builds.push([x, y]));
          continue;
        }
        stage[x][y] = 'path';
      }
    }

    return stage;
  };


  const drawWall = (stage, build, direction) => {
    const updatedStage = stage;
    let foundWall = false;
    let lastSpot = build;
    const nextSpot = [];
    while (!foundWall) {
      let indexOfBuild = -1;
      nextSpot[0] = lastSpot[0] + ((direction - 2) % 2);
      nextSpot[1] = lastSpot[1] + ((direction - 1) % 2);
      if (stage[nextSpot[0]][nextSpot[1]] === 'wall') {
        foundWall = true;
      } else {
        if (stage[nextSpot[0]][nextSpot[1]] === 'build') {
          builds.forEach((nextBuild, i) => {
            if (nextBuild[0] === nextSpot[0] && nextBuild[1] === nextSpot[1]) {
              indexOfBuild = i;
            }
          });
          setBuilds(builds.splice(indexOfBuild, 1));
        }
        updatedStage[nextSpot[0]][nextSpot[1]] = 'wall';
        lastSpot = nextSpot;
      }
    }

    return updatedStage;
  };

  const randomNumber = (max) => Math.floor(Math.random() * max);

  const generateMaze = (stage) => {
    let updatedStage = stage;
    while (builds.length > 0) {
      const index = randomNumber(builds.length);
      const direction = randomNumber(4);
      const build = builds[index];

      setBuilds(builds.splice(index, 1));
      updatedStage[build[0]][build[1]] = 'wall';
      updatedStage = drawWall(stage, build, direction);
    }
    return updatedStage;
  };

  useEffect(() => {
    const stage = prepareStage();
    setMaze(generateMaze(stage));
  }, []);

  return (
    <div className="maze">
        {maze.map((row) => (
            <div className="row">
                {row.map((spot) => (
                    <div className={spot}></div>
                ))}
            </div>
        ))}
        </div>
  );
}
