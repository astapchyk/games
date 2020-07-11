import { changeRoute } from '../../router';

interface Styles {
  container: string;
  hiddenContainer: string;
  links: string;
  link: string;
  activeLink: string;
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
  container: 'navigation',
  hiddenContainer: 'hidden',
  links: 'links',
  link: 'link',
  activeLink: 'active',
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
      throw Error('An initialisation error. Please, check your config.');
    }
  }

  static generateTemplate(links: Link[], styles: Styles): boolean {
    if (links.length) {
      const { container, hiddenContainer, link, activeLink } = styles;
      const hiddenClass: string = localStorage.getItem('isHidden')
        ? hiddenContainer
        : '';
      const activeLinkClass = (url: string): string =>
        url === location.pathname ? activeLink : '';

      const template = `
        <nav class="${container} ${hiddenClass}">
          <ul>
          ${links
            .map(
              ({ url, title }) => `
              <li 
                class="${link} ${activeLinkClass(url)}" 
                data-href="${url}"
                >
                  ${title}
              </li>`,
            )
            .join('')}
          </ul>
          <div class="toggle">
            <i class="arrow"></i>
          </div>
        </nav>
      `;

      document.body.insertAdjacentHTML('afterbegin', template);

      return true;
    }
    return false;
  }

  static getElements(
    selector: string,
    from: Element = document.body,
  ): null | Element | Element[] {
    if (typeof selector !== 'string') return null;

    const elements = Array.from(from.querySelectorAll(selector));
    if (elements.length === 0) return null;

    return elements.length > 1 ? elements : elements[0];
  }

  sync(): void {
    const { getElements } = Sidebar;

    const container = getElements('.navigation') as Element;
    const links: Element | Element[] = getElements(
      '.navigation > ul > li.link',
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
      toggle: getElements('.toggle', container as Element) as Element,
      links: convertLinksToObject(links),
    };
  }

  setHandlers(): void {
    const { hiddenContainer, activeLink } = this.styles;
    const { links, toggle, container } = this.sidebar;

    (Object.keys(links) as Array<string>).forEach((key: string) =>
      links[key].addEventListener('click', () => {
        links[location.pathname].classList.remove(activeLink);
        links[key].classList.add(activeLink);
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
