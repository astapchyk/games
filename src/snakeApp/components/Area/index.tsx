import React, { Component, ReactElement, RefObject } from 'react';

import Snake from '../Snake/index';
import Food from '../Food/index';
import Cell from '../Cell/index';

type AreaProps = {
  size: number;
};

type State = {
  direction: Direction;
  isStopped: boolean;
  isAuto: boolean;
};

enum Direction {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
  Enter = 'Enter',
  Space = ' ',
  Esc = 'Escape',
}

interface Area {
  size: number;
  interval: number;
  timeout: number;
  state: State;

  snake: RefObject<Snake>;
  food: RefObject<Food>;

  componentDidMount(): void;
  componentWillUnmount(): void;
  keyboardEventHandler(event: KeyboardEvent): void;
  play(): void;
  render(): ReactElement;
}

const Step: Record<string, Cell> = {
  ArrowUp: { y: -1, x: 0 },
  ArrowDown: { y: 1, x: 0 },
  ArrowLeft: { y: 0, x: -1 },
  ArrowRight: { y: 0, x: 1 },
};

const defaultState: State = {
  direction: Direction.Up,
  isStopped: true,
  isAuto: true,
};

class Area extends Component {
  constructor(props: AreaProps) {
    super(props);
    this.interval = null;
    this.timeout = null;
    this.size = props.size || 16;
    this.state = defaultState;

    this.snake = React.createRef();
    this.food = React.createRef();

    this.keyboardEventHandler = this.keyboardEventHandler.bind(this);
    this.play = this.play.bind(this);
  }

  componentDidMount(): void {
    this.init();
  }

  componentWillUnmount(): void {
    window.removeEventListener('keydown', this.keyboardEventHandler);
    window.clearInterval(this.interval);
  }

  shouldComponentUpdate(): boolean {
    return false;
  }

  init(): void {
    window.addEventListener('keydown', this.keyboardEventHandler);
    this.interval = window.setInterval(this.play, 500);
  }

  keyboardEventHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case Direction.Up:
      case Direction.Left:
      case Direction.Right:
      case Direction.Down: {
        this.go(event.key);
        break;
      }
      case Direction.Space:
      case Direction.Enter:
        this.setState({ isStopped: !this.state.isStopped });
        break;
      default:
        break;
    }
  }

  static isValidDirection(direction: string, nextDirection: string): boolean {
    const { Up, Down, Left, Right } = Direction;
    if (nextDirection === Up && direction !== Down) return true;
    if (nextDirection === Down && direction !== Up) return true;
    if (nextDirection === Left && direction !== Right) return true;
    if (nextDirection === Right && direction !== Left) return true;
  }

  go(nextDirection: string): void {
    const { isStopped, direction: currentDirection } = this.state;

    if (isStopped) return;

    if (Area.isValidDirection(currentDirection, nextDirection)) {
      this.setState({ isAuto: false });
      window.clearTimeout(this.timeout);

      this.setState({ direction: nextDirection });
      this.play();

      this.timeout = window.setTimeout(() => {
        this.setState({ isAuto: true });
      }, 200);
    }
  }

  play(): void {
    const { direction, isStopped, isAuto } = this.state;
    if (isStopped && isAuto) return;

    const snake = this.snake?.current;
    const food = this.food?.current;
    const dir = Step[direction];

    food.generate(snake.state?.data);

    try {
      snake.validateNextStep(dir);

      const pieceOfFood = food.getFood(snake.state?.data[0]);
      if (pieceOfFood) {
        food.removeFood(pieceOfFood);
        snake.feed(dir);
      } else {
        snake.recalculate(dir);
      }
    } catch {
      window.alert('Game over!');
      this.reset();
    }
  }

  reset(): void {
    const snake = this.snake?.current;
    const food = this.food?.current;

    this.setState(defaultState);
    snake.reset();
    food.reset();
  }

  render(): ReactElement {
    return (
      <>
        <Snake ref={this.snake} size={this.size} />
        <Food ref={this.food} size={this.size} />
      </>
    );
  }
}

export default Area;
