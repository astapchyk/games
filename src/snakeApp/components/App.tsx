import React, { useEffect, ReactElement } from 'react';

import Area from './Area/index';

import styles from './styles.css';

function App(): ReactElement {
  useEffect(() => {
    document.title = 'Snake game';
    return;
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>
        <h1>Snake App</h1>
      </span>
      <div className={styles.content}>
        <Area />
      </div>
      <span className={styles.score} />
    </div>
  );
}

export default App;
