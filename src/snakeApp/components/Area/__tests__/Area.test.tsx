import React from 'react';
import { render } from '@testing-library/react';

import Area from '../index';

describe('<Area />', () => {
  test('renders the component', async () => {
    const { container } = render(<Area />);
    expect(container).toMatchSnapshot();
  });
});
