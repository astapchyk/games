import React from 'react';
import { render } from '@testing-library/react';

import App from '../App';

describe('<App />', () => {
  test('renders the component', async () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
