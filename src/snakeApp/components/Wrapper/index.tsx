import React, { ReactElement } from 'react';

import RenderIt from './RenderIt';
import Loader from './Loader';

type BaseWrapperProps = {
  isEmpty?: boolean;
  emptyContent?: ReactElement;
  isLoading?: boolean;
  loadingContent?: ReactElement;
  children?: ReactElement;
};

function Wrapper({
  isEmpty,
  emptyContent,
  isLoading,
  loadingContent = <Loader />,
  children,
}: BaseWrapperProps): ReactElement {
  return (
    <>
      <RenderIt conditional={!isLoading && isEmpty} content={emptyContent} />
      <RenderIt conditional={isLoading} content={loadingContent} />
      <RenderIt conditional={!isLoading && !isEmpty} content={children} />
    </>
  );
}

export default Wrapper;
