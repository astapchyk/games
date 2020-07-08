import React, { useEffect, FC } from 'react';

const App: FC = () => {
  useEffect(() => {
    document.title = 'Snake game';
    return;
  }, []);

  return <div>App</div>;
};

export default App;
