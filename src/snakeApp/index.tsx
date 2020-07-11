export async function loadApp(): Promise<void> {
  const React = await import('react');
  const { render } = await import('react-dom');

  const App = React.lazy(() => import('./components/App'));
  // import * as styles from './styles.css';

  render(
    <React.Suspense fallback={<div className={styles.loader}>Loading...</div>}>
      <App />
    </React.Suspense>,
    document.getElementById('root'),
  );
}

export async function unmountApp(): Promise<boolean> {
  const { unmountComponentAtNode } = await import('react-dom');

  return unmountComponentAtNode(document.getElementById('root'));
}
