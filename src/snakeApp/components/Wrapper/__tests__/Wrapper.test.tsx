import React from 'react';
import { render } from '@testing-library/react';

import Wrapper from '../index';

describe('<Wrapper />', () => {
  test('renders the empty component with default content', async () => {
    const { container } = render(<Wrapper isEmpty />);
    expect(container).toMatchSnapshot();
  });

  test('renders the empty component with a custom content', async () => {
    const contentText = 'a custom content of the empty component';

    const { container, getByText } = render(
      <Wrapper isEmpty emptyContent={<div>{contentText}</div>} />,
    );
    expect(container).toMatchSnapshot();
    expect(getByText(contentText)).toBeInTheDocument();
  });

  test('renders the loading component with default content', async () => {
    const { container } = render(<Wrapper isLoading />);
    expect(container).toMatchSnapshot();
  });

  test('renders the loader component with a custom content', async () => {
    const contentText = 'a custom content of the loader component';

    const { container } = render(
      <Wrapper isLoading loadingContent={<div> {contentText} </div>} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders the render it component with data', async () => {
    const { container } = render(
      <Wrapper>
        <div>children data</div>
      </Wrapper>,
    );
    expect(container).toMatchSnapshot();
  });
});
