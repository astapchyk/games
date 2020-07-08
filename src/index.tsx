import router, { changeRoute } from './router';

(async function () {
  const list = Array.from(document.querySelectorAll('sidebar > ul > li'));
  const hrefList = list.map((item) => item.getAttribute('data-href'));
  list.forEach((item, index) =>
    item.addEventListener('click', () => changeRoute(hrefList[index])),
  );
  router(location.pathname);
})();
