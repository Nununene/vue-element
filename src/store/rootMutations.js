// === Mutations ===
// Function that trigger(commit) by action and mutate store's state (Read and write)
// do not place async(promise) procedure in Mutations
// import * as types from './mutation-types'
import Vue from 'vue';
import * as c from 'src/configuration';

// // Use this line when using locale callback
// import locales from './locale.js'

export const setLoginInfo = (state, myInfo) => {
  state.userId = myInfo.id;
  state.userName = myInfo.name;
  state.authInfo = myInfo.authInfo;
  window.sessionStorage.setItem('_userId', state.userId);
  window.sessionStorage.setItem('_userName', state.userName);
  window.sessionStorage.setItem('_authInfo', JSON.stringify(state.authInfo));
};

export const clearLoginInfo = state => {
  state.userName = '';
  state.authInfo = {};
  state.userId = '';
  window.sessionStorage.removeItem('_userId');
  window.sessionStorage.removeItem('_userName');
  window.sessionStorage.removeItem('_authInfo');
};
export const setLoginFlag = (state, myFlag) => {
  state.isLoggedIn = myFlag;
};
export const setErrorMsg = (state, myMsg) => {
  state.errorMsg = myMsg;
};

export const setUserLang = (state, myLang) => {
  state.userLang = myLang;
  // Using local callback can avoid wrong locale change
  // Vue.locale(myLang, locales[myLang], function () {
  //   c.DEBUG && console.log('Lang callback(only when success locale data loaded)')
  //   Vue.config.lang = myLang
  // })
  Vue.config.lang = myLang;
  window.sessionStorage.setItem('_userLang', state.userLang);
  c.DEBUG && console.log('Set user lang');
};

export const setUnsavedFlag = (state, newFlag) => {
  c.DEBUG && console.log('Set unsaved flag');
  state.unsaved = newFlag;
};
