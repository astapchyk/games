import Sidebar from './base/components/Sidebar';
import router from './router';

import './assets/style.css';

(async function () {
  new Sidebar();
  router(location.pathname);
})();
