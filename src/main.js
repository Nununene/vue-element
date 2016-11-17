/**
 * Taco UI main js file
 */
import Vue from 'vue';
import * as c from 'src/configuration';

// ------------------------------------------------
// Store
// ------------------------------------------------
import store from './store';
// Get session storage and set to store(must before route)
var tempuserName = window.sessionStorage.getItem('_userName');
var tempuserId = window.sessionStorage.getItem('_userId');
var tempauthInfo = '';
try {
  tempauthInfo = JSON.parse(window.sessionStorage.getItem('_authInfo'));
} catch (err) {
  c.DEBUG && console.log('Fail to get authInfo from session');
}
var tempUserLang = window.sessionStorage.getItem('_userLang');
c.DEBUG && console.log('LOADING SESSION ...');
// Sometimes 'null' sometimes null
if (tempuserId !== 'null' && tempuserId !== null) {
  store.dispatch('setAuthFromSession', {
    id: tempuserId,
    name: tempuserName,
    authInfo: tempauthInfo,
  });
}

// ------------------------------------------------
// Vue resource
// ------------------------------------------------
import VueResource from 'vue-resource';
Vue.use(VueResource);

// ------------------------------------------------
// i18n
// ------------------------------------------------
// Take care of ...
// https://github.com/kazupon/vue-i18n/issues/49
import VueI18n from 'vue-i18n';
import locales from './locales';
Vue.use(VueI18n);
Object.keys(locales).forEach(function(lang) {
  Vue.locale(lang, locales[lang]);
});
// TODO : Auto set lang due user selection after page refresh/auto login
if (!locales[tempUserLang]) {
  // Fallback
  c.DEBUG && console.log('i18n fallback to default');
  tempUserLang = c.DEFAULT_LANG;
}
Vue.config.lang = tempUserLang;

// ------------------------------------------------
// Element UI
// ------------------------------------------------
// import Element UI before router check use it
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI, { locale: locale });

// ------------------------------------------------
// Vue router & Vuex/VueRouter integration
// ------------------------------------------------
// Let child components can read $store.
// Take care of ...
import router from './router.js';
import { sync } from 'vuex-router-sync';
sync(store, router);
// router beforeEach, do this after import
router.beforeEach(function(to, from, next) {
  c.DEBUG && console.log('Before route checking ...');
  c.DEBUG && console.log('Unsaved flag : ' + store.getters.unsavedFlag);
  c.DEBUG && console.log('Login state : ' + store.getters.loginState);
  const p = new Promise((resolve, reject) => {
    if (store.getters.unsavedFlag) {
      Vue.prototype.$confirm(
        Vue.t('shared.unsavedMessage'),
        Vue.t('shared.unsavedTitle'),
        { type: 'warning' },
      )
      .then(() => {
        // proceed
        c.DEBUG && console.log('unsaved but proceed');
        store.dispatch('setUnsavedFlag', false);
        resolve();
      })
      .catch(() => {
        // stay
        c.DEBUG && console.log('unsaved and stay remain');
        reject();
      });
    } else {
      // no flag
      resolve();
    }
  });
  Promise.all([p])
  .then(() => {
    c.DEBUG && console.log('Route resolved, proceeding');
    c.DEBUG && console.log('Goin to ... ' + to.path);
    if (to.path !== '/' && to.path.indexOf('/login') !== 0) {
      c.DEBUG && console.log('Authed only page');
      if (!store.getters.loginState) {
        c.DEBUG && console.log('Access rejected and redirect to login');
        next('/login/' + to.path);
        return;
      } else {
        c.DEBUG && console.log('Access granted');
      }
    } else {
      c.DEBUG && console.log('Normal page, no auth needed');
    }
    next();
  })
  .catch(() => {
    c.DEBUG && console.log('Route rejected.');
  });
});

var msg = function(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options,
      showClose: true,
    };
  };
  return Vue.prototype.$message(options);
};
['success', 'warning', 'info', 'error'].forEach(function(type) {
  msg[type] = function(options) {
    if (typeof options === 'string') {
      options = {
        message: options,
        showClose: true,
      };
    };
    options.type = type;
    return msg(options);
  };
});
Vue.prototype.$msg = msg;

// ------------------------------------------------
// Vue table 2 (experimental)
// ------------------------------------------------
const VueTables = require('vue-tables-2');
Vue.use(VueTables.client, {}, false);
Vue.use(VueTables.server, {}, false);

// ------------------------------------------------
// Generate single page application
// ------------------------------------------------
// import TopMenu from './TopMenu.vue'
// import StatusBar from './StatusBar.vue'
import Root from './components/Root.vue';

new Vue({
  el: '#app',
  render: h => h(Root),
  router,
  store,
  data() {
    return {
      now: new Date().toISOString(),
      userId: '',
      userName: '',
      authToken: '',
    };
  },
  beforeCreate() {
  },
});

