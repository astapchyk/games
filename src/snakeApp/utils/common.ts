import Cell from '../components/Cell/index';

export const isEqualCells = curry(
  (firstCell: Cell, secondCell: Cell): boolean => {
    return firstCell.x === secondCell.x && firstCell.y === secondCell.y;
  },
);

export function getNextCell(cell: Cell, step: Cell): Cell {
  return {
    x: cell.x + step.x,
    y: cell.y + step.y,
  };
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function isEmptyCell(requiredCell: Cell, cells: Cell[]): boolean {
  return !cells.some((cell: Cell) => isEqualCells(requiredCell, cell));
}

export const getClassNames = (...classes: string[]): string => {
  return classes.join(' ');
};

/* eslint-disable */

function curry(func: any) {
  return function curried(...args: any[]) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function pass(...args2: any[]) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}
