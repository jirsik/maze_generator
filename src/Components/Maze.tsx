/* eslint-disable no-continue */
import React, { useEffect, useState, useRef } from 'react';
import Pawn from './Pawn';

import './index.scss';

interface IProps {
  height: number,
  width: number,
};

const Maze = ({
  height,
  width,
}: IProps) => {
  const [maze, _setMaze] = useState<string[][]>([]);
  const [builds, setBuilds] = useState<[number, number][]>([]);

  const mazeRef = useRef(maze);
  const setMaze = (maze: string[][]): void => {
    mazeRef.current = maze;
    _setMaze(maze);
  };

  useEffect(() => {
    const stage: string[][] = prepareStage();
    setMaze(generateMaze(stage));
  }, []);

  const prepareStage = (): string[][] => {
    const stage: string[][] = [];

    for (let x: number = 0; x < height; x += 1) {
      stage[x] = [];
      for (let y:number = 0; y < width; y += 1) {
        if (x === 0 || x === height - 1 || y === 0 || y === width - 1) {
          stage[x][y] = 'wall';
          continue;
        } else if (x % 2 === 0 && y % 2 === 0) {
          stage[x][y] = 'build';
          builds.push([x, y])
          setBuilds(builds);
          continue;
        }
        stage[x][y] = 'path';
      }
    }

    return stage;
  };


  const drawWall = (stage: string[][], build: [number, number], direction: number): string[][] => {
    const updatedStage = stage;
    let foundWall: boolean = false;
    let lastSpot: [number, number] = build;
    const nextSpot: [number, number] = [0, 0];
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

  const randomNumber = (max: number): number => {
    return Math.floor(Math.random() * max);
  };

  const generateMaze = (stage: string[][]): string[][] => {
    let updatedStage: string[][] = stage;
    while (builds.length > 0) {
      const index: number = randomNumber(builds.length);
      const direction: number = randomNumber(4);
      const build: [number, number] = builds[index];

      setBuilds(builds.splice(index, 1));
      updatedStage[build[0]][build[1]] = 'wall';
      updatedStage = drawWall(stage, build, direction);
    }
    return updatedStage;
  };

  const pawnMoveCallback = (x: number, y: number, nextX: number, nextY: number): boolean => {
    let neighbour = 'unknown';
    if (x < nextX) {
      neighbour = mazeRef.current[y * 2 + 1][x * 2 + 2];
    } else if (x > nextX) {
      neighbour = mazeRef.current[y * 2 + 1][x * 2];
    } else if (y < nextY) {
      neighbour = mazeRef.current[y * 2 + 2][x * 2 + 1];
    } else if (y > nextY) {
      neighbour = mazeRef.current[y * 2][x * 2 + 1];
    }

    if (neighbour === 'path') {
      return true;
    }

    return false;
  };

  return (
    <div className="maze">
      <div>
        {maze.map((row, index) => (
          <div key={index} className="row">
                {row.map((spot, index2) => (
                  <div key={index2} className={spot}></div>
                  ))}
            </div>
        ))}
        <Pawn
          mazeHeight={height}
          mazeWidth={width}
          aproveMove={pawnMoveCallback}
        />
      </div>
    </div>
  );
};

export default Maze;
