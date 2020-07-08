export async function loadApp(): Promise<void> {
  const React = await import('react');
  const { render } = await import('react-dom');

  const App = React.lazy(() => import('./components/App'));

  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>,
    document.getElementById('root'),
  );
}

export async function unmountApp(): Promise<boolean> {
  const { unmountComponentAtNode } = await import('react-dom');

  return unmountComponentAtNode(document.getElementById('root'));
}
