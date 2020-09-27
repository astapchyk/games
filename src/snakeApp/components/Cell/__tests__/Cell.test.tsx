import React from 'react';
import { render } from '@testing-library/react';

import Cell from '../index';

describe('<Cell />', () => {
  test('renders the component', async () => {
    const cell = { x: 1, y: 2 };
    const cellName = 'food';

    const { container } = render(<Cell cell={cell} className={cellName} />);
    expect(container).toMatchSnapshot();
  });
});
