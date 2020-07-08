// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { loadApp, unmountApp } from './snakeApp';

export function defaultRoute(content: string): void {
  const div = document.createElement('div');
  const text = document.createTextNode(content);

  div.appendChild(text);
  replaceRoot(div);
}

export function replaceRoot(template: HTMLElement): void {
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
      return defaultRoute('home');

    case '/snake': {
      return loadApp();
    }
    default:
      return defaultRoute('not found');
  }
}
