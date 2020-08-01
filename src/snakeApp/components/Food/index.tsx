import React, { PureComponent, ReactElement, RefObject } from 'react';

import Cell, { styles } from '../Cell/index';

import { getRandomInt, isEmptyCell, isEqualCells } from '../../utils/common';

type FoodProps = {
  ref: RefObject<Food>;
  size: number;
};

type State = {
  data: Cell[];
};

interface Food {
  state: State;
  generate(snake: Cell[]): void;
  getFood(cell: Cell): Cell;
  removeFood(cell: Cell): void;
}

const defaultState: State = {
  data: [],
};

class Food extends PureComponent<FoodProps> {
  constructor(props: FoodProps) {
    super(props);
    this.state = defaultState;
  }

  generate(snake: Cell[]): void {
    if (this.state.data.length !== 0) return;

    const { size } = this.props;
    const generatedFood = {
      x: getRandomInt(0, size),
      y: getRandomInt(0, size),
    };

    if (isEmptyCell(generatedFood, snake)) {
      this.setState({ data: [generatedFood] });
    } else {
      this.generate(snake);
    }
  }

  getFood(cell: Cell): Cell {
    return this.state.data.find((food: Cell) => isEqualCells(cell, food));
  }

  removeFood(cell: Cell): void {
    this.setState(({ data }: State) => ({
      data: data.filter((food: Cell) => !isEqualCells(cell, food)),
    }));
  }

  reset(): void {
    this.setState(defaultState);
  }

  render(): ReactElement {
    const { data: cells } = this.state;
    return (
      <>
        {cells.map((cell) => (
          <Cell
            key={`${cell.x}${cell.y}`}
            className={styles.food}
            cell={cell}
          />
        ))}
      </>
    );
  }
}

export default Food;
