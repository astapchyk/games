// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { loadApp, unmountApp } from './snakeApp';
import Home from './base/components/Home/index';
import NotFound from './base/components/NotFound/index';

export function replaceRoot(template: Node): void {
  const el = document.querySelector('#root');
  el.innerHTML = '';
  el.appendChild(template);
}

export async function changeRoute(path: string): Promise<void> {
  if (path !== location.pathname) {
    if (location.pathname === '/snake') {
      await unmountApp();
    }
    history.pushState({}, null, path);
    router(path);
  }
}

export default function router(path: string): Promise<void> | void {
  switch (path) {
    case '':
    case '/':
      return replaceRoot(Home());

    case '/snake': {
      return loadApp();
    }
    default:
      return replaceRoot(NotFound());
  }
}
