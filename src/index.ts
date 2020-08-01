import Sidebar from './base/components/Sidebar/index';
import router from './router';

import './assets/main.css';

(async function () {
  new Sidebar();
  router(location.pathname);
})();
