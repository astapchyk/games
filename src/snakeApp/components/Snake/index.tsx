import React, { PureComponent, ReactElement, RefObject } from 'react';

import Cell, { styles } from '../Cell/index';
import { getNextCell, isEqualCells } from '../../utils/common';

type State = {
  data: Cell[];
};

type SnakeProps = {
  ref: RefObject<Snake>;
  size: number;
};

const getDefaultState = ({ size = 16 }: SnakeProps): State => ({
  data: [{ x: size - 1, y: size - 1 }],
});

interface Snake {
  state: State;
  feed(step: Cell): void;
  recalculate(nextStep: Cell): void;
  validateNextStep(nextStep: Cell): void;
}

class Snake extends PureComponent<SnakeProps> {
  constructor(props: SnakeProps) {
    super(props);
    this.state = getDefaultState(props);
  }

  feed(step: Cell): void {
    this.setState(({ data }: State) => ({
      data: [getNextCell(data[0], step), ...data],
    }));
  }

  recalculate(nextStep: Cell): void {
    this.setState(({ data }: State) => ({
      data: [
        getNextCell(data[0], nextStep),
        ...(data.length > 1 ? data.slice(0, -1) : []),
      ],
    }));
  }

  validateNextStep(nextStep: Cell): void {
    const boarder = this.props.size - 1;
    const { x, y } = getNextCell(this.state.data[0], nextStep);

    // is out boarder?
    if (x < 0 || x > boarder || y < 0 || y > boarder) {
      throw new Error('You bumped into the boarder.');
    }

    // did it bump into itself?
    if (this.state.data.some((cell: Cell) => isEqualCells({ x, y }, cell))) {
      throw new Error('You bumped into itself.');
    }
  }

  reset(): void {
    this.setState(getDefaultState(this.props));
  }

  render(): ReactElement {
    const { data: cells } = this.state;
    return (
      <>
        {cells.map((cell: Cell) => (
          <Cell
            key={`${cell.x}${cell.y}`}
            className={styles.snake}
            cell={cell}
          />
        ))}
      </>
    );
  }
}

export default Snake;
