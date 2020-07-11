import React, { ReactElement } from 'react';

type RenderItProps = {
  conditional?: boolean;
  content: ReactElement;
};

export default function RenderIt({
  conditional,
  content,
}: RenderItProps): ReactElement {
  return <>{conditional ? content : null}</>;
}
