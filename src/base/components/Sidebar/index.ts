import { changeRoute } from '../../../router';

import styles from './style.css';
import { getClassNames } from '../../../snakeApp/utils/common';

interface Styles {
  container: string;
  hiddenContainer: string;
  links: string;
  link: string;
  activeLink: string;
  toggle: string;
  arrow: string;
}

interface Link {
  title: string;
  url: string;
}

interface SidebarElement {
  container: Element;
  links: Record<string, Element>;
  toggle: Element;
}

const STYLES: Styles = {
  container: styles.navigation,
  hiddenContainer: styles.hidden,
  links: styles.links,
  link: styles.link,
  activeLink: styles.active,
  toggle: styles.toggle,
  arrow: styles.arrow,
};

const LINKS: Link[] = [
  { title: '/', url: '/' },
  { title: 'snake', url: '/snake' },
  { title: 'about', url: '/about' },
];

interface SidebarArguments {
  styles?: Styles;
  links?: Link[];
  onLinkClick?: (path: string) => Promise<void>;
}

interface Sidebar {
  styles?: Styles;
  links?: Link[];
  onLinkClick?: (path: string) => Promise<void>;
  sidebar: null | SidebarElement;
  new (arg: SidebarArguments): this;
  generateTemplate(links: Link[], styles: Styles): boolean;
  getElements(links: Link[], styles: Styles): boolean;
  sync(): void;
  setHandlers(): void;
}

class Sidebar {
  constructor({
    styles = STYLES,
    links = LINKS,
    onLinkClick = changeRoute,
  }: SidebarArguments = {}) {
    this.styles = styles;
    this.links = links;
    this.onLinkClick = onLinkClick;
    this.sidebar = null;

    this.init();
    return this;
  }

  init(): void {
    const { links, styles } = this;
    const { generateTemplate } = Sidebar;

    const isSuccessfully = generateTemplate(links, styles);

    if (isSuccessfully) {
      this.sync();
      this.setHandlers();
    } else {
      throw new Error('An initialisation error. Please, check your config.');
    }
  }

  static generateTemplate(links: Link[], styles: Styles): boolean {
    if (links.length === 0) return false;

    const { container, hiddenContainer, link, activeLink } = styles;
    const hiddenClass: string = localStorage.getItem('isHidden')
      ? hiddenContainer
      : '';
    const activeLinkClass = (url: string): string =>
      url === location.pathname ? activeLink : '';

    const template = `
        <nav class="${getClassNames(container, hiddenClass)}">
          <ul>
          ${links
            .map(
              ({ url, title }) => `
              <li 
                class="${getClassNames(link, activeLinkClass(url))}"
                data-href=${url}
                >
                  ${title}
              </li>`,
            )
            .join('')}
          </ul>
          <div class=${styles.toggle}>
            <i class=${styles.arrow}></i>
          </div>
        </nav>
      `;

    document.body.insertAdjacentHTML('afterbegin', template);

    return true;
  }

  static getElements(
    selector: string,
    from: Element = document.body,
  ): Element | Element[] {
    if (typeof selector !== 'string') return null;

    const elements = Array.from(from.querySelectorAll(selector));
    if (elements.length === 0) return null;

    return elements.length > 1 ? elements : elements[0];
  }

  sync(): void {
    const { getElements } = Sidebar;

    const container = getElements(`.${this.styles.container}`) as Element;
    const links: Element | Element[] = getElements(
      `.${styles.link}`,
      container as Element,
    );

    const convertLinksToObject = (
      links: Element[] | Element,
    ): Record<string, Element> => {
      const linkList = Array.isArray(links) ? links : [links];

      return linkList.reduce((acc: Record<string, Element>, item: Element) => {
        const path = item.getAttribute('data-href');
        acc[path] = item;
        return acc;
      }, {});
    };

    this.sidebar = {
      container: container as Element,
      toggle: getElements(
        `.${this.styles.toggle}`,
        container as Element,
      ) as Element,
      links: convertLinksToObject(links),
    };
  }

  setHandlers(): void {
    const { hiddenContainer, activeLink } = this.styles;
    const { links, toggle, container } = this.sidebar;

    (Object.keys(links) as Array<string>).forEach((key: string) =>
      links[key].addEventListener('click', () => {
        links[location.pathname]?.classList.remove(activeLink);
        links[key]?.classList.add(activeLink);
        return this.onLinkClick(key);
      }),
    );

    toggle.addEventListener('click', () => {
      localStorage.setItem(
        'isHidden',
        container.classList.contains(hiddenContainer) ? '' : 'true',
      );
      container.classList.toggle(hiddenContainer);
    });
  }
}

export default Sidebar;
