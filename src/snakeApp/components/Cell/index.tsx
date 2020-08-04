import React, { ReactElement, memo } from 'react';

import styles from './styles.css';
export { styles };

import { getClassNames } from '../../utils/common';

type CellProps = {
  cell: Cell;
  className: string;
};

type Cell = {
  x: number;
  y: number;
};

// eslint-disable-next-line react/display-name
const Cell = memo(
  ({ cell, className }: CellProps): ReactElement => {
    return (
      <div
        style={{
          left: `${cell.x * 5}vh`,
          top: `${cell.y * 5}vh`,
        }}
        className={getClassNames(styles.cell, className)}
      />
    );
  },
);

export default Cell;
